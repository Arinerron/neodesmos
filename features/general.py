#!/usr/bin/env python3

from . import *

class DisableBugsnagFeature(Feature):
    critical = True

    def patch(self):
        self.insert_after('sessions.bugsnag.com', '.example.com')
        self.insert_after('notify.bugsnag.com', '.example.com')


class InjectGlobalsFeature(Feature):
    critical = True

    def patch(self):
        self.insert_after_re('^var requirejs,require,define;', (
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
        self.insert_after_re(r'\S\.prototype\.setRootElt\=function\((\S)\)\{', r'window.controller=this;PATCH_INIT();')


class InjectBannerFeature(Feature):
    def patch(self):
        with open('default_logo.txt', 'r') as f:
            default_logo = f.read().rstrip("\n")
        with open('neo_logo.txt', 'r') as f:
            neo_logo = f.read().rstrip("\n")

        self.replace(default_logo, neo_logo)


class DefaultDarkFeature(Feature):
    def patch(self):
        self.patch_inject_init('controller.graphSettings.config.invertedColors = true;')


