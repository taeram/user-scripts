// ==UserScript==
// @name            SABnzbd Remove All Orphaned Jobs
// @namespace       http://github.com/taeram/user-scripts
// @description     Remove all orphaned jobs from the SABnzbd /status/ page
// @include         *
// @copyright       Jesse Patching
// @version         1.0.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/sabnzbd.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/sabnzbd.user.js
// ==/UserScript==  

if (window.location.hash.match(/\/status\//) && $('#catTable').length > 0) {
    // jQuerify the page
    var jQueryFound = (typeof(jQuery) !== 'undefined');
    if (!jQueryFound) {
        script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
        document.getElementsByTagName("body")[0].appendChild(script);
    }

    // Add  a button
    $('#catTable').prepend('<button id="removeAllOrphanedJobs">Remove All Orphaned Jobs</button>');
    $('#removeAllOrphanedJobs').on('click', removeAllOrphanedJobs);
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
