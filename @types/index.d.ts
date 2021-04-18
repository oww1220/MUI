/*declare*/
declare const Swiper: (target: SwiperParm, option: any) => void;

/*interface*/
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

/*type*/
type PromiseCallback = (resolve: (value: any) => void, reject: (reason?: any) => void) => void;
type SwiperParm = string | HTMLElement;
