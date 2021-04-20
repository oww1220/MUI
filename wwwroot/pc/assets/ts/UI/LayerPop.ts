import { CommonUI } from '../CommonUI';

// ---- LayerPop ---- //
$(() => {
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
});
