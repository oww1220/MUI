import CommonUI from '../CommonUI';

// ---- Slide ---- //
$(() => {
    if ($('.target1').length && $.fn.slick) {
        CommonUI.slide.init('.target1', 'slick', {
            infinite: true,
            autoplay: true,
            arrows: true,
            dots: true,
        });
        $('.target1').on('mouseleave', function (e) {
            $(this).slick('slickPlay');
        });
    }

    //CommonUI.slide.init('.target1', 'swiper');
});
