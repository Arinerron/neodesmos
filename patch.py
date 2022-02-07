#!/usr/bin/env python3

import re

with open('calculator_desktop.min.js', 'r') as f:
    source = f.read()

def _check_needle(needle):
    global source
    assert source.count(needle) == 1, 'Found needle %s %d times in the source (should only be one match)' % (repr(needle), source.count(needle))

def _check_needle_re(needle):
    global source
    assert len(re.findall(needle, source)) == 1, 'Found needle %s %d times in the source (should only be one match)' % (repr(needle), source.count(needle))

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
    # wrap in {  } so variables have limited scope
    insert_before('/*PATCH_INIT*/', '{ %s }' % code)


def patch_inject_onload(code):
    # wrap in {  } so variables have limited scope
    insert_before('/*PATCH_ONLOAD*/', '{ %s }' % code)



######


def disable_bugsnag():
    insert_after('sessions.bugsnag.com', '.example.com')
    insert_after('notify.bugsnag.com', '.example.com')


def inject_globals():
    insert_after_re('^var requirejs,require,define;', (
        'function PATCH_SHOW_TOAST(msg) {'
            # NOTE: You can find more events you can dispatch by searching for "e.prototype.handleDispatchedAction = function(e) {" in the rev js file
            "window.controller.dispatch({"
                'type: "toast/show",'
                'toast: {'
                    'message: msg,'
                    #'hideAfter: 0,'
                    'toastStyle: "cover"'
                "}"
            "})"
        '}'

        'var PATCH_INIT_RAN = false;'
        'function PATCH_INIT() {'
            'if (!PATCH_INIT_RAN) {'
                'console.log("Patching Desmos...");'
                'PATCH_INIT_RAN = true;'
                '/*PATCH_INIT*/'
            '}'
        '};'

        "window.addEventListener('load', function() {/*PATCH_ONLOAD*/}, false);")
    )
    insert_after_re(r'\S\.prototype\.setRootElt\=function\((\S)\)\{', r'window.controller=this;PATCH_INIT();')


def inject_neodesmos_banner():
    patch_inject_init(
        "var banner = document.createElement('div');"
        "banner.className = 'dcg-powered-by';"
        "banner.style.fontStyle = 'italic';"
        "banner.style.color = 'gray';"
        "banner.style.fontSize = 'smaller';"
        "banner.innerText = '(neodesmos enabled)';"
        "document.querySelector('span[class=dcg-noedit-branding]').prepend(banner);"
    )

    insert_before_re(r'\},\S\}\(\S\.Class\);\S\.DesmosSVGLogo=\S',
        ";"
        "var banner = document.createElement('h1');"
        "banner.style.display = 'inline';"
        "banner.style.verticalAlign = 'sub';"
        "banner.style.padding = '0';"
        "banner.style.margin = '0';"
        "banner.style.marginRight = '-0.2em';"
        "banner.innerText = 'neo';"
        "document.querySelector('div[class=dcg-header-desktop] > div[class=align-center-container]').prepend(banner);"
    )


def default_dark():
    patch_inject_init('controller.graphSettings.config.invertedColors = true;')


def support_inf():
    insert_before_re('(\S)\.infty=\S\.infin=\S\.infinity=', 'g.inf=') # TODO: convert to insert_before_re
    insert_after_re(r'var \S\="alpha beta ', 'inf ')


def support_nrt():
    insert_after_re(r'(\S).nthroot=(\S\S),', r'\2.nrt=\3,')
    insert_after_re(r'var \S\="alpha beta ', 'nrt ')


def support_degrees():
    # not fully implemented
    return False
    insert_after_re(r'(\S)\["√"\]\=function\(\)\{return new (\S\S)\("\\\\sqrt\{\}"\)\}', r',\2.deg=function(){return new \3("^{\\circ}")}')
    insert_after_re('var \S="alpha beta ', 'deg ')


def support_greek():
    letters = ["gamma", "delta", "zeta", "eta", "iota", "kappa", "mu", "nu", "xi", "rho", "sigma", "tau", "chi", "psi"]
    insert_after_re('var \S="alpha beta ', ''.join(letter + ' ' for letter in letters))


######

features = [
    disable_bugsnag,
    inject_globals,

    inject_neodesmos_banner,
    default_dark,

    support_inf,
    support_nrt,

    support_degrees,
    support_greek
]

for feature in features:
    print(f'Adding feature {feature.__name__}...')
    feature()

######

with open('calculator_desktop_patched.min.js', 'w') as f:
    f.write(source)
