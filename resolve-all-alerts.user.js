// ==UserScript==
// @name          Resolve All Alerts
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.0
// @description   Resolve all alerts on the Alert Management page
// @match         https://*.blacklinegps.com/alert
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/resolve-all-alerts.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/resolve-all-alerts.user.js
// ==/UserScript==

// Add the button
var button = $('<button class="btn btn-info" style="margin-left: 15px">Resolve All (JavaScript)</button>').appendTo('h1');

var numAlerts = 0;
var alertCounter = 0;
$(button).click(function () {
    numAlerts = $('.alertStatus  option[value="unacknowledged"]').length;
    resolveNextAlert();
});

function resolveNextAlert() {
    if (alertCounter > 5) {
        console.log("Stopping");
        return;
    }

    // Get the next unacknowledged alert
    var select = $('.alertStatus option[value="unacknowledged"]').parent().first();
    if (select) {
        alertCounter++;

        console.log("Resolving alert " + alertCounter + " of " + numAlerts);

        // Remove all 'selected' attributes
        $(select).parent().find('option').removeAttr('selected');

        // Acknowledge it
        $(select).find('option[value="resolved"]').attr('selected', 'selected');

        // Tell chosen we've changed the select box
        $(select).change();

        // Wait for the request to complete
        waitForRequestToComplete(select, resolveNextAlert);
    } else {
        console.log("Finished resolving " + numAlerts + " alerts");
    }
}

function waitForRequestToComplete(select, callback) {
    if ($(select).parent().find('.icon-spinner:visible').length > 0) {
        console.log("Waiting for request to complete");
        setTimeout(waitForRequestToComplete, 100, select, callback);
    } else {
        // Remove the select box
        $(select).remove();
        callback();
    }
}
