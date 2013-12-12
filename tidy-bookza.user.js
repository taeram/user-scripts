// ==UserScript==
// @name       Tidy bookza.org
// @namespace  http://github.com/taeram/
// @version    1.0.0
// @description  Tidy bookza.org search results
// @match      http://bookza.org/s/*
// @copyright  2013 Jesse Patching
// @license    MIT http://opensource.org/licenses/MIT
// @updateURL   https://raw.github.com/taeram/user-scripts/master/tidy-bookza.user.js
// @downloadURL https://raw.github.com/taeram/user-scripts/master/tidy-bookza.user.js
// ==/UserScript==

// Remove invalid search results
$('.resItemBox').each(function (i, v) { 
    if ($(v).text().match(/Link deleted/)) { 
        $(v).remove(); 
    } 
});
