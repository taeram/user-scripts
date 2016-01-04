// ==UserScript==
// @name            Steam - Auto Sell Items using Enhanced Steam Google Chrome plugin
// @namespace       http://github.com/taeram/user-scripts
// @description     Auto sell items in your Steam Inventory using the "Quick Sell" feature of the Enhanced Steam google chrome plugin: https://chrome.google.com/webstore/detail/enhanced-steam/okadibdjfemgnhjiembecghcbfknbfhg
// @match           https://steamcommunity.com/id/*/inventory/
// @copyright       Jesse Patching
// @version         1.2.1
// @license         MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL       https://raw.github.com/taeram/user-scripts/master/iptorrents-time-until-spend-bonus-points.user.js
// @downloadURL     https://raw.github.com/taeram/user-scripts/master/iptorrents-time-until-spend-bonus-points.user.js
// ==/UserScript==

/* jshint -W097 */
'use strict';

var reloadPageInterval = 300; // seconds

var jQueryFound = (typeof(jQuery) !== 'undefined');
if (!jQueryFound) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("body")[0].appendChild(script);
}

var reloadInterval = null;
function autoSellAnItem() {
    var items = jQuery('.itemHolder .item.context6');
    for (var i=0; i < items.length; i++) {
        var isGems = jQuery(items[i]).find('.item_currency_amount').length > 0;
        var isSold = jQuery(items[i]).hasClass('btn_disabled');
        if (!isGems && !isSold) {
            jQuery(items[i]).find('.inventory_item_link').click();
            setTimeout(function () {
                var itemName = jQuery('.item_desc_description:visible .hover_item_name').first().text();
                var itemType = jQuery('.item_desc_description:visible .item_desc_game_info > div:last').first().text();
                console.log("Attempting to sell " + itemName + " (" + itemType + ")");
                var marketActions = jQuery('.item_market_actions');
                for (var j=0; j < marketActions.length; j++) {
                    if (jQuery(marketActions[j]).is(':visible')) {
                        var marketActionButtons = jQuery(marketActions[j]).find('.btn_small');
                        for (var k = 0; k < marketActionButtons.length; k++) {
                            if (jQuery(marketActionButtons[k]).attr('id').match(/es_quicksell/)) {
                                var quickSellPrice = jQuery(marketActionButtons[k]).attr('price');
                                console.log("Quick Selling " + itemName + " for $" + quickSellPrice);
                                jQuery(marketActionButtons[k]).find('span').click();
                                return;
                            } else if (jQuery(marketActionButtons[k]).attr('id').match(/es_instantsell/)) {
                                var instantSellPrice = jQuery(marketActionButtons[k]).attr('price');
                                console.log("Instant Selling " + itemName + " for $" + instantSellPrice);
                                jQuery(marketActionButtons[k]).find('span').click();
                                return;
                            }
                        }
                    }
                }
            }, 3000);
            return;
        }
    }
    
    // Reload the page and wait for more items to appear
    if (reloadInterval == null) {
        console.log("Didn't find anything to sell, waiting to reload the page in " + reloadPageInterval + " seconds");
        reloadInterval = setTimeout(function () {
            window.location.reload();
        }, reloadPageInterval * 1000);
    }
}

// Add an "Auto Sell" button
var autoSellButton = jQuery('<button class="btn_green_white_innerfade btn_medium" style="margin-right: 12px"><span>Auto-Sell Inventory</span></button>').prependTo('.inventory_rightnav');
jQuery(autoSellButton).on('click', function () {
    // Turn off auto sell if the button is clicked again
    if (localStorage.getItem('auto_sell_enabled') == "true") {
        localStorage.setItem('auto_sell_enabled', false);
        return;
    }
    
    // Enable auto selling so it persists between page loads
    localStorage.setItem('auto_sell_enabled', true);
    
    autoSellAnItem();
    setInterval(autoSellAnItem, 10000);
});

// Automatically try and sell something if the button is enabled
if (localStorage.getItem('auto_sell_enabled') == "true") {
    // Wait for the page to load
    setTimeout(function () {
        autoSellAnItem();
        setInterval(autoSellAnItem, 10000);
    }, 5000);
}
