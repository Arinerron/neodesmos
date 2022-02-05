#!/usr/bin/env python3

import re

with open('calculator_desktop.min.js', 'r') as f:
    source = f.read()

def _check_needle(needle):
    global source
    assert source.count(needle) == 1, 'Found needle %s a non-one number of times in the source (%d times)' % (repr(needle), source.count(needle))

def _check_needle_re(needle):
    global source
    assert len(re.findall(needle, source)) == 1, 'Found needle %s a non-one number of times in the source (%d times)' % (repr(needle), source.count(needle))

def insert_before(needle, data):
    global source
    _check_needle(needle)
    source = source.replace(needle, data + needle)

def insert_after(needle, data):
    global source
    _check_needle(needle)
    source = source.replace(needle, needle + data)


def replace(needle, data):
    global source
    _check_needle(needle)
    source = source.replace(needle, data)


def insert_before_re(needle, data):
    global source
    _check_needle_re(needle)
    source = re.sub('('+needle+')', data + r'\1', source)

def insert_after_re(needle, data):
    global source
    _check_needle_re(needle)
    source = re.sub('('+needle+')', r'\1' + data, source)



######



def patch_inject_init(code):
    insert_before('/*PATCH_INIT*/', code)



######


def disable_bugsnag():
    insert_after('sessions.bugsnag.com', '.example.com')
    insert_after('notify.bugsnag.com', '.example.com')


def inject_globals():
    insert_after_re('^var requirejs,require,define;', (
        'var PATCH_INIT_RAN=false;'
        'function PATCH_INIT(){'
            'if(!PATCH_INIT_RAN){'
                'console.log("Patching Desmos...");'
                'PATCH_INIT_RAN=true;'
                '/*PATCH_INIT*/'
            '}'
        '};')
    )
    insert_after_re(r'\S\.prototype\.setRootElt\=function\((\S)\)\{', r'window.GLOBAL_E=this;PATCH_INIT();')


def default_dark():
    patch_inject_init('GLOBAL_E.graphSettings.config.invertedColors = true;')


def support_inf():
    insert_before('g.infty=g.infin=g.infinity=', 'g.inf=') # TODO: convert to insert_before_re
    insert_after_re(r'var \S\="alpha beta ', 'inf ')


def support_nrt():
    insert_after_re(r'(\S).nthroot=(\S\S),', r'\2.nrt=\3,')
    insert_after_re(r'var \S\="alpha beta ', 'nrt ')


def support_degrees():
    return False
    insert_after_re(r'(\S)\["√"\]\=function\(\)\{return new (\S\S)\("\\\\sqrt\{\}"\)\}', r',\2.deg=function(){return new \3("^{\\circ}")}')
    insert_after('var e="alpha beta ', 'deg ')


######

features = [
    disable_bugsnag,
    inject_globals,

    default_dark,

    support_inf,
    support_nrt,

    support_degrees
]

for feature in features:
    print(f'Adding feature {feature.__name__}...')
    feature()

######

with open('calculator_desktop_patched.min.js', 'w') as f:
    f.write(source)
