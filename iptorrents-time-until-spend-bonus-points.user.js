// ==UserScript==
// @name            IPTorrents - Time Until Spend Bonus Points
// @namespace       http://github.com/taeram/user-scripts
// @description     Calculate the number of days until you should redeem your bonus points for 10GB credit
// @match           https://www.iptorrents.com/*
// @match           https://iptorrents.com/*
// @grant           unsafeWindow
// @copyright       Jesse Patching
// @version         1.2.2
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-time-until-spend-bonus-points.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-time-until-spend-bonus-points.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Wait for jQuery to finish loading
    var jQueryInterval = setInterval(function () {
        if (typeof unsafeWindow['$'] !== 'undefined') {
            clearInterval(jQueryInterval);
            main();
        }
    }, 100);

    function main () {
        var secondsPerBonusPoint = (60 * 30); // One bonus point every 30 minutes
        var bonusPointsEl = $('.fa-gift').parents('a');
        var bonusPoints = bonusPointsEl.text().replace(/\s/, '');
        var secondsUntilOneThousandBonusPoints = (1000 - bonusPoints) * secondsPerBonusPoint;

        // Calculate when we can redeem the bonus points
        var date = new Date();
        date.setTime(date.getTime() + secondsUntilOneThousandBonusPoints * 1000);

        bonusPointsEl.after(' (Redeem on ' + date.toDateString()  + ')');
    }
})();
