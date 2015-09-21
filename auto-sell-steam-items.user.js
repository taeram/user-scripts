// ==UserScript==
// @name         Auto Sell Items using Enhanced Steam Google Chrome plugin
// @namespace    http://github.com/taeram/user-scripts/
// @version      1.0.0
// @description  Auto sell items in your Steam Inventory using the "Quick Sell" feature of the Enhanced Steam google chrome plugin: https://chrome.google.com/webstore/detail/enhanced-steam/okadibdjfemgnhjiembecghcbfknbfhg
// @author       You
// @match        https://steamcommunity.com/id/*/inventory/
// @grant        none
// @license       MIT https://github.com/taeram/user-scripts/blob/master/LICENSE
// @updateURL     https://raw.github.com/taeram/user-scripts/master/auto-sell-steam-items.user.js
// @downloadURL   https://raw.github.com/taeram/user-scripts/master/auto-sell-steam-items.user.js
// ==/UserScript==

var jQueryFound = (typeof(jQuery) !== 'undefined');

if (!jQueryFound) {
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName("body")[0].appendChild(script);
}

function autoSellAnItem() {
    var items = jQuery('.itemHolder .item.context6');
    for (var i=0; i < items.length; i++) {
        var isGems = jQuery(items[i]).find('.item_currency_amount').length > 0;
        var isSold = jQuery(items[i]).hasClass('btn_disabled');
        if (!isGems && !isSold) {
            jQuery(items[i]).find('.inventory_item_link').click();
            setTimeout(function () {
                var itemName = jQuery('.item_desc_description .hover_item_name').text();
                console.log("Attempting to sell " + itemName);
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
            }, 2000);
            return;
        }
    }    
}

// Add an "Auto Sell" button
var autoSellInterval = null;
var autoSellButton = jQuery('<button class="btn_green_white_innerfade btn_medium" style="margin-right: 12px"><span>Auto-Sell Inventory</span></button>').prependTo('.inventory_rightnav');
jQuery(autoSellButton).on('click', function () {
    autoSellAnItem();
    autoSellInterval = setInterval(autoSellAnItem, 10000);
});
