// ==UserScript==
// @name            Environment Canada - Reload every hour
// @namespace       http://github.com/taeram/user-scripts
// @description     Reloads the Environment Canada website once an hour
// @match           https://weather.gc.ca/city/pages/*
// @grant           none
// @copyright       Jesse Patching
// @version         1.0.3
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/environment-canada-reload-every-hour.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/environment-canada-reload-every-hour.user.js
// ==/UserScript==
(()=>{"use strict";var i=3600,o=0,e=$('<div style="position: absolute; right: 5px; top: 5px; color: black; font-size: 9px" id="reloadTimer">Reloading in <span class="time">3600</span> seconds</div>').appendTo("body");setInterval((function(){o++;var t=i-o;$(e).find(".time").text(t),o>=i&&window.location.reload()}),1e3)})();