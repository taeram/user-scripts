// ==UserScript==
// @name            Facebook Messenger Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for Facebook Messenger
// @description     Converts all facebook-redirected URLs to plain URLs
// @match           https://www.messenger.com/t/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.2
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/facebook-messenger-helper.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/facebook-messenger-helper.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Create the helper function
    var helperFunction = function FBMessengerHelper() {
        // Add min.js: https://github.com/remy/min.js/blob/0520bdb162640ee09391531cfc12b1e5c5fb7bb2/dist/%24.min.js
        var $ = function(t,n,e){var i=Node.prototype,r=NodeList.prototype,o="forEach",u="trigger",c=[][o],s=t.createElement("i");return r[o]=c,n.on=i.on=function(t,n){return this.addEventListener(t,n,!1),this},r.on=function(t,n){return this[o](function(e){e.on(t,n)}),this},n[u]=i[u]=function(n,e){var i=t.createEvent("HTMLEvents");return i.initEvent(n,!0,!0),i.data=e||{},i.eventName=n,i.target=this,this.dispatchEvent(i),this},r[u]=function(t){return this[o](function(n){n[u](t)}),this},e=function(n){var e=t.querySelectorAll(n||"☺"),i=e.length;return 1==i?e[0]:e},e.on=i.on.bind(s),e[u]=i[u].bind(s),e}(document,this);

        /**
         * Decode a URL
         * Retrieved on 2016-12-12 from http://locutus.io/php/urldecode/
         *
         * @param string str The url to decode
         *
         * @return string
         */
        function urldecode(str) {
            return decodeURIComponent((str + '').replace(/%(?![\da-f]{2})/gi, function () {
                // PHP tolerates poorly formed escape sequences
                return '%25';
            }).replace(/\+/g, '%20'));
        }

        // Search the page for unprocessed links on a regular interval
        var linkRefreshInterval = setInterval(function () {
            // Get the list of links
            var links = $('.uiScrollableArea.contentBefore .uiScrollableAreaContent a');
            if (typeof links == "object" && links.length === undefined) {
                // Properly handle single element "arrays"
                links = [links];
            }

            // Process the links
            if (links.length > 0) {
                links.forEach(function (el, index) {
                    // Override the link redirect via facebook
                    if (el.class != 'processed' && (el.href.match(/l.facebook.com/) || el.href.match(/www.facebook.com/))) {
                        replacementUrl = el.href.replace(/^.*l.php\?u=/, '').replace(/&.*$/, '');
                        replacementUrl = urldecode(replacementUrl);
                        el.href = replacementUrl;

                        el.class = 'processed';
                    }
                });
            }
        }, 500);
    };
    var functionString = helperFunction.toString() + '; FBMessengerHelper();';
    addScriptToPage(functionString);

    /**
     * Add a <script> tag to the page
     * - Because of Messenger's CSRF policy, we need to insert javascript as a blob: urls
     *
     * @param string script The javascript to add to the page
     */
    function addScriptToPage(script) {
        var scriptBlob = new Blob([functionString], { type: "text/javascript" });
        var scriptTag = document.createElement('script');
        scriptTag.src = URL.createObjectURL(scriptBlob);
        document.getElementsByTagName('body')[0].appendChild(scriptTag);
    }
})();
