'use strict';

chrome.runtime.onInstalled.addListener(details => {
    console.log('previousVersion', details.previousVersion);
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log('neodesmos logged request:', details)
        if (details.url.match(/https?:\/\/(www\.)?desmos\.com\/$/))
            return {redirectUrl: 'https://desmos.com/calculator' };
        if (details.url.match(/https?:\/\/(www\.)?desmos\.com\/assets\/build\/calculator_desktop-.*\.js$/))
            return {redirectUrl: 'https://arinerron.github.io/neodesmos/files/calculator_desktop_patched.min.js'}
    },
    {urls: ["*://www.desmos.com/*"]},
    ["blocking"]
);

// TODO: be sure to intercept and make sure the source is desmos
/*chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return {cancel: true};
    },
    {
        urls: ["*://*.bugsnag.com/*"]
    },
    ["blocking"]
);*/
