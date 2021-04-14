export var CommonUI;
(function (CommonUI) {
    CommonUI.$ = jQuery;
    CommonUI.resize = {
        chk(target) {
            if ((target.width() || 0) >= 1025) {
                target.removeClass('pc mobile tablet').addClass('pc');
            }
            else if ((target.width() || 0) >= 768) {
                target.removeClass('pc mobile tablet').addClass('tablet');
            }
            else {
                target.removeClass('pc mobile tablet').addClass('mobile');
            }
        },
        font() {
            const doc = document.documentElement;
            const caculateWidth = (doc.clientWidth / 320 * 62.5) * 100;
            let fontSizeVal = (parseFloat(caculateWidth) / 100);
            fontSizeVal = (fontSizeVal >= 85) ? 85 : fontSizeVal;
            doc.style.fontSize = fontSizeVal + '%';
        },
        resize($BODY) {
            CommonUI.$(window).on('resize', function () {
                CommonUI.resize.chk($BODY);
                CommonUI.resize.font();
            });
        },
    };
    CommonUI.Map = {
        init() {
            class JqMap {
                constructor() {
                    this.map = new Object();
                }
                put(key, value) {
                    this.map[key] = value;
                }
                get(key) {
                    return this.map[key];
                }
                containsKey(key) {
                    return key in this.map;
                }
                clear() {
                    for (const prop in this.map) {
                        delete this.map[prop];
                    }
                }
                remove(key) {
                    delete this.map[key];
                }
                keys() {
                    const arKey = new Array();
                    for (const prop in this.map) {
                        arKey.push(prop);
                    }
                    return arKey;
                }
                values() {
                    const arVal = new Array();
                    for (const prop in this.map) {
                        arVal.push(this.map[prop]);
                    }
                    return arVal;
                }
                size() {
                    let count = 0;
                    for (const prop in this.map) {
                        count++;
                    }
                    return count;
                }
            }
            return new JqMap();
        }
    };
    CommonUI.slide = {
        init(target, sort, option) {
            if (sort == 'slick') {
                return target.slick(option);
            }
            if (sort === 'swiper') {
                return new Swiper(target, option);
            }
        },
    };
    CommonUI.layer = {
        scrollTop: 0,
        calculate(layer) {
            const $layer = CommonUI.$(layer), layerIn = $layer.find('.pop_inner'), winH = CommonUI.$(window).height() || 0, winW = CommonUI.$(window).width() || 0;
            layerIn.find('.pop_scroll').removeAttr('style');
            const layerH = $layer.height() || 0, layerW = $layer.width() || 0, marginH = parseInt(layerIn.css('marginTop')) + parseInt(layerIn.css('marginBottom'));
            if (winH < layerH) {
                layerIn.find('.pop_scroll').css({
                    height: winH - marginH,
                    overflow: 'auto',
                });
                $layer.css({
                    top: 0,
                    left: (winW - layerW) / 2,
                });
            }
            else {
                layerIn.find('.pop_scroll').removeAttr('style');
                $layer.css({
                    top: (winH - layerH) / 2,
                    left: (winW - layerW) / 2,
                });
            }
        },
        openClick(target, dimmed, parent, callback) {
            const that = this;
            CommonUI.$(document).on('click', target, function (e) {
                const layer = '.' + CommonUI.$(this).data('layer');
                const targetDom = CommonUI.$(this);
                const show = () => {
                    that.open(layer, dimmed, parent);
                };
                if (callback) {
                    callback(show, layer, targetDom);
                }
                else {
                    show();
                }
                e.preventDefault();
            });
        },
        open(layer, dimmed, parent, callback) {
            const that = this;
            that.scrollTop = CommonUI.$(window).scrollTop() || 0;
            CommonUI.$('body').addClass('fixed');
            CommonUI.$('body').css({ top: -that.scrollTop });
            if (dimmed)
                CommonUI.$(dimmed).fadeIn();
            if (callback)
                callback(layer);
            CommonUI.$(parent + layer).show();
            that.calculate(layer);
            CommonUI.$(window).on('resize.layer', function () {
                that.calculate(layer);
            });
        },
        closeClick(target, dimmed, parent, callback) {
            const that = this;
            CommonUI.$(document).on('click', target, function (e) {
                let layer;
                const targetDom = CommonUI.$(this);
                const hide = () => {
                    that.close(layer, dimmed, parent);
                };
                if (target == dimmed) {
                    layer = parent;
                }
                else {
                    layer = parent + '.' + CommonUI.$(this).data('layer');
                }
                if (callback) {
                    callback(hide, layer, targetDom);
                }
                else {
                    hide();
                }
                e.preventDefault();
            });
        },
        close(layer, dimmed, parent, callback) {
            const that = this;
            if (layer != dimmed) {
                CommonUI.$(layer).hide();
            }
            else {
                CommonUI.$(parent).hide();
            }
            if (dimmed)
                CommonUI.$(dimmed).fadeOut();
            if (callback)
                callback(layer);
            CommonUI.$('body').removeClass('fixed');
            CommonUI.$('body').css({ top: 0 });
            CommonUI.$(window).scrollTop(that.scrollTop);
            CommonUI.$(window).off('resize.layer');
        },
    };
    CommonUI.event = {
        toggle(target, parent, callback) {
            CommonUI.$(document).on('click', target, function (e) {
                const $this = CommonUI.$(this);
                const $targetDiv = CommonUI.$(target);
                const layer = CommonUI.$('.' + $this.data('target'));
                const sort = $this.data('sort');
                const onClass = $this.data('on');
                const siblings = $this.data('siblings');
                const $parent = CommonUI.$(parent);
                const logic = () => {
                    if (onClass) {
                        if (parent === null ? $this.hasClass('on') : layer.is(':visible')) {
                            $this.removeClass('on');
                            layer.removeClass('on');
                        }
                        else {
                            if (siblings) {
                                $targetDiv.removeClass('on');
                                $parent.removeClass('on');
                            }
                            $this.addClass('on');
                            layer.addClass('on');
                        }
                    }
                    if (layer.is(':visible')) {
                        if (sort == 'fade') {
                            layer.fadeOut();
                        }
                        else if (sort == 'normal') {
                            layer.hide();
                        }
                        else if (sort == 'none') {
                            return false;
                        }
                        else {
                            layer.slideUp();
                        }
                    }
                    else {
                        if (sort == 'fade') {
                            if (siblings) {
                                $parent.fadeOut();
                            }
                            layer.fadeIn();
                        }
                        else if (sort == 'normal') {
                            if (siblings) {
                                $parent.hide();
                            }
                            layer.show();
                        }
                        else if (sort == 'none') {
                            return false;
                        }
                        else {
                            if (siblings) {
                                $parent.slideUp();
                            }
                            layer.slideDown();
                        }
                    }
                };
                if (callback) {
                    callback(logic, layer);
                }
                else {
                    logic();
                }
            });
        },
        goTop(target) {
            target.on('click', function (e) {
                CommonUI.$('html, body').stop().animate({ 'scrollTop': 0 }, 1000);
                e.preventDefault();
            });
        },
        topScrollCh(target, parent) {
            if (parent.hasClass('pc')) {
                const winScroll = CommonUI.$(window).scrollTop() || 0;
                if (winScroll == 0) {
                    target.fadeOut();
                    CommonUI.$('#header .inner').removeClass('on');
                }
                else {
                    target.fadeIn();
                    CommonUI.$('#header .inner').addClass('on');
                }
            }
            else {
                return;
            }
        },
        taps(tab_nav, callback) {
            const target = tab_nav + '.tab_nav li';
            CommonUI.$(document).on('click', target, function (e) {
                const $this = CommonUI.$(this);
                const $layer = CommonUI.$(tab_nav + '.tab_cont');
                const idx = $this.index();
                const swap = () => {
                    $this.addClass('on').siblings().removeClass('on');
                    $layer.find('> div').eq(idx).show().siblings().hide();
                };
                if (callback) {
                    callback(swap);
                }
                else {
                    swap();
                }
                e.preventDefault();
            });
        },
        calander(target, option, callback) {
            CommonUI.$(target).each(function () {
                CommonUI.$(this).datepicker(option);
                CommonUI.$(this).datepicker('setDate', 'today');
                if (callback)
                    CommonUI.$(this).on('change', callback);
            });
        },
        customSelect(parent) {
            const target = parent + " button";
            const listTarget = parent + " a";
            let $parent;
            CommonUI.$(document).on("click", target, function (e) {
                $parent = CommonUI.$(this).parent();
                if ($parent.hasClass("on")) {
                    $parent.removeClass("on");
                }
                else {
                    CommonUI.$(parent).removeClass("on");
                    $parent.addClass("on");
                    CommonUI.iscrolls.resize();
                }
            });
            CommonUI.$(document).on("click", listTarget, function (e) {
                const bt = $parent.find("button");
                const input = $parent.find("input");
                const val = CommonUI.$(this).data("val");
                const text = CommonUI.$(this).text();
                input.val(val);
                bt.text(text);
                $parent.addClass("select");
                $parent.removeClass("on");
                e.preventDefault();
            });
        },
        changeSelect(target) {
            CommonUI.$(document).on("change", target, function (e) {
                const val = CommonUI.$(this).val();
                const target = CommonUI.$(this).parent().find(".selText");
                if (val == "DISP_ROOT") {
                    target.html(target.attr("data-name") || '');
                }
                else {
                    target.html(CommonUI.$(this).find(".bestSubCate" + val).attr("data-name") || '');
                }
            });
        },
        fixedTop: function () {
            var _a;
            let enScrollTop = 0, beScrollTop = 0;
            const $header = CommonUI.$('#header'), $topBanner = CommonUI.$('.top_bn_w'), fixdTop = ((_a = $header.offset()) === null || _a === void 0 ? void 0 : _a.top) || 0, paddingTop = $header.height() || 0, scrollThreshold = 90;
            if ($topBanner.length && $topBanner.is(':visible')) {
                $header.removeClass('fixed');
                $header.css({ 'height': 'auto' });
            }
            else {
                $header.addClass('fixed');
                $header.css({ 'height': paddingTop });
            }
            CommonUI.$(window).on('scroll', function (e) {
                const scrollpos = window.scrollY || window.pageYOffset;
                enScrollTop = scrollpos;
                if ($topBanner.length && $topBanner.is(':visible')) {
                    if (fixdTop <= scrollpos) {
                        $header.addClass('fixed');
                    }
                    else {
                        $header.removeClass('fixed');
                    }
                }
                if (Math.abs(enScrollTop - beScrollTop) < scrollThreshold)
                    return false;
                if (!CommonUI.$('body').hasClass('pc')) {
                    beScrollTop > enScrollTop ? $header.removeClass('on') : $header.addClass('on');
                }
                else {
                    $header.removeClass('on');
                }
                beScrollTop = enScrollTop;
            });
        },
    };
    CommonUI.iscrolls = {
        cash: null,
        num: 0,
        init(target, option) {
            this.cash = this.cash ? this.cash : CommonUI.Map.init();
            CommonUI.$(target).each((idx, item) => {
                const targetIdx = CommonUI.$(target)[idx];
                targetIdx.iscrolls = new IScroll(item, option);
                this.cash.put(this.num++, { sort: item, option: option });
            });
        },
        resize: function () {
            if (!this.cash)
                return;
            CommonUI.$.each(this.cash.map, (key, value) => {
                if (value.sort.className == "select_list") {
                    value.sort.iscrolls.scrollTo(0, 0);
                }
            });
        },
    };
})(CommonUI || (CommonUI = {}));
