import CommonUI from '../CommonUI';

// ---- Tap ---- //
$(() => {
    CommonUI.event.taps('.tab-normal', (swap) => {
        console.log('taps');
        swap();
    });
    CommonUI.event.taps('.tab-normal2', (swap) => {
        console.log('taps');
        swap();
    });
});
