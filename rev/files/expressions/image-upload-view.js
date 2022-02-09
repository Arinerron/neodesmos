define('expressions/image-upload-view', ["require", "exports", "tslib", "dcgview", "jquery", "main/manage-focus-helper"], function(require, t, e, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.ImageUploadView = void 0;
    var s = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(s, t),
        s.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        s.prototype.template = function() {
            return n.createElement("div", {
                class: n.const("dcg-do-not-blur"),
                onTap: this.bindFn(this.newImage),
                handleEvent: n.const("true"),
                role: n.const("button"),
                tabindex: n.const(0),
                "aria-label": this.props.ariaLabel,
                manageFocus: this.const(this.props.location ? i.manageFocusHelper({
                    controller: this.controller,
                    location: this.props.location()
                }) : void 0)
            }, this.children, n.createElement("input", {
                type: n.const("file"),
                accept: n.const("image/*"),
                style: n.const("display: none"),
                didMount: this.bindFn(this.didMountFileInput)
            }))
        }
        ,
        s.prototype.didMountFileInput = function(t) {
            var e = this;
            this.fileInputNode = t,
            o(t).on("change", function() {
                e.props.onFileChange(t.files),
                o(t).val("")
            })
        }
        ,
        s.prototype.newImage = function() {
            this.fileInputNode.click()
        }
        ,
        s
    }(n.Class);
    t.ImageUploadView = s
});
