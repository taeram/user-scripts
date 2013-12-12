// ==UserScript==
// @name          The Onion
// @namespace     https://github.com/taeram/user-scripts
// @version       1.0.0
// @description   Tidies theonion.com
// @match         http://*.theonion.com/*
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/tidy-theonion.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/tidy-theonion.user.js
// ==/UserScript==

if ($('#gregbox-outer').length > 0) {
	var gregbox = $('#gregbox-outer');
    $(gregbox).next().remove()
    $(gregbox).next().remove()
    $(gregbox).next().remove()
    $(gregbox).remove();
}
