declare const Swiper: (target: any, option: any) => void;
declare const IScroll: (item: any, option: any) => void;

interface JQuery {
    slick(option: any): JQuery;
    datepicker(parm1: any, parm2?: any): any;
}

interface HTMLElement {
    iscrolls?: object;
}

interface Iiscrolls {
    cash: any;
    num: number;
    init(target: string, option: any): void;
    resize(): void;
}
