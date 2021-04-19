/*declare*/
declare const Swiper: (target: SwiperParm, option: any) => void;

/*interface*/
interface Window{
    CommonUI: any;
}

//interface JQuery {
//}

interface HTMLElement {
    iscrolls?: IScroll;
}

interface Iiscrolls {
    cash: IJqMap | null;
    num: number;
    init(target: string, option: any): void;
    resize(): void;
}

interface IJqMap {
    map: object | null;
    put<T>(key: any, value: T): void;
    get<T>(key: any): T;
    containsKey(key: any): boolean;
    clear(): void;
    remove(key: any): void;
    keys(): any[];
    values(): any[];
    size(): number;
}

/*type*/
type PromiseCallback = (resolve: (value: any) => void, reject: (reason?: any) => void) => void;
type SwiperParam = string | HTMLElement;
type slideSortParam = 'slick' | 'swiper';
