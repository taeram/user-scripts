// ==UserScript==
// @name            A Dark Room - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for A Dark Room
// @match           http://adarkroom.doublespeakgames.com/
// @grant           none
// @copyright       Jesse Patching
// @version         2.3.0
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/a_dark_room.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/a_dark_room.user.js
// ==/UserScript==

import $ from "jquery";

class ADR {
    private static intervals: {};
    private static resources: {};
    private static elements: {};
    private static weapons: {};

    static init() {
        // Keep that fire stoked.
        this.intervals['stokeFire'] = setInterval(this.stokeFire, 300 * 1000);
        this.stokeFire();

        // Gather resources.
        this.intervals['gatherWood'] = setInterval(this.gatherWood, 1000);
        this.intervals['checkTraps'] = setInterval(this.checkTraps, 1000);

        // Build all the things.
        this.intervals['buildThings'] = setInterval(this.buildThings, 30 * 1000);
        this.buildThings();

        // Balance the workers.
        this.intervals['balanceWorkers'] = setInterval(this.balanceWorkers, 1000);
        this.balanceWorkers();

        // Handle any incoming events.
        this.intervals['handleEvent'] = setInterval(this.handleEvent, 1000);

        // Handle any fighting.
        this.intervals['handleFighting'] = setInterval(this.handleFighting, 250);
    }

    static stokeFire() {
        $('#stokeButton').click();
    }

    static gatherWood() {
        $('#gatherButton').click();
    }

    static checkTraps() {
        $('#trapsButton').click();
    }

    static countResources() {
        let stores = $('#stores .storeRow');
        for (var i = 0; i < stores.length; i++) {
            let store = stores[i];
            this.resources[$(store).find('> .row_key').text()] = parseInt($(store).find('> .row_val').text(), 10);
        }

        let weapons = $('#weapons .storeRow');
        for (i = 0; i < weapons.length; i++) {
            let weapon = weapons[i];
            this.weapons[$(weapon).find('> .row_key').text()] = parseInt($(weapon).find('> .row_val').text(), 10);
        }
    }

    static hasEnoughResources(buttonEl) {
        this.countResources();

        // Figure out how many resources we need to purchase this thing
        let requiredResources = {};
        let resourceTooltips = $(buttonEl).find('.tooltip .row_key,.row_val');
        for (var j = 0; j < resourceTooltips.length; j += 2) {
            requiredResources[$(resourceTooltips[j]).text()] = parseInt($(resourceTooltips[j + 1]).text(), 10);
        }

        // Do we have enough resources to purchase this?
        for (var key in requiredResources) {
            if (this.resources[key] < requiredResources[key]) {
                return false;
            }
        }

        return true;
    }

    static balanceWorkers() {
        let productionPerInterval = {};

        let workers = {};
        let rows = $('#workers .workerRow');
        for (var i = 0; i < rows.length; i++) {
            let name = $(rows[i]).attr('key');
            let count = $(rows[i]).find('.row_val > span:first-child').text();
            let resources = {};

            let resourceRows = $(rows[i]).find('.tooltip .storeRow');
            for (var j = 0; j < resourceRows.length; j++) {
                let key = $(resourceRows[j]).find('.row_key').text();
                let matches = $(resourceRows[j]).find('.row_val').text().match(/^(.+?) per (.+)s$/);
                if (matches) {
                    let value = parseInt(matches[1], 10);
                    let interval = parseInt(matches[2], 10);

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
            }

            workers[name] = {
                count: count,
                resources: resources
            };
        }

        if (typeof this.elements['production_per_interval'] === 'undefined') {
            this.elements['production_per_interval'] = $('<div></div>').appendTo('#workers');
        }
        $(this.elements['production_per_interval']).empty();
        for (var key in productionPerInterval) {
            $(this.elements['production_per_interval']).append('<div class="row_val">' + productionPerInterval[key] + '</div><div>' + key + '</div>');
        }
    }

    static buildThings() {
        this.countResources();

        // Build all the things
        let things = $('#buildBtns .button');
        for (var i = 0; i < things.length; i++) {
            if ($(things[i]).hasClass('disabled')) {
                continue;
            }

            if (this.hasEnoughResources(things[i])) {
                $(things[i]).click();
            }
        }

        // Craft most of the things
        let items = $('#craftBtns .button');
        for (i = 0; i < items.length; i++) {
            if ($(items[i]).hasClass('disabled')) {
                continue;
            }

            let itemName = $(items[i]).attr('id').replace(/build_/, '');

            // Always have torches on hand.
            if (itemName == 'torch' && this.resources.torch >= 10) {
                continue;
            }

            // Only buy one of each weapon.
            if (this.weapons[itemName] >= 1) {
                continue;
            }

            if (this.hasEnoughResources(items[i])) {
                $(items[i]).click();
            }
        }

        // Buy a few things
        let purchases = $('#buyBtns .button');
        for (i = 0; i < purchases.length; i++) {
            if ($(purchases[i]).hasClass('disabled')) {
                continue;
            }

            let purchaseName = $(purchases[i]).attr('id').replace(/build_/, '');
            let purchaseItem = false;

            // Buy a compass
            if (purchaseName == 'compass') {
                purchaseItem = true;
            }

            // Always have bolas
            if (purchaseName == 'bolas' && this.weapons.bolas <= 10) {
                purchaseItem = true;
            }

            // Always have bullets
            if (purchaseName == 'bullets' && this.resources.bullets <= 50) {
                purchaseItem = true;
            }

            if (purchaseItem && this.hasEnoughResources(purchases[i])) {
                $(purchases[i]).click();
            }
        }
    }

    static handleEvent() {
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
    }

    static handleFighting() {
        if ($('#event').length > 0) {
            $('.weaponButton').click();
        }

        // Eat meat.
        let $eat = $('#healButtons #eat');
        if ($eat.hasClass('disabled')) {
            $eat = null;
        }

        let hp = this.getHp();
        if ($eat && hp.current < (hp.max - World.MEAT_HEAL)) {
            console.log("Eating Meat");
            $('#healButtons #eat').click();
        }

        // Use medicine.
        let $meds = $('#healButtons #meds');
        if ($meds.hasClass('disabled')) {
            $meds = null;
        }

        hp = this.getHp();
        if ($meds && (hp.current < (hp.max - World.MEDS_HEAL) || !$eat && hp.current <= hp.max / 2)) {
            console.log("Using meds");
            $('#healButtons #meds').click();
        }
    }

    static getHp() {
        let currentHp = null;
        let maxHp = null;

        let hp = $('#wanderer .hp').text();
        if (hp.length > 0) {
            hp = hp.match(/(\d+)\/(\d+)/)
            if (hp.length > 0) {
                currentHp = hp[1];
                maxHp = hp[2];
            }
        }

        return {
            'current': currentHp,
            'max': maxHp
        };
    }
}

ADR.init();
