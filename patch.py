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

def insert_before_re(needle, data):
    global source
    _check_needle_re(needle)
    source = re.sub('('+needle+')', data + r'\1', source)

def insert_after_re(needle, data):
    global source
    _check_needle_re(needle)
    source = re.sub('('+needle+')', r'\1' + data, source)

######

def support_inf():
    insert_before('g.infty=g.infin=g.infinity=', 'g.inf=')
    insert_after('var e="alpha beta ', 'inf ')


######

features = [
    support_inf
]

for feature in features:
    print(f'Adding feature {feature.__name__}...')
    feature()

######

with open('calculator_desktop_patched.min.js', 'w') as f:
    f.write(source)
