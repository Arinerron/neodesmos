#!/usr/bin/env python3

from . import *


class SupportInfFeature(Feature):
    def patch(self):
        self.insert_before_re('(\S)\.infty=\S\.infin=\S\.infinity=', 'g.inf=')
        self.insert_after_re(r'var \S\="alpha beta ', 'inf ')


class SupportNrtFeature(Feature):
    def patch(self):
        self.insert_after_re(r'(\S).nthroot=(\S\S),', r'\2.nrt=\3,')
        self.insert_after_re(r'var \S\="alpha beta ', 'nrt ')


class SupportDegreesFeature(Feature):
    def patch(self):
        raise NotImplementedError()
        self.insert_after_re(r'(\S)\["√"\]\=function\(\)\{return new (\S\S)\("\\\\sqrt\{\}"\)\}', r',\2.deg=function(){return new \3("^{\\circ}")}')
        self.insert_after_re('var \S="alpha beta ', 'deg ')


class SupportGreekFeature(Feature):
    def patch(self):
        letters = ["gamma", "delta", "zeta", "eta", "iota", "kappa", "mu", "nu", "xi", "rho", "sigma", "tau", "chi", "psi"]
        self.insert_after_re('var \S="alpha beta ', ''.join(letter + ' ' for letter in letters))
