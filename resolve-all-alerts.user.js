// ==UserScript==
// @name          Resolve All Alerts
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.2
// @description   Resolve all alerts on the Alert Management page
// @match         https://*.blacklinegps.com/alert
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/resolve-all-alerts.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/resolve-all-alerts.user.js
// ==/UserScript==

// Add the button
var button = $('<button class="btn btn-info" style="margin-left: 15px">Resolve All</button>').appendTo('h1');

var numAlerts = 0;
var alertCounter = 0;
$(button).click(function () {
    $(this).attr('disabled', true);
    numAlerts = $('.alertStatus  option[value="unacknowledged"]').length;
    resolveNextAlert();
});

function resolveNextAlert() {
    // Get the next unacknowledged alert
    var select = $('.alertStatus option[value="unacknowledged"]').parent().first();
    if (select.length > 0) {
        alertCounter++;
        console.log("Resolving alert " + alertCounter + " of " + numAlerts);

        // Remove all 'selected' attributes from the options
        $(select).parent().find('option').removeAttr('selected');

        // Select the "resolved" option
        $(select).find('option[value="resolved"]').attr('selected', 'selected');

        // Trigger the change event, which triggers the AJAX request
        $(select).change();

        // Wait for the request to complete
        waitForRequestToComplete(select, resolveNextAlert);
    } else {
        console.log("Finished resolving " + numAlerts + " alerts");
    }
}

function waitForRequestToComplete(select, callback) {
    // Is the ajax spinner icon still visible?
    if ($(select).parent().find('.icon-spinner:visible').length > 0) {
        setTimeout(waitForRequestToComplete, 100, select, callback);
    } else {
        // Remove the select box from the page so we don't attempt to resolve it twoice
        $(select).remove();
        
        // Callback!
        callback();
    }
}
