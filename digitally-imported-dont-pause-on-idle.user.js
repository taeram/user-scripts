// ==UserScript==
// @name            Digitally Imported - Don't Pause on Idle
// @namespace       http://github.com/taeram/user-scripts
// @description     Don't pause playback on idle
// @match           http://www.di.fm/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.2
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/digitally-imported-dont-pause-on-idle.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/digitally-imported-dont-pause-on-idle.user.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

setInterval(function () {
    // Click the Play button
    if ($('.controls a.icon-play').length > 0) {
        $('.controls a.icon-play').trigger('click');
    }
}, 1000);
