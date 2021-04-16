import { CommonUI } from './CommonUI';
import Swiper from 'swiper';
/*dom tree 생성이전 시점*/
//rem 설정 및 호스트 환경체크
CommonUI.resize.font();

/*dom tree 생성이후 시점*/
$(() => {
    //ie test es6 method!
    const aaa = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    }).then((result) => {
        console.log(result + 1); // 1
        return result;
    });

    const bb = {
        as: 1,
        cs: 3,
    };

    const { as, cs } = bb;

    const ddd = Object.assign({ as }, { cs });
    console.log(ddd);
    console.log(ddd);

    //비동기 함수들 --> 동기적으로 실행 예시!!
    const promiseCallback: PromiseCallback = (resolve, reject) => {
        $('.col:first-child h2').animate({ 'margin-left': 100 }, 5000, () => {
            resolve(true);
        });
    };
    const promiseCallback2: PromiseCallback = (resolve, reject) => {
        $('.col:first-child h2').animate({ 'margin-left': 0 }, 5000, () => {
            resolve(true);
        });
    };
    CommonUI.async.generaterRun(function* () {
        console.log('!!!!!!!!!!!!start');

        const delay1 = yield CommonUI.async.wait(2000, 'delay2초');
        console.log(delay1);

        const runVal11 = yield CommonUI.async.promise(promiseCallback);
        console.log(runVal11);

        const runVal2 = yield 'test2';
        console.log(runVal2);

        const delay2 = yield CommonUI.async.wait(3000, 'delay3초');
        console.log(delay2);

        const runVal22 = yield CommonUI.async.promise(promiseCallback2);
        console.log(runVal22);

        console.log('end!!!!!!!!!!!!');
    });

    //(Array.prototype as any).mapToNumbers = function () {
    ///* ... */
    //};

    //레이어 팝업
    (() => {
        const TOUCH_EVENT = 'ontouchstart' in window ? 'touchstart' : 'click',
            LAYER_DIM = '.layer_dimmed',
            LAYER_PARENT = '.pop_layer';

        /*오픈 이벤트------*/
        //1
        $(document).on('click', '#layer_open1', function () {
            CommonUI.layer.open('.layer-common', LAYER_DIM, LAYER_PARENT, () => {
                console.log('open');
            });
        });
        //2
        CommonUI.layer.openClick('#layer_open2', LAYER_DIM, LAYER_PARENT, (show) => {
            console.log('open');
            show();
        });

        /*닫기 이벤트------*/
        //1
        $(document).on('click', '#layer_close1', function () {
            CommonUI.layer.close('.layer-common', LAYER_DIM, LAYER_PARENT, () => {
                console.log('close');
            });
        });

        //2
        CommonUI.layer.closeClick('#layer_close2', LAYER_DIM, LAYER_PARENT, (hide) => {
            console.log('close');
            hide();
        });

        /*배경닫기 이벤트------*/
        $(LAYER_DIM).on('click', function (e) {
            CommonUI.layer.close(LAYER_DIM, LAYER_DIM, LAYER_PARENT, () => {
                console.log('close');
            });
        });
    })();

    //탭 변경
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

    //탑으로 버튼
    (() => {
        const $BODY = $('body'),
            $GOTOP = $('.btnTop');

        /*top으로*/
        CommonUI.event.goTop($GOTOP);

        /*pc top으로 scroll*/
        CommonUI.event.topScrollCh($GOTOP, $BODY);
        $(window).on('scroll', function () {
            CommonUI.event.topScrollCh($GOTOP, $BODY);
        });
    })();

    //토글
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

    //rem 설정 및 호스트 환경체크
    (() => {
        const $BODY = $('body');
        /*호스트환경 체크*/
        CommonUI.resize.chk($BODY);
        CommonUI.resize.resize($BODY);
    })();

    //datepicker
    (() => {
        CommonUI.event.calander(
            '.datepicker',
            {
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
            },
            function (e) {
                console.log('날짜변경됨');
            },
        );

        /*
        CommonUI.event.calander('.datepicker', {
            changeMonth:true,
            changeYear:true,
            showOn:'button',
            buttonText: '선택',
            buttonImageOnly:false,
            showMonthAfterYear:true,
            minDate:null,  //최소 기간
            maxDate:null,  //최대 노출
            yearRange:'c-5:c+5',  //노출되는 범위
            dateFormat :'yy-mm-dd',
            dayNamesMin:['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
        },
        function(e){
            console.log('날짜변경됨');
        });*/
    })();

    //슬라이더
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

    //커스텀 셀렉트
    (() => {
        CommonUI.event.customSelect('.select_custum');
        $(window).on('load', function () {
            /*아이스크롤*/
            if ($('.select_custum .select_list').length) {
                CommonUI.iscrolls.init('.select_custum .select_list', {
                    scrollbars: true,
                    mouseWheel: true,
                    interactiveScrollbars: true,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true,
                    hScroll: false,
                });
            }
        });
    })();

    //커스텀 셀렉트(기본 인풋사용)
    (() => {
        CommonUI.event.changeSelect('.sort_select select');
    })();

    //
    (() => {})();
});

/*브라우저 모든 resources 다운 완료시점*/
$(window).on('load', function () {});
