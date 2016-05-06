// ==UserScript==
// @name            A Dark Room - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for A Dark Room
// @match           http://adarkroom.doublespeakgames.com/
// @grant           none
// @copyright       Jesse Patching
// @version         2.0.0
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/a-dark-room.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/a-dark-room.user.js
// ==/UserScript==

(function() {
    'use strict';
    var ADR = {
        intervals: {},

        stokeFire: function () {
            $('#stokeButton').click();
        },

        gatherWood: function ()  {
            $('#gatherButton').click();
        },

        checkTraps: function ()  {
            $('#trapsButton').click();
        },

        buildThings: function () {
            var things = $('#buildBtns .button');
            for (var i=0; i < things.length; i++) {
                if ($(things[i]).hasClass('disabled')) {
                    continue;
                }

                $(things[i]).click();
            }
        }
    };

    // Keep that fire stoked
    ADR.intervals.stokeFire = setInterval(ADR.stokeFire, 300000);
    ADR.stokeFire();

    // Gather resources
    ADR.intervals.gatherWood = setInterval(ADR.gatherWood, 1000);
    ADR.intervals.checkTraps = setInterval(ADR.checkTraps, 1000);

    // Build all the things
    ADR.intervals.buildThings = setInterval(ADR.buildThings, 30000);
    ADR.buildThings();
})();
