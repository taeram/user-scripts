// ==UserScript==
// @name       Tidy BookOS.org
// @namespace  http://github.com/taeram/
// @version    1.0.0
// @description  Tidy BookOS.org search results
// @match      http://bookos.org/s/*
// @copyright  2013 Jesse Patching
// @license    MIT http://opensource.org/licenses/MIT
// @updateURL   https://raw.github.com/taeram/user-scripts/master/tidy-bookos.user.js
// @downloadURL https://raw.github.com/taeram/user-scripts/master/tidy-bookos.user.js
// ==/UserScript==

// Remove invalid search results
$('.resItemBox').each(function (i, v) { 
    if ($(v).text().match(/Link deleted/)) { 
        $(v).remove(); 
    } 
});
