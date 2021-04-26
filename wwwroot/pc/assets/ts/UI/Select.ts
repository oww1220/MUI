import CommonUI from '../CommonUI';

// ---- Select ---- //
$(() => {
    //커스텀 셀렉트
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

    //커스텀 셀렉트(기본 인풋사용)
    CommonUI.event.changeSelect('.sort_select select');
});
