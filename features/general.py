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
            'window.neodesmos = new Object();'
            'neodesmos.show_toast = function(msg) {'
                # NOTE: You can find more events you can dispatch by searching for "e.prototype.handleDispatchedAction = function(e) {" in the rev js file
                "window.controller.dispatch({"
                    'type: "toast/show",'
                    'toast: {'
                        'message: msg,'
                        #'hideAfter: 0,'
                        'toastStyle: "cover"'
                    "}"
                "})"
            '};'

            'var PATCH_INIT_RAN = false;'
            'function PATCH_INIT() {'
                'if (!PATCH_INIT_RAN) {'
                    'console.debug("Running PATCH_INIT scripts...");'
                    'PATCH_INIT_RAN = true;'
                    '/*PATCH_INIT*/'
                    r'console.log('+repr(r'                      _                               \n _ __   ___  ___   __| | ___  ___ _ __ ___   ___  ___ \n| \'_ \\ \/ _ \\\/ _ \\ \/ _` |\/ _ \\\/ __| \'_ ` _ \\ \/ _ \\\/ __|\n| | | |  __\/ (_) | (_| |  __\/\\__ \\ | | | | | (_) \\__ \\\n|_| |_|\\___|\\___\/ \\__,_|\\___||___\/_| |_| |_|\\___\/|___\/\n       \nYou\'re using neodesmos. Congrats!\n\nIf you want to help out with the project, see:\nhttps://github.com/Arinerron/neodesmos/wiki/ideas')+r');'
                '}'
            '};'

            "window.addEventListener('load', function() {/*PATCH_ONLOAD*/}, false);")
        )
        self.insert_after_re(r'\S\.prototype\.setRootElt\=function\((\S)\)\{', r'window.controller=this;PATCH_INIT();')


######


class InjectAboutFeature(Feature):
    def patch(self):
        self.insert_after_re(r'(\S)\.createElement\("a",\{class:\S\.const\("dcg-action-accountsettings',
            r'\2.createElement("a", {r'
                r'class: \2.const("dcg-action-neodesmos"),'
                r'role: \2.const("link"),'
                r'tabindex: \2.const(0),'
                r'onTap: function() { window.location = "https://github.com/Arinerron/neodesmos/"; }'
            r'}, function() {'
                r'return controller.s("account-shell-link-neodesmos")'
            r'}),')
        self.insert_before('\\naccount-shell-link-sign-out = ', '\\naccount-shell-link-neodesmos = About neodesmos')


class DefaultDarkFeature(Feature):
    def patch(self):
        self.patch_inject_init('controller.graphSettings.config.invertedColors = true;')
        self.replace('Reverse Contrast', 'Dark Theme', matches=4)


