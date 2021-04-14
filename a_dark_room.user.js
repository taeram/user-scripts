// ==UserScript==
// @name            A Dark Room - Helper
// @namespace       http://github.com/taeram/user-scripts
// @description     Helper for A Dark Room
// @match           http://adarkroom.doublespeakgames.com/
// @grant           none
// @copyright       Jesse Patching
// @version         2.3.0
// @license         MIT
// https://github.com/taeram/user-scripts/blob/master/LICENSE @updateURL
// https://raw.github.com/taeram/user-scripts/master/dist/a-dark-room.user.js
// @downloadURL
// https://raw.github.com/taeram/user-scripts/master/dist/a-dark-room.user.js
// ==/UserScript==
(() => {
    "use strict";
    var e = {
        n: t => {
            var l = t && t.__esModule ? () => t.default : () => t;
            return e.d(l, {a: l}), l
        }, d: (t, l) => {
            for (var i in l) {
                e.o(l, i) && !e.o(t, i) && Object.defineProperty(t, i, {
                    enumerable: !0,
                    get: l[i]
                })
            }
        }, o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    const t = jQuery;
    var l = e.n(t);
    (class {
        static init() {
            this.intervals.stokeFire = setInterval(this.stokeFire, 3e5), this.stokeFire(), this.intervals.gatherWood = setInterval(this.gatherWood, 1e3), this.intervals.checkTraps = setInterval(this.checkTraps, 1e3), this.intervals.buildThings = setInterval(this.buildThings, 3e4), this.buildThings(), this.intervals.balanceWorkers = setInterval(this.balanceWorkers, 1e3), this.balanceWorkers(), this.intervals.handleEvent = setInterval(this.handleEvent, 1e3), this.intervals.handleFighting = setInterval(this.handleFighting, 250)
        }

        static stokeFire() {
            l()("#stokeButton").click()
        }

        static gatherWood() {
            l()("#gatherButton").click()
        }

        static checkTraps() {
            l()("#trapsButton").click()
        }

        static countResources() {
            let e = l()("#stores .storeRow");
            for (var t = 0; t < e.length; t++) {
                let i = e[t];
                this.resources[l()(i).find("> .row_key").text()] = parseInt(l()(i).find("> .row_val").text(), 10)
            }
            let i = l()("#weapons .storeRow");
            for (t = 0; t < i.length; t++) {
                let e = i[t];
                this.weapons[l()(e).find("> .row_key").text()] = parseInt(l()(e).find("> .row_val").text(), 10)
            }
        }

        static hasEnoughResources(e) {
            this.countResources();
            let t = {}, i = l()(e).find(".tooltip .row_key,.row_val");
            for (var s = 0; s < i.length; s += 2) {
                t[l()(i[s]).text()] = parseInt(l()(i[s + 1]).text(), 10);
            }
            for (var n in t) {
                if (this.resources[n] < t[n]) {
                    return !1;
                }
            }
            return !0
        }

        static balanceWorkers() {
            let e = {}, t = {}, i = l()("#workers .workerRow");
            for (var s = 0; s < i.length; s++) {
                let c = l()(i[s]).attr("key"),
                    r = l()(i[s]).find(".row_val > span:first-child").text(),
                    a = {}, o = l()(i[s]).find(".tooltip .storeRow");
                for (var n = 0; n < o.length; n++) {
                    let t = l()(o[n]).find(".row_key").text(),
                        i = l()(o[n]).find(".row_val").text().match(/^(.+?) per (.+)s$/);
                    if (i) {
                        let l = parseInt(i[1], 10), s = parseInt(i[2], 10);
                        a[t] = {
                            value: l,
                            interval: s
                        }, void 0 === e[t] ? e[t] = l : e[t] += l
                    }
                }
                t[c] = {count: r, resources: a}
            }
            for (var c in void 0 === this.elements.production_per_interval && (this.elements.production_per_interval = l()("<div></div>").appendTo("#workers")), l()(this.elements.production_per_interval).empty(), e) {
                l()(this.elements.production_per_interval).append('<div class="row_val">' + e[c] + "</div><div>" + c + "</div>")
            }
        }

        static buildThings() {
            this.countResources();
            let e = l()("#buildBtns .button");
            for (var t = 0; t < e.length; t++) {
                l()(e[t]).hasClass("disabled") || this.hasEnoughResources(e[t]) && l()(e[t]).click();
            }
            let i = l()("#craftBtns .button");
            for (t = 0; t < i.length; t++) {
                if (l()(i[t]).hasClass("disabled")) {
                    continue;
                }
                let e = l()(i[t]).attr("id").replace(/build_/, "");
                "torch" == e && this.resources.torch >= 10 || (this.weapons[e] >= 1 || this.hasEnoughResources(i[t]) && l()(i[t]).click())
            }
            let s = l()("#buyBtns .button");
            for (t = 0; t < s.length; t++) {
                if (l()(s[t]).hasClass("disabled")) {
                    continue;
                }
                let e = l()(s[t]).attr("id").replace(/build_/, ""), i = !1;
                "compass" == e && (i = !0), "bolas" == e && this.weapons.bolas <= 10 && (i = !0), "bullets" == e && this.resources.bullets <= 50 && (i = !0), i && this.hasEnoughResources(s[t]) && l()(s[t]).click()
            }
        }

        static handleEvent() {
            if (l()("#event").length > 0) {
                if (l()("#agree").length > 0 || l()("#buyMap").length > 0) {
                    if (l()("#agree").click(), l()("#learn").click(), l()("#buyMap").length > 0) {
                        for (; !l()("#buyMap").hasClass("disabled");) {
                            l()("#buyMap").click();
                        }
                    }
                    l()("#leave").click(), l()("#deny").click()
                }
                l()("#spare").length > 0 && (l()("#spare").click(), l()("#leave").click()), l()("#mourn").length > 0 && l()("#mourn").click(), l()("#track").length > 0 && (l()("#track").click(), l()("#end").click()), l()("#investigate").length > 0 && (l()("#investigate").click(), l()("#leave").click()), l()("#100furs").length > 0 && (l()("#100furs").click(), l()("#50furs").click(), l()("#leave").click(), l()("#deny").click()), l()("#fur100").length > 0 && (l()("#fur500").click(), l()("#fur100").click(), l()("#leave").click(), l()("#deny").click()), l()("#wood500").length > 0 && (l()("#wood500").click(), l()("#wood100").click(), l()("#leave").click(), l()("#deny").click()), l()("#help").length > 0 && (l()("#help").click(), l()("#bye").click()), l()("#buyMedicine").length > 0 && (l()("#heal").click(), l()("#buyMedicine").click(), l()("#ignore").click()), l()("#buyCompass").length > 0 && (l()("#buyCompass").click(), l()("#goodbye").click()), l()("#evasion").length > 0 && (l()("#evasion").click(), l()("#precision").click(), l()("#force").click(), l()("#nothing").click()), l()("#end").length > 0 && l()("#end").click(), l()("#backinside").length > 0 && l()("#backinside").click(), "An Outpost" === l()(".eventTitle").text() && (l()("#loot_takeEverything").click(), l()("#leave").click())
            }
        }

        static handleFighting() {
            l()("#event").length > 0 && l()(".weaponButton").click();
            let e = l()("#healButtons #eat");
            e.hasClass("disabled") && (e = null);
            let t = this.getHp();
            e && t.current < t.max - World.MEAT_HEAL && (console.log("Eating Meat"), l()("#healButtons #eat").click());
            let i = l()("#healButtons #meds");
            i.hasClass("disabled") && (i = null), t = this.getHp(), i && (t.current < t.max - World.MEDS_HEAL || !e && t.current <= t.max / 2) && (console.log("Using meds"), l()("#healButtons #meds").click())
        }

        static getHp() {
            let e = null, t = null, i = l()("#wanderer .hp").text();
            return i.length > 0 && (i = i.match(/(\d+)\/(\d+)/), i.length > 0 && (e = i[1], t = i[2])), {
                current: e,
                max: t
            }
        }
    }).init()
})();
