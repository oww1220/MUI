/*declare*/
declare const Swiper: (target: SwiperParm, option?: IObj) => void;

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
    init(target: string, option: IObj): void;
    resize(): void;
}

interface IJqMap {
    map: IObj | null;
    put<T>(key:string | number, value: T): void;
    get<T>(key:string | number): T;
    containsKey(key:string | number): boolean;
    clear(): void;
    remove(key:string | number): void;
    keys(): (string | number)[];
    values(): any[];
    size(): number;
}

interface IObj {
    [key: string | number]: any;
}

/*type*/
type PromiseCallback = (resolve: (value: any) => void, reject: (reason?: any) => void) => void;
type SwiperParam = string | HTMLElement;
type slideSortParam = 'slick' | 'swiper';
