// ==UserScript==
// @name            IPTorrents - Combine Upload Totals
// @namespace       http://github.com/taeram/user-scripts
// @description     Combine "Uploaded" totals on the Peers page
// @match           https://www.iptorrents.com/peers?*;o=4
// @grant           none
// @copyright       Jesse Patching
// @version         1.1.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-combine-upload-totals.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-combine-upload-totals.user.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

var sortedRows = [];
var rows = $('table.t1 tr');
for (var i=1; i < rows.length; i++) {
    // Grab the Uploaded column
    var uploadedEl = $(rows[i]).find('td:nth-child(4)');
    if (!uploadedEl.length > 0) {
        $(rows[i]).remove();
        continue;
    }
    
    // Extract the "currently uploaded (uploaded from previous IP address)" values
    var uploaded = uploadedEl.text().match(/([\d+\.]+) (\w+)( \(([\d+\.]+) (\w+)\))*$/);
    
    // Add in the currently uploaded values
    var currentUploaded = parseFloat(uploaded[1]);
    if (uploaded[2] == 'GB') {
        currentUploaded *= 1000;
    }

    // Add in the previously uploaded values, if they exist
    var oldUploaded = 0;
    if (uploaded[3]) {
        oldUploaded = parseFloat(uploaded[4]);
        if (uploaded[5] == 'GB') {
            oldUploaded *= 1000;
        }
    }

    // Total the values, and create an indexed array
    var totalUploaded = parseFloat(currentUploaded + oldUploaded);
    while (sortedRows[totalUploaded]) {
        sortedRows[totalUploaded]++;
    }
    sortedRows[Math.round(totalUploaded)] = rows[i];

    var label = 'MB';
    if (totalUploaded > 1000) {
        label = 'GB';
        totalUploaded /= 1000;
        totalUploaded = parseFloat(totalUploaded, 2).toFixed(2);
    }
    $(uploadedEl).html(totalUploaded + ' ' + label);
    
    // If this torrent has been seeded for >= 2 weeks, colour it's background green
    if ($(rows[i]).find('td:nth-child(8)').text().match(/to go/) == null) {
        $(rows[i]).attr('style', 'background-color: #1F351F');
    }
}
sortedRows = ksort(sortedRows);

// Add the rows back to the table sorted by upload totals, descending
for (var i in sortedRows) {
    var html = $(sortedRows[i])[0].outerHTML;
    sortedRows[i].remove();
    $('table.t1 tr:nth-child(1)').after(html);
}

function ksort(inputArr) {    
  var tmp_arr = {},
    keys = [],
    sorter, i, k, that = this,
    strictForIn = false,
    populateArr = {};

    // compare items numerically
    sorter = function(a, b) {
      return ((a + 0) - (b + 0));
    };

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmp_arr[k] = inputArr[k];
    if (strictForIn) {
      delete inputArr[k];
    }
  }
  for (i in tmp_arr) {
    if (tmp_arr.hasOwnProperty(i)) {
      populateArr[i] = tmp_arr[i];
    }
  }

  return populateArr;
}
