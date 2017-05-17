// ==UserScript==
// @name            Instagram Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Allow viewing and downloading full size Instagram photos
// @match           https://www.instagram.com/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/instagram-helper.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/instagram-helper.user.js
// ==/UserScript==

(function() {
    'use strict';

    // jQuerify the page
    var jQueryFound = (typeof(jQuery) !== 'undefined');
    if (!jQueryFound) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js";
        document.getElementsByTagName("body")[0].appendChild(script);
    }

    // Wait for jQuery to finish loading
    var jQueryInterval = setInterval(function () {
        if (typeof $ !== 'undefined') {
            clearInterval(jQueryInterval);
            main();
        }
    }, 100);

    var main = function () {
        var $ = window.$;
        var removeOverlayInterval = setInterval(function () {
            $('._ovg3g').remove();
        }, 250);
    };
}());
