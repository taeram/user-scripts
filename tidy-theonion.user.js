// ==UserScript==
// @name          The Onion
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.1
// @description   Tidies theonion.com
// @match         http://*.theonion.com/*
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/tidy-theonion.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/tidy-theonion.user.js
// ==/UserScript==

function tidy() {
    // Stop if we haven't found the gregbox after a number of retries
    timerCount++;
    if (timerCount > 50) {
        return clearTimeout(timer);
    }

    // Do we have a gregbox?
    var gregbox = $('#gregbox-outer');
    if ($(gregbox).length > 0) {
        $(gregbox).next().remove()
        $(gregbox).next().remove()
        $(gregbox).next().remove()
        $(gregbox).remove();

        return clearTimeout(timer);
    }

    // Nothing found yet, keep trying
    setTimeout(tidy, 500);
}

// Cevin Key Attack Mode Go!
var timerCount = 0;
tidy();
