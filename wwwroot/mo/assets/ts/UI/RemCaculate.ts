import { CommonUI } from '../CommonUI';

// ---- RemCaculate ---- //
//rem 설정 및 호스트 환경체크
CommonUI.resize.font();

$(() => {
    const $BODY = $('body');

    /*호스트환경 체크*/
    CommonUI.resize.chk($BODY);
    CommonUI.resize.resize($BODY);
});
