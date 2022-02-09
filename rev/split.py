#!/usr/bin/env python3

import os.path

with open('calculator_desktop.js', 'r') as f:
    contents = f.read()

ROOT_DIRECTORY = 'files/'

first = True

prefix = '\ndefine('
for match in contents.split(prefix):
    if first:
        filename = 'init.js'
        first = False
    else:
        delimeter = match[0] # ' or "
        filename = match[1:].split(delimeter, 1)[0].replace('!', '_') + '.js'

    print(f'writing {ROOT_DIRECTORY}{filename}')

    os.makedirs(ROOT_DIRECTORY + os.path.dirname(filename), exist_ok=True)
    with open(ROOT_DIRECTORY + filename, 'w') as f:
        f.write(prefix.lstrip() + match)

