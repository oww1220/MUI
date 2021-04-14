"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonUI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CommonUI;
exports.CommonUI = CommonUI;

(function (CommonUI) {
  CommonUI.$ = jQuery;
  CommonUI.resize = {
    chk: function chk(target) {
      if ((target.width() || 0) >= 1025) {
        target.removeClass('pc mobile tablet').addClass('pc');
      } else if ((target.width() || 0) >= 768) {
        target.removeClass('pc mobile tablet').addClass('tablet');
      } else {
        target.removeClass('pc mobile tablet').addClass('mobile');
      }
    },
    font: function font() {
      var doc = document.documentElement;
      var caculateWidth = doc.clientWidth / 320 * 62.5 * 100;
      var fontSizeVal = parseFloat(caculateWidth) / 100;
      fontSizeVal = fontSizeVal >= 85 ? 85 : fontSizeVal;
      doc.style.fontSize = fontSizeVal + '%';
    },
    resize: function resize($BODY) {
      CommonUI.$(window).on('resize', function () {
        CommonUI.resize.chk($BODY);
        CommonUI.resize.font();
      });
    }
  };
  CommonUI.Map = {
    init: function init() {
      var JqMap = /*#__PURE__*/function () {
        function JqMap() {
          _classCallCheck(this, JqMap);

          this.map = new Object();
        }

        _createClass(JqMap, [{
          key: "put",
          value: function put(key, value) {
            this.map[key] = value;
          }
        }, {
          key: "get",
          value: function get(key) {
            return this.map[key];
          }
        }, {
          key: "containsKey",
          value: function containsKey(key) {
            return key in this.map;
          }
        }, {
          key: "clear",
          value: function clear() {
            for (var prop in this.map) {
              delete this.map[prop];
            }
          }
        }, {
          key: "remove",
          value: function remove(key) {
            delete this.map[key];
          }
        }, {
          key: "keys",
          value: function keys() {
            var arKey = new Array();

            for (var prop in this.map) {
              arKey.push(prop);
            }

            return arKey;
          }
        }, {
          key: "values",
          value: function values() {
            var arVal = new Array();

            for (var prop in this.map) {
              arVal.push(this.map[prop]);
            }

            return arVal;
          }
        }, {
          key: "size",
          value: function size() {
            var count = 0;

            for (var prop in this.map) {
              count++;
            }

            return count;
          }
        }]);

        return JqMap;
      }();

      return new JqMap();
    }
  };
  CommonUI.slide = {
    init: function init(target, sort, option) {
      if (sort == 'slick') {
        return target.slick(option);
      }

      if (sort === 'swiper') {
        return new Swiper(target, option);
      }
    }
  };
  CommonUI.layer = {
    scrollTop: 0,
    calculate: function calculate(layer) {
      var $layer = CommonUI.$(layer),
          layerIn = $layer.find('.pop_inner'),
          winH = CommonUI.$(window).height() || 0,
          winW = CommonUI.$(window).width() || 0;
      layerIn.find('.pop_scroll').removeAttr('style');
      var layerH = $layer.height() || 0,
          layerW = $layer.width() || 0,
          marginH = parseInt(layerIn.css('marginTop')) + parseInt(layerIn.css('marginBottom'));

      if (winH < layerH) {
        layerIn.find('.pop_scroll').css({
          height: winH - marginH,
          overflow: 'auto'
        });
        $layer.css({
          top: 0,
          left: (winW - layerW) / 2
        });
      } else {
        layerIn.find('.pop_scroll').removeAttr('style');
        $layer.css({
          top: (winH - layerH) / 2,
          left: (winW - layerW) / 2
        });
      }
    },
    openClick: function openClick(target, dimmed, parent, callback) {
      var that = this;
      CommonUI.$(document).on('click', target, function (e) {
        var layer = '.' + CommonUI.$(this).data('layer');
        var targetDom = CommonUI.$(this);

        var show = function show() {
          that.open(layer, dimmed, parent);
        };

        if (callback) {
          callback(show, layer, targetDom);
        } else {
          show();
        }

        e.preventDefault();
      });
    },
    open: function open(layer, dimmed, parent, callback) {
      var that = this;
      that.scrollTop = CommonUI.$(window).scrollTop() || 0;
      CommonUI.$('body').addClass('fixed');
      CommonUI.$('body').css({
        top: -that.scrollTop
      });
      if (dimmed) CommonUI.$(dimmed).fadeIn();
      if (callback) callback(layer);
      CommonUI.$(parent + layer).show();
      that.calculate(layer);
      CommonUI.$(window).on('resize.layer', function () {
        that.calculate(layer);
      });
    },
    closeClick: function closeClick(target, dimmed, parent, callback) {
      var that = this;
      CommonUI.$(document).on('click', target, function (e) {
        var layer;
        var targetDom = CommonUI.$(this);

        var hide = function hide() {
          that.close(layer, dimmed, parent);
        };

        if (target == dimmed) {
          layer = parent;
        } else {
          layer = parent + '.' + CommonUI.$(this).data('layer');
        }

        if (callback) {
          callback(hide, layer, targetDom);
        } else {
          hide();
        }

        e.preventDefault();
      });
    },
    close: function close(layer, dimmed, parent, callback) {
      var that = this;

      if (layer != dimmed) {
        CommonUI.$(layer).hide();
      } else {
        CommonUI.$(parent).hide();
      }

      if (dimmed) CommonUI.$(dimmed).fadeOut();
      if (callback) callback(layer);
      CommonUI.$('body').removeClass('fixed');
      CommonUI.$('body').css({
        top: 0
      });
      CommonUI.$(window).scrollTop(that.scrollTop);
      CommonUI.$(window).off('resize.layer');
    }
  };
  CommonUI.event = {
    toggle: function toggle(target, parent, callback) {
      CommonUI.$(document).on('click', target, function (e) {
        var $this = CommonUI.$(this);
        var $targetDiv = CommonUI.$(target);
        var layer = CommonUI.$('.' + $this.data('target'));
        var sort = $this.data('sort');
        var onClass = $this.data('on');
        var siblings = $this.data('siblings');
        var $parent = CommonUI.$(parent);

        var logic = function logic() {
          if (onClass) {
            if (parent === null ? $this.hasClass('on') : layer.is(':visible')) {
              $this.removeClass('on');
              layer.removeClass('on');
            } else {
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
            } else if (sort == 'normal') {
              layer.hide();
            } else if (sort == 'none') {
              return false;
            } else {
              layer.slideUp();
            }
          } else {
            if (sort == 'fade') {
              if (siblings) {
                $parent.fadeOut();
              }

              layer.fadeIn();
            } else if (sort == 'normal') {
              if (siblings) {
                $parent.hide();
              }

              layer.show();
            } else if (sort == 'none') {
              return false;
            } else {
              if (siblings) {
                $parent.slideUp();
              }

              layer.slideDown();
            }
          }
        };

        if (callback) {
          callback(logic, layer);
        } else {
          logic();
        }
      });
    },
    goTop: function goTop(target) {
      target.on('click', function (e) {
        CommonUI.$('html, body').stop().animate({
          'scrollTop': 0
        }, 1000);
        e.preventDefault();
      });
    },
    topScrollCh: function topScrollCh(target, parent) {
      if (parent.hasClass('pc')) {
        var winScroll = CommonUI.$(window).scrollTop() || 0;

        if (winScroll == 0) {
          target.fadeOut();
          CommonUI.$('#header .inner').removeClass('on');
        } else {
          target.fadeIn();
          CommonUI.$('#header .inner').addClass('on');
        }
      } else {
        return;
      }
    },
    taps: function taps(tab_nav, callback) {
      var target = tab_nav + '.tab_nav li';
      CommonUI.$(document).on('click', target, function (e) {
        var $this = CommonUI.$(this);
        var $layer = CommonUI.$(tab_nav + '.tab_cont');
        var idx = $this.index();

        var swap = function swap() {
          $this.addClass('on').siblings().removeClass('on');
          $layer.find('> div').eq(idx).show().siblings().hide();
        };

        if (callback) {
          callback(swap);
        } else {
          swap();
        }

        e.preventDefault();
      });
    },
    calander: function calander(target, option, callback) {
      CommonUI.$(target).each(function () {
        CommonUI.$(this).datepicker(option);
        CommonUI.$(this).datepicker('setDate', 'today');
        if (callback) CommonUI.$(this).on('change', callback);
      });
    },
    customSelect: function customSelect(parent) {
      var target = parent + " button";
      var listTarget = parent + " a";
      var $parent;
      CommonUI.$(document).on("click", target, function (e) {
        $parent = CommonUI.$(this).parent();

        if ($parent.hasClass("on")) {
          $parent.removeClass("on");
        } else {
          CommonUI.$(parent).removeClass("on");
          $parent.addClass("on");
          CommonUI.iscrolls.resize();
        }
      });
      CommonUI.$(document).on("click", listTarget, function (e) {
        var bt = $parent.find("button");
        var input = $parent.find("input");
        var val = CommonUI.$(this).data("val");
        var text = CommonUI.$(this).text();
        input.val(val);
        bt.text(text);
        $parent.addClass("select");
        $parent.removeClass("on");
        e.preventDefault();
      });
    },
    changeSelect: function changeSelect(target) {
      CommonUI.$(document).on("change", target, function (e) {
        var val = CommonUI.$(this).val();
        var target = CommonUI.$(this).parent().find(".selText");

        if (val == "DISP_ROOT") {
          target.html(target.attr("data-name") || '');
        } else {
          target.html(CommonUI.$(this).find(".bestSubCate" + val).attr("data-name") || '');
        }
      });
    },
    fixedTop: function fixedTop() {
      var _a;

      var enScrollTop = 0,
          beScrollTop = 0;
      var $header = CommonUI.$('#header'),
          $topBanner = CommonUI.$('.top_bn_w'),
          fixdTop = ((_a = $header.offset()) === null || _a === void 0 ? void 0 : _a.top) || 0,
          paddingTop = $header.height() || 0,
          scrollThreshold = 90;

      if ($topBanner.length && $topBanner.is(':visible')) {
        $header.removeClass('fixed');
        $header.css({
          'height': 'auto'
        });
      } else {
        $header.addClass('fixed');
        $header.css({
          'height': paddingTop
        });
      }

      CommonUI.$(window).on('scroll', function (e) {
        var scrollpos = window.scrollY || window.pageYOffset;
        enScrollTop = scrollpos;

        if ($topBanner.length && $topBanner.is(':visible')) {
          if (fixdTop <= scrollpos) {
            $header.addClass('fixed');
          } else {
            $header.removeClass('fixed');
          }
        }

        if (Math.abs(enScrollTop - beScrollTop) < scrollThreshold) return false;

        if (!CommonUI.$('body').hasClass('pc')) {
          beScrollTop > enScrollTop ? $header.removeClass('on') : $header.addClass('on');
        } else {
          $header.removeClass('on');
        }

        beScrollTop = enScrollTop;
      });
    }
  };
  CommonUI.iscrolls = {
    cash: null,
    num: 0,
    init: function init(target, option) {
      var _this = this;

      this.cash = this.cash ? this.cash : CommonUI.Map.init();
      CommonUI.$(target).each(function (idx, item) {
        var targetIdx = CommonUI.$(target)[idx];
        targetIdx.iscrolls = new IScroll(item, option);

        _this.cash.put(_this.num++, {
          sort: item,
          option: option
        });
      });
    },
    resize: function resize() {
      if (!this.cash) return;
      CommonUI.$.each(this.cash.map, function (key, value) {
        if (value.sort.className == "select_list") {
          value.sort.iscrolls.scrollTo(0, 0);
        }
      });
    }
  };
})(CommonUI || (exports.CommonUI = CommonUI = {}));