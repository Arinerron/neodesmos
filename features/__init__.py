#!/usr/bin/env python3

import re

class Feature:
    critical = False # don't allow exporting JS without these features


    def __init__(self, source):
        self.source = source
    

    def _check_needle(self, needle, matches=1):
        if self.source.count(needle) != matches:
            raise ValueError('Found needle %s %d times in the self.source (expecting matches=%d)' % (needle, self.source.count(needle), matches))

    def _check_needle_re(self, needle, matches=1):
        needle = '(%s)' % needle
        count = len(re.findall(needle, self.source))
        if count != matches:
            raise ValueError('Found needle %s %d times in the self.source (expecting matches=%d)' % (needle, count, matches))


    def insert_before(self, needle, data, **kwargs):
        self._check_needle(needle, **kwargs)
        self.source = self.source.replace(needle, data + needle)


    def insert_after(self, needle, data, **kwargs):
        self._check_needle(needle, **kwargs)
        self.source = self.source.replace(needle, needle + data)


    def replace(self, needle, data, **kwargs):
        self._check_needle(needle, **kwargs)
        self.source = self.source.replace(needle, data)


    def insert_before_re(self, needle, data, **kwargs):
        self._check_needle_re(needle, **kwargs)
        self.source = re.sub('('+needle+')', data + r'\1', self.source)


    def insert_after_re(self, needle, data, **kwargs):
        self._check_needle_re(needle, **kwargs)
        self.source = re.sub('('+needle+')', r'\1' + data, self.source)


    
    ######


    def patch_inject_init(self, code):
        # wrap in {  } so variables have limited scope
        self.insert_before('/*PATCH_INIT*/', '{ %s }' % code)


    def patch_inject_onload(self, code):
        # wrap in {  } so variables have limited scope
        self.insert_before('/*PATCH_ONLOAD*/', '{ %s }' % code)


    ######


    def patch(self):
        raise NotImplementedError()


from . import vectors, symbols, general, banner


