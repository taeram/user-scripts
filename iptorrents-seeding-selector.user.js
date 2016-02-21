// ==UserScript==
// @name            IPTorrents - Seeding Selector
// @namespace       http://github.com/taeram/user-scripts
// @description     Calculate which are the best FreeLeech torrents to seed to bump up your ratio
// @match           https://www.iptorrents.com/t*
// @grant           none
// @copyright       Jesse Patching
// @version         1.1.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-seeding-selector.user.js
// ==/UserScript==  

/* jshint -W097 */
'use strict';

var maxTorrentSize = 50 * Math.pow(2,30); // 50 GB
var minNumSeeders = 5;
var minSeedToLeechRatio = 0.40;

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
        var torrentSize = $(torrent).find('td:nth-child(6)').text();
        if (torrentSize.match(/GB/)) {
            torrentSize = parseFloat(torrentSize) * Math.pow(2, 30);
        } else if (torrentSize.match(/MB/)) {
            torrentSize = parseFloat(torrentSize) * Math.pow(2, 20);
        }
        
        if (numSeeders > minNumSeeders && seedToLeechRatio > minSeedToLeechRatio && torrentSize <= maxTorrentSize) {
            $(torrent).attr('style', 'background-color: #1F351F');
        }
    }                                                          
}
