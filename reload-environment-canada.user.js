// ==UserScript==
// @name          Reload Environment Canada
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.0
// @description   Reloads the Environment Canada website once an hour
// @match         http://weather.gc.ca/city/pages/*
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// ==/UserScript==

var reloadAfter = 3600; // seconds
var secondsElapsed = 0;
var timerElement = $('<div style="position: absolute; right: 5px; top: 5px; color: white;" id="reloadTimer">' + 
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
    
