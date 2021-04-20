import { CommonUI } from '../CommonUI';
import * as Const from '../Lib/Const';

// ---- LayerPop ---- //
$(() => {
    /*오픈 이벤트------*/
    //1
    $(document).on('click', '#layer_open1', function () {
        CommonUI.layer.open('.layer-common', Const.LAYER_DIM, Const.LAYER_PARENT, () => {
            console.log('open');
        });
    });
    //2
    CommonUI.layer.openClick('#layer_open2', Const.LAYER_DIM, Const.LAYER_PARENT, (show) => {
        console.log('open');
        show();
    });

    /*닫기 이벤트------*/
    //1
    $(document).on('click', '#layer_close1', function () {
        CommonUI.layer.close('.layer-common', Const.LAYER_DIM, Const.LAYER_PARENT, () => {
            console.log('close');
        });
    });

    //2
    CommonUI.layer.closeClick('#layer_close2', Const.LAYER_DIM, Const.LAYER_PARENT, (hide) => {
        console.log('close');
        hide();
    });

    /*배경닫기 이벤트------*/
    $(Const.LAYER_DIM).on('click', function (e) {
        CommonUI.layer.close(Const.LAYER_DIM, Const.LAYER_DIM, Const.LAYER_PARENT, () => {
            console.log('close');
        });
    });
});
