// ==UserScript==
// @name            A Dark Room - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for A Dark Room
// @match           http://adarkroom.doublespeakgames.com/
// @grant           none
// @copyright       Jesse Patching
// @version         2.1.1
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
        },

        handleEvent: function () {
            if ($('#event').length > 0) {
                // Allow the old wanderer to stay the night
                if ($('#agree').length > 0) {
                    $('#agree').click();

                    // Learn scouting
                    $('#learn').click();

                    // Buy a shit load of maps
                    if ($('#buyMap').length > 0) {
                        var numMapsBought = 0;
                        while (!$('#buyMap').hasClass('disabled')) {
                            $('#buyMap').click();
                            numMapsBought++;
                        }
                        console.log("Bought " + numMapsBought + " maps");
                    }
                }

                // Spare the thief
                if ($('#spare').length > 0) {
                    $('#spare').click();
                    $('#leave').click();
                }

                // Mourn the dead
                if ($('#mourn').length > 0) {
                    $('#mourn').click();
                }

                // Track the prints into the forest
                if ($('#track').length > 0) {
                    $('#track').click();
                    $('#end').click();
                }

                // Investigate the scratching noises
                if ($('#investigate').length > 0) {
                    $('#investigate').click();
                    $('#leave').click();
                }

                // Give the beggar some furs
                if ($('#100furs').length > 0) {
                    $('#100furs').click();
                    $('#50furs').click();
                    $('#leave').click();
                }

                // Give the man some medicine
                if ($('#help').length > 0) {
                    $('#help').click();
                    $('#bye').click();
                }

                // Go home after the beasts attack
                if ($('#end').length > 0) {
                    $('#end').click();
                }
            }
        },

        handleFighting: function () {
            if ($('#event').length > 0) {
                $('.weaponButton').click();
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

    // Handle any incoming events
    ADR.intervals.handleEvent = setInterval(ADR.handleEvent, 1000);

    // Handle any fighting
    ADR.intervals.handleFighting = setInterval(ADR.handleFighting, 250);
})();
