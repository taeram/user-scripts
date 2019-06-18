// ==UserScript==
// @name            A Dark Room - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for A Dark Room
// @match           http://adarkroom.doublespeakgames.com/
// @grant           none
// @copyright       Jesse Patching
// @version         2.2.0
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/a-dark-room.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/a-dark-room.user.js
// ==/UserScript==

(function() {
    'use strict';
    var ADR = {
        intervals: {},
        resources: {},
        elements: {},
        weapons: {},

        stokeFire: function () {
            $('#stokeButton').click();
        },

        gatherWood: function ()  {
            $('#gatherButton').click();
        },

        checkTraps: function ()  {
            $('#trapsButton').click();
        },

        countResources: function () {
            var stores = $('#stores .storeRow');
            for (var i = 0; i < stores.length; i++) {
                var store = stores[i];
                ADR.resources[$(store).find('> .row_key').text()] = parseInt($(store).find('> .row_val').text(), 10);
            }

            var weapons = $('#weapons .storeRow');
            for (i = 0; i < weapons.length; i++) {
                var weapon = weapons[i];
                ADR.weapons[$(weapon).find('> .row_key').text()] = parseInt($(weapon).find('> .row_val').text(), 10);
            }
        },

        hasEnoughResources: function(buttonEl) {
            ADR.countResources();

            // Figure out how many resources we need to purchase this thing
            var requiredResources = {};
            var resourceTooltips = $(buttonEl).find('.tooltip .row_key,.row_val');
            for (var j = 0; j < resourceTooltips.length; j += 2) {
                requiredResources[$(resourceTooltips[j]).text()] = parseInt($(resourceTooltips[j + 1]).text(), 10);
            }

            // Do we have enough resources to purchase this?
            for (var key in requiredResources) {
                if (ADR.resources[key] < requiredResources[key]) {
                    return false;
                }
            }

            return true;
        },

        balanceWorkers: function () {
            var resourceLimits = {
                bait: 1000,
                bullets: 1000,
                coal: 1000,
                "cured meat": 1000,
                iron: 1000,
                leather: 1000,
                fur: 1000,
                meat: 1000,
                steel: 1000,
                sulphur: 1000,
                wood: 1000,
            };

            var productionPerInterval = {
            };

            var workers = {};
            var rows = $('#workers .workerRow');
            for (var i = 0; i < rows.length; i++) {
                var name = $(rows[i]).attr('key');
                var count = $(rows[i]).find('.row_val > span:first-child').text();
                var resources = {};

                var resourceRows = $(rows[i]).find('.tooltip .storeRow');
                for (var j = 0; j < resourceRows.length; j++) {
                    var key = $(resourceRows[j]).find('.row_key').text();
                    var matches = $(resourceRows[j]).find('.row_val').text().match(/^(.+?) per (.+)s$/);
                    var value = parseInt(matches[1], 10);
                    var interval = parseInt(matches[2], 10);

                    resources[key] = {
                        value: value,
                        interval: interval
                    };

                    if (typeof productionPerInterval[key] === 'undefined') {
                        productionPerInterval[key] = value;
                    } else {
                        productionPerInterval[key] += value;
                    }
                }

                workers[name] = {
                    count: count,
                    resources: resources
                };
            }

            if (typeof ADR.elements.production_per_interval === 'undefined') {
                ADR.elements.production_per_interval = $('<div></div>').appendTo('#workers');
            }
            $(ADR.elements.production_per_interval).empty();
            for (var key in productionPerInterval) {
                $(ADR.elements.production_per_interval).append('<div class="row_val">' + productionPerInterval[key] + '</div><div>' + key + '</div>');
            }
        },

        buildThings: function () {
            ADR.countResources();

            // Build all the things
            var things = $('#buildBtns .button');
            for (var i=0; i < things.length; i++) {
                if ($(things[i]).hasClass('disabled')) {
                    continue;
                }

                if (ADR.hasEnoughResources(things[i])) {
                    $(things[i]).click();
                }
            }

            // Craft most of the things
            var items = $('#craftBtns .button');
            for (i = 0; i < items.length; i++) {
                if ($(items[i]).hasClass('disabled')) {
                    continue;
                }

                var itemName = $(items[i]).attr('id').replace(/build_/, '');

                // Always have torches on hand
                if (itemName == 'torch' && ADR.resources.torch >= 10) {
                    continue;
                }

                // Only buy one of each weapon
                if (ADR.weapons[itemName] >= 1) {
                    continue;
                }

                if (ADR.hasEnoughResources(items[i])) {
                    $(items[i]).click();
                }
            }

            // Buy a few things
            var purchases = $('#buyBtns .button');
            for (i = 0; i < purchases.length; i++) {
                if ($(purchases[i]).hasClass('disabled')) {
                    continue;
                }

                var purchaseName = $(purchases[i]).attr('id').replace(/build_/, '');
                var purchaseItem = false;

                // Buy a compass
                if (purchaseName == 'compass') {
                    purchaseItem = true;
                }

                // Always have bolas
                if (purchaseName == 'bolas' && ADR.weapons.bolas <= 10) {
                    purchaseItem = true;
                }

                // Always have bullets
                if (purchaseName == 'bullets' && ADR.resources.bullets <= 50) {
                    purchaseItem = true;
                }

                if (purchaseItem && ADR.hasEnoughResources(purchases[i])) {
                    $(purchases[i]).click();
                }
            }
        },

        handleEvent: function () {
            if ($('#event').length > 0) {
                // Allow the old wanderer to stay the night
                if ($('#agree').length > 0 || $('#buyMap').length > 0) {
                    $('#agree').click();

                    // Learn scouting
                    $('#learn').click();

                    // Buy a shit load of maps
                    if ($('#buyMap').length > 0) {
                        while (!$('#buyMap').hasClass('disabled')) {
                            $('#buyMap').click();
                        }
                    }

                    $('#leave').click();
                    $('#deny').click();
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
                    $('#deny').click();
                }

                // Give the beggar some furs
                if ($('#fur100').length > 0) {
                    $('#fur500').click();
                    $('#fur100').click();
                    $('#leave').click();
                    $('#deny').click();
                }

                // Give the wanderer some wood
                if ($('#wood500').length > 0) {
                    $('#wood500').click();
                    $('#wood100').click();
                    $('#leave').click();
                    $('#deny').click();
                }

                // Give the man some medicine
                if ($('#help').length > 0) {
                    $('#help').click();
                    $('#bye').click();
                }

                // Buy medicine to prevent the plague from spreading
                if ($('#buyMedicine').length > 0) {
                    $('#heal').click();
                    $('#buyMedicine').click();
                    $('#ignore').click();
                }

                // Buy a compass from the nomad
                if ($('#buyCompass').length > 0) {
                    $('#buyCompass').click();
                    $('#goodbye').click();
                }

                // Grab a trait
                if ($('#evasion').length > 0) {
                    $('#evasion').click();
                    $('#precision').click();
                    $('#force').click();
                    $('#nothing').click();
                }

                // Go home after the beasts attack
                if ($('#end').length > 0) {
                    $('#end').click();
                }

                // Go back inside
                if ($('#backinside').length > 0) {
                    $('#backinside').click();
                }

                // Loot from an outpost and leave
                if ($('.eventTitle').text() === 'An Outpost') {
                    $('#loot_takeEverything').click();
                    $('#leave').click();
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

    // Balance the workers
    ADR.intervals.balanceWorkers = setInterval(ADR.balanceWorkers, 1000);
    ADR.balanceWorkers();

    // Handle any incoming events
    ADR.intervals.handleEvent = setInterval(ADR.handleEvent, 1000);

    // Handle any fighting
    ADR.intervals.handleFighting = setInterval(ADR.handleFighting, 250);
})();
