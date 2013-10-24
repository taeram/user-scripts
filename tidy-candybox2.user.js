// ==UserScript==
// @name       Tidy Candy Box 2 style
// @namespace  http://github.com/taeram/
// @version    1.0.0
// @description  Fixes some CSS for Candybox 2 on machines without the "monospace" font
// @match      http://candybox2.net/*
// @copyright  2013 Jesse Patching
// @license    MIT http://opensource.org/licenses/MIT
// @updateURL   https://raw.github.com/taeram/user-scripts/master/tidy-candybox2.user.js
// @downloadURL https://raw.github.com/taeram/user-scripts/master/tidy-candybox2.user.js
// ==/UserScript==

$('head').append(
    '<style>' + 
        'pre {' + 
            'font-family: courier;' + 
            'font-size: 12px;' + 
        '}' + 
    '</style>'
);

