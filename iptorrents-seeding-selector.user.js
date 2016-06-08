// ==UserScript==
// @name            IPTorrents - Seeding Selector
// @namespace       http://github.com/taeram/user-scripts
// @description     Calculate which are the best FreeLeech torrents to seed to bump up your ratio
// @match           https://www.iptorrents.com/t*
// @match           https://iptorrents.com/t*
// @grant           none
// @copyright       Jesse Patching
// @version         1.3.0
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

var minNumSeeders = 1;
var minSeedToLeechRatio = 0.40;

var $ = window.$;
var torrents = $('table.torrents tr');
for (var i=0; i < torrents.length; i++) {
    var torrent = torrents[i];
    var url = $(torrent).find('.t_title').attr('href');
    if (url) {
        var id = url.replace(/^.*d=/, '');
        var title = $(torrent).find('.t_title').text();
        var numSeeders = parseInt($(torrent).find('.t_seeders').text());
        var numLeechers = parseInt($(torrent).find('.t_leechers').text());
        var seedToLeechRatio = numLeechers / numSeeders;

        if (numSeeders >= minNumSeeders && seedToLeechRatio >= minSeedToLeechRatio) {
            $(torrent).attr('style', 'background-color: #1F351F');
        }
    }
}
