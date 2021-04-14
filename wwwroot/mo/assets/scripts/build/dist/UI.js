"use strict";

var _CommonUI = require("./CommonUI");

_CommonUI.CommonUI.resize.font();

$(function () {
  var aaa = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(1);
    }, 2000);
  }).then(function (result) {
    console.log(result + 1);
    return result;
  });
  var bb = {
    as: 1,
    cs: 3
  };
  var as = bb.as,
      cs = bb.cs;
  var ddd = Object.assign(as, cs);
  console.log(ddd);

  (function () {
    var TOUCH_EVENT = 'ontouchstart' in window ? 'touchstart' : 'click',
        LAYER_DIM = '.layer_dimmed',
        LAYER_PARENT = '.pop_layer';
    $(document).on('click', '#layer_open1', function () {
      _CommonUI.CommonUI.layer.open('.layer-common', LAYER_DIM, LAYER_PARENT, function () {
        console.log('open');
      });
    });

    _CommonUI.CommonUI.layer.openClick('#layer_open2', LAYER_DIM, LAYER_PARENT, function (show) {
      console.log('open');
      show();
    });

    $(document).on('click', '#layer_close1', function () {
      _CommonUI.CommonUI.layer.close('.layer-common', LAYER_DIM, LAYER_PARENT, function () {
        console.log('close');
      });
    });

    _CommonUI.CommonUI.layer.closeClick('#layer_close2', LAYER_DIM, LAYER_PARENT, function (hide) {
      console.log('close');
      hide();
    });

    $(LAYER_DIM).on('click', function (e) {
      _CommonUI.CommonUI.layer.close(LAYER_DIM, LAYER_DIM, LAYER_PARENT, function () {
        console.log('close');
      });
    });
  })();

  (function () {
    _CommonUI.CommonUI.event.taps('.tab-normal', function (swap) {
      console.log('taps');
      swap();
    });

    _CommonUI.CommonUI.event.taps('.tab-normal2', function (swap) {
      console.log('taps');
      swap();
    });
  })();

  (function () {
    var $BODY = $('body'),
        $GOTOP = $('.btnTop');

    _CommonUI.CommonUI.event.goTop($GOTOP);

    _CommonUI.CommonUI.event.topScrollCh($GOTOP, $BODY);

    $(window).on('scroll', function () {
      console.log(1111);

      _CommonUI.CommonUI.event.topScrollCh($GOTOP, $BODY);
    });
  })();

  (function () {
    _CommonUI.CommonUI.event.toggle('.toggle_btn', '.toggle_cont', function (logic, layer) {
      console.log('toggle');
      logic();
    });

    _CommonUI.CommonUI.event.toggle('.toggle_btn2', '.toggle_cont2', function (logic, layer) {
      console.log('toggle');
      logic();
    });

    _CommonUI.CommonUI.event.toggle('.toggle_btn3', '.toggle_cont3', function (logic, layer) {
      console.log('toggle');
      logic();
    });

    _CommonUI.CommonUI.event.toggle('.toggle_btn4', '.toggle_cont4', function (logic, layer) {
      console.log('toggle');
      logic();
    });
  })();

  (function () {
    var $BODY = $('body');

    _CommonUI.CommonUI.resize.chk($BODY);

    _CommonUI.CommonUI.resize.resize($BODY);
  })();

  (function () {
    _CommonUI.CommonUI.event.calander('.datepicker', {
      dateFormat: 'yy-mm-dd',
      showMonthAfterYear: true,
      changeYear: false,
      changeMonth: false,
      showOn: 'both',
      buttonText: '날짜선택',
      yearSuffix: '.',
      monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      monthNamesShort: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토']
    }, function (e) {
      console.log('날짜변경됨');
    });
  })();

  (function () {
    if ($('.target1').length && $.fn.slick) {
      (function () {
        _CommonUI.CommonUI.slide.init($('.target1'), 'slick', {
          infinite: true,
          autoplay: true,
          arrows: true,
          dots: true
        });

        $('.target1').on('mouseleave', function (e) {
          $(this).slick('slickPlay');
        });
      })();
    }
  })();

  (function () {
    _CommonUI.CommonUI.event.customSelect('.select_custum');

    $(window).on('load', function () {
      if ($('.select_custum .select_list').length) {
        _CommonUI.CommonUI.iscrolls.init('.select_custum .select_list', {
          scrollbars: true,
          mouseWheel: true,
          interactiveScrollbars: true,
          shrinkScrollbars: 'scale',
          fadeScrollbars: true,
          hScroll: false
        });
      }
    });
  })();

  (function () {
    _CommonUI.CommonUI.event.changeSelect('.sort_select select');
  })();

  (function () {})();
});
$(window).on('load', function () {});