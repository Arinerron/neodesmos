#!/usr/bin/env python3

from . import *


class SupportInfFeature(Feature):
    def patch(self):
        self.insert_before_re(r'(\S)\.infty=\S\.infin=\S\.infinity=', 'g.inf=')
        self.insert_after_re(r'var \S\="alpha beta ', 'inf ')


class SupportNrtFeature(Feature):
    def patch(self):
        self.insert_after_re(r'(\S).nthroot=(\S\S),', r'\2.nrt=\3,')
        self.insert_after_re(r'var \S\="alpha beta ', 'nrt ')


class SupportDegreesFeature(Feature):
    def patch(self):
        raise NotImplementedError()
        self.insert_after_re(r'(\S)\["√"\]\=function\(\)\{return new (\S\S)\("\\\\sqrt\{\}"\)\}', r',\2.deg=function(){return new \3("^{\\circ}")}')
        self.insert_after_re(r'var \S="alpha beta ', 'deg ')


class SupportGreekFeature(Feature):
    def patch(self):
        letters = ["alpha", "beta", "gamma", "delta", "zeta", "eta", "iota", "kappa", "mu", "nu", "xi", "rho", "sigma", "tau", "chi", "psi"]
        self.insert_after_re(r'var \S="alpha beta ', ''.join(letter + ' ' for letter in letters))


class SupportLaTeXFeature(Feature):
    def patch(self):
        symbols = 'alpha beta gamma delta zeta eta iota kappa mu nu xi rho sigma tau chi psi theta phi pi tau infty'.split()
        self.replace_re(r'var (\S)="alpha beta', r'var \2="' + re.escape(' '.join(['\\\\'+x for x in symbols])))

        variable_name = re.findall(r',(\S)\.alpha=', self.source)
        assert len(variable_name) == 1, 'Failed to find variable_name'
        variable_name = variable_name[0]

        for symbol in symbols:
            with open('/tmp/asdf2', 'w') as f:
                f.write(self.source)

            self.insert_after_re(r'[,=]'+variable_name+'.' + re.escape(symbol) + '=', variable_name+'["\\\\\\\\' + symbol + '"]=')

        # make the filter allow backslashes
        self.replace_re(re.escape(r'.autoCommands=function(') + r'(\S)' + re.escape(r'){if(!/^[a-z]+(?: [a-z]+)'),
            r'.autoCommands=function(\2){if(!/^[a-z\\\\]+(?: [a-z\\\\]+)')
