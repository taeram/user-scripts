// ==UserScript==
// @name            IPTorrents - Seeding Selector
// @namespace       http://github.com/taeram/user-scripts
// @description     Calculate which are the best FreeLeech torrents to seed to bump up your ratio
// @match           https://www.iptorrents.com/t*
// @match           https://iptorrents.com/t*
// @grant           unsafeWindow
// @copyright       Jesse Patching
// @version         1.4.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Wait for jQuery to finish loading
    var jQueryInterval = setInterval(function () {
        if (typeof $ !== 'undefined') {
            clearInterval(jQueryInterval);
            main();
        }
    }, 100);

    function main () {
        var minNumSeeders = 1;
        var minSeedToLeechRatio = 0.30;

        var $ = unsafeWindow.$;
        var torrents = $('table#torrents tr');
        $('table#torrents tr:first').append('<th class="ac" style="text-align: center">Leecher %</td>');
        for (var i=0; i < torrents.length; i++) {
            var torrent = torrents[i];
            var url = $(torrent).find('.t_title').attr('href');
            if (url) {
                var id = url.replace(/^.*d=/, '');
                var title = $(torrent).find('.t_title').text();
                var numSeeders = parseInt($(torrent).find('.t_seeders').text());
                var numLeechers = parseInt($(torrent).find('.t_leechers').text());
                var seedToLeechRatio = numLeechers / numSeeders;
                $(torrent).append('<td style="text-align: center">' + round(seedToLeechRatio * 100, 2) + '%</td>');
                if (numSeeders >= minNumSeeders && seedToLeechRatio >= minSeedToLeechRatio) {
                    $(torrent).attr('style', 'background-color: #1F351F');
                }
            }
        }
    }

    // Retrieved on 2016-06-10 from https://github.com/kvz/locutus/blob/master/src/php/math/round.js
    // Modified for use in IPTorrents - Seeding Selector
    function round (value, precision) {
        //  discuss at: http://locutus.io/php/round/

        var m, f, isHalf, sgn; // helper variables
        // making sure precision is integer
        precision |= 0;
        m = Math.pow(10, precision);
        value *= m;
        // sign of the number
        sgn = (value > 0) | -(value < 0);
        isHalf = value % 1 === 0.5 * sgn;
        f = Math.floor(value);

        if (isHalf) {
            // rounds .5 away from zero
            value = f + (sgn > 0);
        }

        return (isHalf ? value : Math.round(value)) / m;
    }

})();
