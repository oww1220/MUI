import { CommonUI } from '../CommonUI';

// ---- Toggle ---- //
$(() => {
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
});
