//전역(global)선언
declare global {
    interface Window{
        CommonUI: any;
    }
    interface HTMLElement {
        iscrolls?: IScroll;
    }
    interface IObj {
        [key: string | number]: any;
    }

    type PromiseCallback = (resolve: (value: any) => void, reject: (reason?: any) => void) => void;
}

export default global;



