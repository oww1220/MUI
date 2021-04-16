declare const Swiper: (target: any, option: any) => void;


declare global {

}
interface Window{
    CommonUI: any;
}

//interface JQuery {
//}

interface HTMLElement {
    iscrolls?: object;
}

interface Iiscrolls {
    cash: any;
    num: number;
    init(target: string, option: any): void;
    resize(): void;
}
