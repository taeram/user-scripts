// ==UserScript==
// @name            Environment Canada - Reload every hour
// @namespace       http://github.com/taeram/user-scripts
// @description     Reloads the Environment Canada website once an hour
// @match           https://weather.gc.ca/en/location/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.5
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/dist/environment-canada-reload-every-hour.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/dist/environment-canada-reload-every-hour.user.js
// @icon            https://www.google.com/s2/favicons?domain=weather.gc.ca
// ==/UserScript==

/* jshint -W097 */
'use strict';

var reloadAfter = 3600; // seconds
var secondsElapsed = 0;
var timerElement = $('<div style="position: absolute; right: 5px; top: 5px; color: black; font-size: 9px" id="reloadTimer">' +
                       'Reloading in <span class="time">' + reloadAfter + '</span> seconds' +
                     '</div>').appendTo('body');

var reloadEvent = function () {
    // One more second has passed
    secondsElapsed++;

    // Update the reload message
    var secondsUntilReload = (reloadAfter - secondsElapsed);
    $(timerElement).find('.time').text(secondsUntilReload);

    // Reload if we've hit the limit
    if (secondsElapsed >= reloadAfter) {
        window.location.reload();
    }
};

setInterval(reloadEvent, 1000)
