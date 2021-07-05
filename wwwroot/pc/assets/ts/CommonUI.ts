import '@babel/polyfill';
import * as Type_CommonUI from 'Type_CommonUI';

namespace CommonUI {
    export const $: JQueryStatic = jQuery;
    export const Resize = {
        chk(target: JQuery) {
            if ((target.width() || 0) >= 1025) {
                target.removeClass('pc mobile tablet').addClass('pc');
            } else if ((target.width() || 0) >= 768) {
                target.removeClass('pc mobile tablet').addClass('tablet');
            } else {
                target.removeClass('pc mobile tablet').addClass('mobile');
            }
        },
        font() {
            const doc = document.documentElement;
            const caculateWidth = String((doc.clientWidth / 320) * 62.5 * 100);
            let fontSizeVal = parseFloat(caculateWidth) / 100;
            fontSizeVal = fontSizeVal >= 85 ? 85 : fontSizeVal;

            doc.style.fontSize = fontSizeVal + '%';
        },
        resize($BODY: JQuery) {
            $(window).on('resize', () => {
                this.chk($BODY);
                this.font();
            });
        },
    };
    export const Map = {
        init() {
            class JqMap implements Type_CommonUI.IJqMap {
                map: IObj | null = null;
                constructor() {
                    this.map = new Object();
                }
                /* key, value 값으로 구성된 데이터를 추가 */
                put<T>(key: string | number, value: T) {
                    this.map![key] = value;
                }
                /* 지정한 key값의 value값 반환 */
                get<T>(key: string | number): T {
                    return this.map![key];
                }
                /* 구성된 key 값 존재여부 반환 */
                containsKey(key: string | number): boolean {
                    return key in this.map!;
                }
                /* 구성된 데이터 초기화 */
                clear() {
                    for (const prop in this.map) {
                        delete this.map[prop];
                    }
                }
                /*  key에 해당하는 데이터 삭제 */
                remove(key: string | number) {
                    delete this.map![key];
                }
                /* 배열로 key 반환 */
                keys(): (string | number)[] {
                    const arKey: (string | number)[] = new Array();
                    for (const prop in this.map) {
                        arKey.push(prop);
                    }
                    return arKey;
                }
                /* 배열로 value 반환 */
                values(): any[] {
                    const arVal = new Array();
                    for (const prop in this.map) {
                        arVal.push(this.map[prop]);
                    }
                    return arVal;
                }
                /* Map에 구성된 개수 반환 */
                size(): number {
                    let count = 0;
                    for (const prop in this.map) {
                        count++;
                    }
                    return count;
                }
            }

            return new JqMap();
        },
    };
    export const Slide = {
        init(target: Type_CommonUI.SwiperParam, sort: Type_CommonUI.slideSortParam, option?: IObj) {
            if (sort == 'slick' && typeof target === 'string') {
                const $target = $(target);
                return $target.slick(option!);
            }
            if (sort === 'swiper') {
                return new Swiper(target, option!);
            }
        },
    };
    export const Layer = {
        scrollTop: 0,
        calculate(layer: string) {
            const $layer = $(layer),
                layerIn = $layer.find('.pop_inner'),
                winH = $(window).height() || 0,
                winW = $(window).width() || 0;

            layerIn.find('.pop_scroll').removeAttr('style');

            const layerH = $layer.height() || 0,
                layerW = $layer.width() || 0,
                marginH = parseInt(layerIn.css('marginTop')) + parseInt(layerIn.css('marginBottom'));
            //console.log(layer, winH, winW, layerH, layerW, marginH);

            if (winH < layerH) {
                layerIn.find('.pop_scroll').css({
                    height: winH - marginH,
                    overflow: 'auto',
                });
                $layer.css({
                    top: 0,
                    left: (winW - layerW) / 2,
                });
            } else {
                layerIn.find('.pop_scroll').removeAttr('style');
                $layer.css({
                    top: (winH - layerH) / 2,
                    left: (winW - layerW) / 2,
                });
            }
        },
        openClick(
            target: string,
            dimmed: string,
            parent: string,
            callback?: (show: () => void, layer: string, targetDom: JQuery) => void,
        ) {
            const that = this;
            $(document).on('click', target, function (e) {
                const layer = '.' + $(this).data('layer');
                const targetDom = $(this);
                //that.scrollTop = $(window).scrollTop();

                const show = () => {
                    that.open(layer, dimmed, parent);
                };

                if (callback) {
                    callback(show, layer, targetDom);
                } else {
                    show();
                }

                e.preventDefault();
            });
        },
        open(layer: string, dimmed: string, parent: string, callback?: (layer: string) => void) {
            const that = this;
            that.scrollTop = $(window).scrollTop() || 0;
            $('body').addClass('fixed');
            $('body').css({ top: -that.scrollTop });
            if (dimmed) $(dimmed).fadeIn();
            if (callback) callback(layer);
            $(parent + layer).show();
            that.calculate(layer);
            $(window).on('resize.layer', function () {
                that.calculate(layer);
            });
        },
        closeClick(
            target: string,
            dimmed: string,
            parent: string,
            callback?: (hide: () => void, layer: string, targetDom: JQuery) => void,
        ) {
            const that = this;
            $(document).on('click', target, function (e) {
                let layer: string;
                const targetDom = $(this);
                const hide = () => {
                    that.close(layer, dimmed, parent);
                };
                if (target == dimmed) {
                    layer = parent;
                } else {
                    layer = parent + '.' + $(this).data('layer');
                }

                if (callback) {
                    callback(hide, layer, targetDom);
                } else {
                    hide();
                }

                e.preventDefault();
            });
        },
        close(layer: string, dimmed: string, parent: string, callback?: (layer: string) => void) {
            const that = this;
            if (layer != dimmed) {
                $(layer).hide();
            } else {
                $(parent).hide();
            }
            if (dimmed) $(dimmed).fadeOut();
            if (callback) callback(layer);
            $('body').removeClass('fixed');
            $('body').css({ top: 0 });
            $(window).scrollTop(that.scrollTop);
            $(window).off('resize.layer');
        },
    };
    export const Event = {
        toggle(target: string, parent: string | null, callback?: (logic: () => void, layer: JQuery) => void) {
            $(document).on('click', target, function (e) {
                const $this = $(this);
                const $targetDiv = $(target);
                const layer = $('.' + $this.data('target'));
                const sort = $this.data('sort');
                const onClass = $this.data('on');
                const siblings = $this.data('siblings');
                const $parent = $(parent!);
                //console.log(sort, onClass, siblings, $parent);

                const logic = () => {
                    if (onClass) {
                        if (parent === null ? $this.hasClass('on') : layer.is(':visible')) {
                            $this.removeClass('on');
                            layer.removeClass('on');
                        } else {
                            if (siblings) {
                                $targetDiv.removeClass('on');
                                $parent.removeClass('on');
                            }
                            $this.addClass('on');
                            layer.addClass('on');
                        }
                    }

                    if (layer.is(':visible')) {
                        if (sort == 'fade') {
                            layer.fadeOut();
                        } else if (sort == 'normal') {
                            layer.hide();
                        } else if (sort == 'none') {
                            return false;
                        } else {
                            layer.slideUp();
                        }
                    } else {
                        if (sort == 'fade') {
                            if (siblings) {
                                $parent.fadeOut();
                            }
                            layer.fadeIn();
                        } else if (sort == 'normal') {
                            if (siblings) {
                                $parent.hide();
                            }
                            layer.show();
                        } else if (sort == 'none') {
                            return false;
                        } else {
                            if (siblings) {
                                $parent.slideUp();
                            }
                            layer.slideDown();
                        }
                    }
                };

                if (callback) {
                    callback(logic, layer);
                } else {
                    logic();
                }
                //e.preventDefault();
            });
        },
        goTop(target: JQuery) {
            target.on('click', function (e) {
                $('html, body').stop().animate({ scrollTop: 0 }, 1000);
                e.preventDefault();
            });
        },
        topScrollCh(target: JQuery, parent: JQuery) {
            if (parent.hasClass('pc')) {
                const winScroll = $(window).scrollTop() || 0;
                if (winScroll == 0) {
                    target.fadeOut();
                    $('#header .inner').removeClass('on');
                } else {
                    target.fadeIn();
                    $('#header .inner').addClass('on');
                }
            } else {
                return;
            }
        },
        taps(tab_nav: string, callback?: (swap: () => void) => void) {
            const target = tab_nav + '.tab_nav li';
            //console.log(target);
            $(document).on('click', target, function (e) {
                const $this = $(this);
                const $layer = $(tab_nav + '.tab_cont');
                const idx = $this.index();

                const swap = () => {
                    $this.addClass('on').siblings().removeClass('on');
                    $layer.find('> div').eq(idx).show().siblings().hide();
                };
                if (callback) {
                    callback(swap);
                } else {
                    swap();
                }
                e.preventDefault();
            });
        },
        calander(
            target: string,
            option: IObj,
            callback?: JQuery.TypeEventHandler<HTMLElement, unknown, any, any, 'change'>,
        ) {
            $(target).each(function () {
                $(this).datepicker(option);
                $(this).datepicker('setDate', 'today');
                if (callback) $(this).on('change', callback);
            });
        },
        customSelect(parent: string) {
            const target = parent + ' button';
            const listTarget = parent + ' a';
            let $parent: JQuery;
            $(document).on('click', target, function (e) {
                $parent = $(this).parent();
                if ($parent.hasClass('on')) {
                    $parent.removeClass('on');
                } else {
                    $(parent).removeClass('on');
                    $parent.addClass('on');
                    CommonUI.Iscrolls.resize();
                }
                //console.log($parent);
            });
            $(document).on('click', listTarget, function (e) {
                const bt = $parent.find('button');
                const input = $parent.find('input');
                const val = $(this).data('val');
                const text = $(this).text();

                input.val(val);
                bt.text(text);
                //console.log(input, input.val());

                $parent.addClass('select');
                $parent.removeClass('on');

                e.preventDefault();
            });
        },
        changeSelect(target: string) {
            $(document).on('change', target, function (e) {
                const val = $(this).val();
                const target = $(this).parent().find('.selText');
                if (val == 'DISP_ROOT') {
                    target.html(target.attr('data-name') || '');
                } else {
                    target.html(
                        $(this)
                            .find('.bestSubCate' + val)
                            .attr('data-name') || '',
                    );
                }
            });
        },
        fixedTop: function () {
            let enScrollTop = 0,
                beScrollTop = 0;
            const $header = $('#header'),
                $topBanner = $('.top_bn_w'),
                fixdTop = $header.offset()!.top || 0,
                paddingTop = $header.height() || 0,
                scrollThreshold = 90;

            if ($topBanner.length && $topBanner.is(':visible')) {
                $header.removeClass('fixed');
                $header.css({ height: 'auto' });
            } else {
                $header.addClass('fixed');
                $header.css({ height: paddingTop });
            }

            $(window).on('scroll', function (e) {
                const scrollpos = window.scrollY || window.pageYOffset;

                enScrollTop = scrollpos;

                if ($topBanner.length && $topBanner.is(':visible')) {
                    //console.log(fixdTop, scrollpos);
                    if (fixdTop <= scrollpos) {
                        $header.addClass('fixed');
                    } else {
                        $header.removeClass('fixed');
                    }
                }
                if (Math.abs(enScrollTop - beScrollTop) < scrollThreshold) return false;

                if (!$('body').hasClass('pc')) {
                    beScrollTop > enScrollTop ? $header.removeClass('on') : $header.addClass('on');
                } else {
                    $header.removeClass('on');
                }
                beScrollTop = enScrollTop;
            });
        },
    };
    export const Iscrolls: Type_CommonUI.Iiscrolls = {
        cash: null,
        num: 0,
        init(target, option) {
            this.cash = this.cash ? this.cash : CommonUI.Map.init();
            $(target).each((idx: number, item) => {
                const targetIdx = $(target)[idx];

                targetIdx.iscrolls = new IScroll(item, option);
                //console.log(item);
                this.cash!.put(this.num++, { sort: item, option: option });
            });
            //console.log(this.cash);
        },
        resize: function () {
            if (!this.cash) return;
            $.each(this.cash.map, (key: number, value: { sort: HTMLElement; option: IObj }) => {
                if (value.sort.className == 'select_list') {
                    //console.log(key, value.sort.iscrolls);
                    value.sort.iscrolls!.scrollTo(0, 0);
                }
            });
        },
    };
    export const Async = {
        generaterRun(iter: Generator) {
            //generaterRun(gen: () => Generator) {
            //const iter = gen();
            //let flag = 0;
            //console.log('%c--start generaterRun!--', 'color:green');
            return (function iterate({ value, done }) {
                //const num = ++flag
                //console.log('스택 푸쉬 : ', num);
                if (done) return value;
                if (value.constructor === Promise) {
                    /*
                        프라미스 객체가 이행(Fulfilled)상태면 -> then 핸들러 샐행 : resolve 된 값을 받아 멈춰진 yield 표현식 변수에 값을 넣어주고 다음 yield까지 코드 실행(재귀호출로)! 
                        프라미스 객체가 실패(Rejected) 상태면 -> catch 핸들러 샐행 : Generator.throw 메소드를 실행하여 제너레이터에 에러를 알려줌!
                    */
                    return value.then((data) => iterate(iter.next(data))).catch((err) => iter.throw(err));
                } else {
                    return iterate(iter.next(value));
                }
                //console.log('스택 팝 : ', num);
            })(iter.next());
        },
        wait(ms: number, value?: any) {
            return new Promise((resolve) => setTimeout(resolve, ms, value));
        },
        promise(callback: PromiseCallback) {
            return new Promise((resolve, reject) => {
                /*
                리턴되어진 프라미스(future 모나드 타입) 핸들러(1. 값을 꺼내어 연산이나 평가후 다시 future 모나드 타입으로만들어서 return 하거나, 2.프로시저로 작성해서 흐름을 마무리): then 핸들러, catch 핸들러
                new Promise에 전달되는 파라미터 함수는 executor(실행자, 실행 함수) 라고 부릅니다. 
                    resolve 함수 실행시 : 리턴되어진 프라미스(future 모나드 타입) 객체가 이행(Fulfilled) 상태가 됩니다.
                    reject 함수 실행시 : 리턴되어진 프라미스(future 모나드 타입) 객체가 실패(Rejected) 상태가 됩니다.
                */

                // 기본적으로 에러는 발생함..... catch유무확인...내용임!!
                // 프라미스 executor(실행자, 실행 함수)와 프라미스 핸들러 코드 주위엔 '보이지 않는 try..catch'가 있습니다. 예외가 발생하면 암시적 try..catch에서 예외를 잡고, 이를 reject처럼 다룹니다.
                // throw new Error("에러 발생!");
                // reject(new Error("에러 발생!"));
                // -- 위 두 케이스는 모두 error catch 할수있음!
                /*
                // setTimeout 메소드는 비동기로 에러가 나중에 발생하기때문에 reject로 비동기 함수 실행시점에 에러를 알려주어야된다(error catch됨)!
                setTimeout(() => {
                    //throw new Error("에러 발생!");
                    //reject(new Error("에러 발생!"));
                }, 1000);

                ** 비동기식으로 작동하는 콜백의 내부에서 발생한 에러는, 콜백 바깥에 있는 try 블록으로는 잡아낼 수 없습니다.
                ** JavaScript 엔진은 에러가 발생하는 순간 호출 스택을 되감는 과정을 거칩니다. 
                이 과정 중에 try 블록을 만나야 코드의 실행 흐름을 원상복구시킬 수 있습니다. 
                위 예제에서 setTimeout에 넘겨진 콜백에서 throw new Error("에러 발생!")가 발생하면, 
                호출 스택을 따라 올라가도 try 블록을 만나는 것이 아니므로, (setTimeout는 task queue에 저장 )
                (Event Loop는 사전적인 의미처럼 계속 반복해서 call stack과 queue 사이의 작업들을 확인하고, call stack이 비워있는 경우 queue에서 작업을 꺼내어 call stack에 넣는다.)
                코드의 실행 흐름이 catch 블록으로 옮겨지지 않는 것입니다. (즉setTimeout 비동기 함수가 실행되는 시점은 call stack 이 비워져 있는 시점이라  try 블록을 만날수가 없다!!!!!)
                
                즉, throw new Error("에러 발생!")에러는 executor(실행자, 실행 함수)가 실행되는 동안만  유효함(error catch됨)!!!!!!
                */

                // 하단 콜백은 에러가 다른문맥에서 발생하기때문에 reject로 해당함수 문맥에서 에러를 알려주어야된다(error catch됨)!
                callback(resolve, reject);
            });
        },
    };

    //함수형 프로그래밍 공부용 모듈!
    export const Fn = {
        /**
         * @description: Promise.reject(this.nop)로 프라미스를 넘기면
         * .catch(e => e == Fn.nop ? recur() : Promise.reject(e)) 로 함수를 재호출시켜서 다음 이벤트 호출시킴.!!
         */
        nop: Symbol('nop'),

        /**
         * @description curry 함수는 
         * 어떤 함수를 호출할 때 대부분의 매개 변수가 항상 비슷하다면 커링을 사용할 만한 후보라고 할 수 있다.
         * 매개변수 일부를 적용하여 새로운 함수를 동적으로 생성하면 이 동적 생성된 함수는 반복적으로 사용되는 매개변수를 내부적으로 저장하여, 
         * 매번 인자를 전달하지 않아도 원본함수가 기대하는 기능을 채워 놓게 될 것이다.

         * @param f 고차함수로 만들 실제함수를 받음
         * @returns 커링함수를 리턴(실제함수는 클로저스코프 영역에 저장됨)!
         */
        curry<T extends (...args: any[]) => any>(f: T) {
            //console.log('this', this);
            //실제 커링로직 고차함수
            return (a: any, ...bs: any[]) =>
                bs.length ? f.bind(this)(a, ...bs) : (...bs: any[]) => f.bind(this)(a, ...bs);
        },

        /**
         * @description LFilter 함수는 명령형 프로그램의 if문을 추상화한 함수임(제너레이터 함수를 써서 동시성 프로그래밍 및 지연평가를 할수 있게함!)
         * @param {(cur: T) => U} f 콜백함수: 각 루프 이벤트 체크용 콜백함수! T타입을 받아 U(boolean)타입 리턴-true false 확인
         * @param {Iterable<T>} iter T타입 으로 구성된 이터러블객체(Generator객체, array객체, string객체 등등): 이터러블 객체도 일반화 시키면 모나드 타입;;;;인듯
         * @return {T[]} T타입 array객체
         */
        *LFilter<T, U>(f: (cur: T) => U, iter: Iterable<T>): Generator<T> {
            for (const cur of iter) {
                //console.log('filter', f(cur));
                //if (f(cur)) yield cur;
                const b = this.Composite(cur, f);
                if (b instanceof Promise) yield (b as any).then((b: U) => (b ? cur : Promise.reject(this.nop)));
                else if (b) yield cur;
            }
        },

        /**
         * @description map 함수는 명령형 프로그램의 연산부분을 추상화한 함수임(제너레이터 함수를 써서 동시성 프로그래밍 및 지연평가를 할수 있게함!)
         * @param {(cur: T) => T} f 콜백함수: T타입을 받아 T타입 리턴 즉, 같은 타입 리턴
         * @param {Iterable<T>} iter T타입 으로 구성된 이터러블객체(Generator객체, array객체, string객체 등등)
         * @return {Generator<T>} T타입 Generator객체[free모나드 타입]
         */
        *LMap<T>(f: (cur: T) => T, iter: Iterable<T>): Generator<T> {
            for (const cur of iter) {
                //for of 는 암묵적으로 Generator(Generator함수가 반환한 객체) || Iterator(Iterable의 Symbol.iterator메소드가 반환한 객체) next메소드 실행
                yield this.Composite(cur, f);
            }
        },

        /**
         * @description  take는 처음 발생하는 length개의 이벤트만 받고 나머지는 무시한다.
         * @param {number} length 길이 상수 값
         * @param {Iterable<T>} iter T타입 으로 구성된 이터러블객체(제너레이터객체, array객체, string객체 등등)
         * @return{T[]} T타입 array객체
         */
        take<T>(length: number, iter: Iterable<T>): T[] {
            let res: T[] = [];

            (iter as any) = iter[Symbol.iterator]();
            (iter as any).return = null; //비동기가 일어났을때 끊내지 않겠다! 즉 아래 재귀호출함수에게 end조건을 맡김!
            //null 값 안넣으면 아래 재귀호출 한번만 실행됨;;; 즉 순회를 전부다 해버림;
            return (function recur() {
                console.log('run!!');
                for (const cur of iter) {
                    //console.log('cur : ', cur)
                    if (cur instanceof Promise) {
                        //console.log('promise');

                        // Promise 재귀는 Promise.resolve(1).then(a => Promise.resolve(a+1).then(b=>Promise.resolve(b+1).then(c=>c+1)));  이런형태로구현되어짐;;;;
                        return cur
                            .then((a) => ((res.push(a), res).length == length ? res : recur()))
                            .catch((e) => (e == Fn.nop ? recur() : Promise.reject(e)));
                    }
                    res.push(cur);
                    if (res.length === length) return res;
                }
                return res;
            })();
        },

        /**
         * @description takeWhiled은 만약에 검사를 통과하지 못한 이벤트가 있다면?? 그 이벤트는 물론이고 그 이후의 모든 이벤트가 무시된다.
         * @param {(cur: T) => U} f  콜백함수: 각 루프 이벤트 체크용 콜백함수! T타입을 받아 boolean타입 리턴-true false 확인
         * @param {Iterable<T>} iter  iter T타입 으로 구성된 이터러블객체(제너레이터객체, array객체, string객체 등등) //커리 함수로 감싼 후에는 이터객체만 호출시키면됨!
         * @returns {T[]} T타입 array객체
         */
        takeWhile<T, U>(f: (cur: T) => U, iter: Iterable<T>): T[] {
            let res: T[] = [];

            (iter as any) = iter[Symbol.iterator]();
            (iter as any).return = null;
            return (function recur() {
                //console.log('run!!')
                for (const cur of iter) {
                    const b = Fn.Composite(cur, f);
                    //console.log('조건', b, cur);
                    if (!b) return res; //true false 확인
                    if (b instanceof Promise) {
                        //console.log('promise');
                        return b
                            .then(async (b) => (b ? (res.push(await cur), recur()) : res))
                            .catch((e) => (e == Fn.nop ? recur() : Promise.reject(e)));
                    }
                    res.push(cur);
                }
                return res;
            })();
        },

        /**
         * @description takeEvery은 만약에 검사를 통과하지 못한 이벤트가 있더라도 이후의 이벤트도 실행시킨다.
         * takeWhile과의 차이는 검사를 통과한 이벤트 이후의 이벤트 무시 유무임! takeEvery는 이후의 이벤트도 받는다!
         * @param {(cur: T) => U} f 콜백함수: 각 루프 이벤트 체크용 콜백함수! T타입을 받아 U(boolean)타입 리턴-true false 확인
         * @param {Iterable<T>} iter T타입 으로 구성된 이터러블객체(Generator객체, array객체, string객체 등등): 이터러블 객체도 일반화 시키면 모나드 타입;;;;인듯
         * @return {T[]} T타입 array객체
         */
        takeEvery<T, U>(f: (cur: T) => U, iter: Iterable<T>): T[] {
            let res: T[] = [];

            (iter as any) = iter[Symbol.iterator]();
            (iter as any).return = null;
            return (function recur() {
                //console.log('run!!')
                for (const cur of iter) {
                    const b = Fn.Composite(cur, f);
                    //console.log('조건', b, cur);
                    if (!b) continue; //true false 확인
                    if (b instanceof Promise) {
                        //console.log('promise');
                        return b
                            .then(async (b) => (b ? (res.push(await cur), recur()) : recur()))
                            .catch((e) => (e == Fn.nop ? recur() : Promise.reject(e)));
                    }
                    res.push(cur);
                }
                return res;
            })();
        },

        /**
         * @description reduce 함수는 명령형 프로그램의 누산기 부분을 추상화한 함수임
         * 누산기(accumulator): 컴퓨터의 중앙처리장치(CPU)의 중간 계산 결과가 저장되는 레지스터임
         * @param {(acc: U, cur: T) => U} f 콜백함수: U타입(누산기) T타입(이터레이터에서 꺼낸 현재 값) 을 각각받아 로직실행후 U타입 리턴(T타입 을 U타입(누산된 타입)에 녹이야됨)
         * @param {U} acc U타입 시작 값(초기값으로 누산이 되는 값)
         * @param {Iterable<T>} iter T타입 으로 구성된 이터러블객체(제너레이터객체, array객체, string객체 등등)
         * @return{U} U타입: 최종 누산되어진 타입(값) 리턴!!
         */
        reduce<T, U>(f: (acc: U, cur: T) => U, acc: U, iter: Iterable<T>): U {
            /**
             * @description 누산기 초기값을 받지않고 이터러블이 2번째 파라미터로 들어올경우-->
             * acc변수는 Iterable<T>이므로 초기값과 이터레이터를 분리시켜주야됨!
             * iter변수에 Symbol.iterator를 호출해 이터레이터를 담는다.!
             * 그 다음 이 이터레이터를 한번 호출해 첫번째 값을 가져와 acc변수에 재할당한다!
             * for of 문에서 그 다음부분 부터 next시켜 값을 가져온다.
             */
            if (arguments.length == 2) {
                iter = acc[Symbol.iterator]();
                acc = (iter as Generator).next().value;
            }
            for (const cur of iter) {
                //파라미터로 받은 콜백 함수를 for of 반복시마다 호출(누산기, 현재값)
                acc = f(acc, cur);
            }
            return acc;
        },

        /**
         * @description 리스프(Lisp, LISP) 혹은 리습, LISt Processing"(리스트(연결리스트) 프로세싱)을 추상화
         * @param {Iterable<T>} acc T타입 으로 구성된 이터러블객체(제너레이터객체, array객체, string객체 등등)
         * @param {((a: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T>)[]} fs acc누산기 파라미터 값을 받아 로직처리하는 함수들을 담은 array객체: 각 함수(map, filter등등)들은 커리로 합성되어서 리턴된 고차함수임!-기존(map, filter등등)함수의 2번째 인자인 이터및 제너레이터를 받는 고차함수
         * @returns {T} acc 누산기 값을 리턴!! Iterable<T>의 리스트 아이템들을 각각 누산시킴!
         */
        Lisp<T>(
            acc: Iterable<T>,
            ...fs: ((a: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T>)[]
        ): Iterable<T> | Generator<T> | Promise<T> {
            //fs(f함수들) 아규먼트(인자)배열로 받아서 리듀스 돌림

            //fs이터러블의 각 함수들을 꺼내어 누산기를 파라미터로 넘기고 실행!
            return this.reduce(this.Composite, acc, fs);
        },

        /**
         * @description 함수합성하기 위한 고차함수! 두번째 인자로 함수를 받아서 acc를 가공하여 리턴한다!!
         * @param {T} acc 누산값및 초기값
         * @param {(a: T) => any} f 콜백함수! reduce를 통해 순서대로 꺼내진 콜백함수! 파라미터로는 T누산값을 받음!
         * @returns acc 가 Promise<T>면 .then(f)을 연결한  Promise를 리턴!, acc 가 T면 f(acc)로 평가된 값 리턴!
         */
        Composite<T>(acc: T, f: (a: T) => any): T {
            //console.log('Promise chk:', acc instanceof Promise, '누산된 값', acc);
            //프라미스(future 모나드)인 경우 then에서 값을 꺼내어 함수합성을함! ,
            //한번 프라미스로 리턴되면 리턴값은 프라미스로 고정됨 즉, acc.then(f).then(f).then(f)....로 이어져나감!
            // then 함수의 리턴값이 Promise 임!!
            //프라미스가 아닌경우는....F(F(F(F(f(acc)))))....로 이어져나감!
            return acc instanceof Promise ? acc.then(f) : f(acc);
        },
    };

    /**
     * @description curry함수와 합성된 함수 축약!
     */
    export const LFilterCurry: <T, U>(
        f: (cur: T) => U | Promise<U>,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.LFilter);
    export const LMapCurry: <T, U>(
        f: (cur: T) => U | Promise<U>,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.LMap);
    export const TakeCurry: <T>(
        length: T,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.take);
    export const TakeWhileCurry: <T, U>(
        f: (cur: T) => U | Promise<U>,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.takeWhile);
    export const TakeEveryCurry: <T, U>(
        f: (cur: T) => U | Promise<U>,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.takeEvery);
    export const ReduceCurry: <T, U>(
        f: (acc: U, cur: T) => U | Promise<U>,
        ...bs: any[]
    ) => (iter: Iterable<T> | Generator<T>) => Iterable<T> | Generator<T> | Promise<T> = Fn.curry(Fn.reduce);
}
export default CommonUI;

//전역으로 내보냄 -- 선택사항
window.CommonUI = CommonUI;
