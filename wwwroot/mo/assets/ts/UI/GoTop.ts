import CommonUI from '../CommonUI';

// ---- GoTop ---- //
$(() => {
    const $BODY = $('body'),
        $GOTOP = $('.btnTop');

    /*top으로*/
    CommonUI.event.goTop($GOTOP);

    /*pc top으로 scroll*/
    CommonUI.event.topScrollCh($GOTOP, $BODY);
    $(window).on('scroll', function () {
        CommonUI.event.topScrollCh($GOTOP, $BODY);
    });
});
