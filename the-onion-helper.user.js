// ==UserScript==
// @name          The Onion - Helper
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.3
// @description   Tidies theonion.com
// @match         http://*.theonion.com/*
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/the-onion-helper.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/the-onion-helper.user.js
// ==/UserScript==

// Hide the overlays
$('head').append(
    '<style type="text/css">' + 
        '#pressplusOverlay, #ppUI {' + 
            'display: none;' + 
        '}' +
    '</style>'
);
    
