// ==UserScript==
// @name            SABnzbd Remove All Orphaned Jobs
// @namespace       http://github.com/taeram/user-scripts
// @description     Remove all orphaned jobs from the SABnzbd /status/ page
// @match           *
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.6
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/sabnzbd-remove-all-orphaned-jobs.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/sabnzbd-remove-all-orphaned-jobs.user.js
// ==/UserScript==

(function() {
    'use strict';

    // jQuerify the page
    var jQueryFound = (typeof(jQuery) !== 'undefined');
    if (!jQueryFound) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
        document.getElementsByTagName("body")[0].appendChild(script);
    }

    // Wait for jQuery to finish loading
    var $ = null;
    var jQueryInterval = setInterval(function () {
        if (typeof jQuery !== 'undefined') {
            $ = window.jQuery;
            clearInterval(jQueryInterval);
            addButton();
        }
    }, 100);

    function addButton() {
        var buttonName = 'removeAllOrphanedJobs';
        if ($('#' + buttonName).length > 0) {
            return false;
        }

        if (window.location.hash.match(/\/status\//) && $('#catTable').length > 0) {
            // Add  a button
            $('#catTable').before('<button id="' + buttonName + '">Remove All Orphaned Jobs</button>');
            $('#' + buttonName).on('click', removeAllOrphanedJobs);
        }
    }

    function removeAllOrphanedJobs() {
        var forms = $('form');
        for (var i=0; i < forms.length; i++) {
            if ($(forms[i]).attr('method') == "get" && $(forms[i]).attr('action').match(/delete/)) {
                removeOrphan(forms[i]);
            }
        }
    }

    function removeOrphan(element) {
        var d = doXHR(window.location.pathname + 'status/delete', { queryString: formContents(element) });
        d.addCallback(function (result) {
            removeElement(element.parentNode.parentNode);
        });
        d.addErrback(function (err) {
            console.log('error', err);
        });
    }
}());
