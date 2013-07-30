// ==UserScript==
// @name            jQuerify
// @namespace       http://github.com/taeram/user-scripts
// @description     Inject jQuery into every page
// @include         *
// @copyright       Jesse Patching
// @version         1.0.0
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// ==/UserScript==

var jQueryFound = (typeof(jQuery) !== 'undefined');

if (!jQueryFound) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("body")[0].appendChild(script);
}
