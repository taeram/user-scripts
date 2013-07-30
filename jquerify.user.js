// ==UserScript==
// @name            jQuerify
// @namespace       http://github.com/taeram/jquerify-user-script
// @description     Inject jQuery into every page
// @include         *
// @copyright       Jesse Patching
// @version         1.0.0
// @license         http://opensource.org/licenses/MIT
// ==/UserScript==

var jQueryFound = (typeof(jQuery) !== 'undefined');

if (!jQueryFound) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("body")[0].appendChild(script);
}
