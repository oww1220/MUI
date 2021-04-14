import { CommonUI } from './CommonUI';
CommonUI.resize.font();
$(() => {
    const aaa = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    })
        .then((result) => {
        console.log(result + 1);
        return result;
    });
    const bb = {
        as: 1,
        cs: 3,
    };
    const { as, cs } = bb;
    const ddd = Object.assign(as, cs);
    console.log(ddd);
    (() => {
        const TOUCH_EVENT = ('ontouchstart' in window) ? 'touchstart' : 'click', LAYER_DIM = '.layer_dimmed', LAYER_PARENT = '.pop_layer';
        $(document).on('click', '#layer_open1', function () {
            CommonUI.layer.open('.layer-common', LAYER_DIM, LAYER_PARENT, () => {
                console.log('open');
            });
        });
        CommonUI.layer.openClick('#layer_open2', LAYER_DIM, LAYER_PARENT, (show) => {
            console.log('open');
            show();
        });
        $(document).on('click', '#layer_close1', function () {
            CommonUI.layer.close('.layer-common', LAYER_DIM, LAYER_PARENT, () => {
                console.log('close');
            });
        });
        CommonUI.layer.closeClick('#layer_close2', LAYER_DIM, LAYER_PARENT, (hide) => {
            console.log('close');
            hide();
        });
        $(LAYER_DIM).on('click', function (e) {
            CommonUI.layer.close(LAYER_DIM, LAYER_DIM, LAYER_PARENT, () => {
                console.log('close');
            });
        });
    })();
    (() => {
        CommonUI.event.taps('.tab-normal', (swap) => {
            console.log('taps');
            swap();
        });
        CommonUI.event.taps('.tab-normal2', (swap) => {
            console.log('taps');
            swap();
        });
    })();
    (() => {
        const $BODY = $('body'), $GOTOP = $('.btnTop');
        CommonUI.event.goTop($GOTOP);
        CommonUI.event.topScrollCh($GOTOP, $BODY);
        $(window).on('scroll', function () {
            console.log(1111);
            CommonUI.event.topScrollCh($GOTOP, $BODY);
        });
    })();
    (() => {
        CommonUI.event.toggle('.toggle_btn', '.toggle_cont', (logic, layer) => {
            console.log('toggle');
            logic();
        });
        CommonUI.event.toggle('.toggle_btn2', '.toggle_cont2', (logic, layer) => {
            console.log('toggle');
            logic();
        });
        CommonUI.event.toggle('.toggle_btn3', '.toggle_cont3', (logic, layer) => {
            console.log('toggle');
            logic();
        });
        CommonUI.event.toggle('.toggle_btn4', '.toggle_cont4', (logic, layer) => {
            console.log('toggle');
            logic();
        });
    })();
    (() => {
        const $BODY = $('body');
        CommonUI.resize.chk($BODY);
        CommonUI.resize.resize($BODY);
    })();
    (() => {
        CommonUI.event.calander('.datepicker', {
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
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        }, function (e) {
            console.log('날짜변경됨');
        });
    })();
    (() => {
        if ($('.target1').length && $.fn.slick) {
            (function () {
                CommonUI.slide.init($('.target1'), 'slick', {
                    infinite: true,
                    autoplay: true,
                    arrows: true,
                    dots: true,
                });
                $('.target1').on('mouseleave', function (e) {
                    $(this).slick('slickPlay');
                });
            })();
        }
    })();
    (() => {
        CommonUI.event.customSelect('.select_custum');
        $(window).on('load', function () {
            if ($('.select_custum .select_list').length) {
                CommonUI.iscrolls.init('.select_custum .select_list', {
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
    (() => {
        CommonUI.event.changeSelect('.sort_select select');
    })();
    (() => {
    })();
});
$(window).on('load', function () {
});
