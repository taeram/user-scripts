// ==UserScript==
// @name            The Onion - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Tidies theonion.com
// @match           http://*.theonion.com/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.4
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/the-onion-helper.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/the-onion-helper.user.js
// ==/UserScript==  

// Hide the overlays
$('head').append(
    '<style type="text/css">' + 
        '#pressplusOverlay, #ppUI {' + 
            'display: none;' + 
        '}' +
    '</style>'
);
    
