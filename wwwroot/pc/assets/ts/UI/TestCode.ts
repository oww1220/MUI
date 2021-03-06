import CommonUI from '../CommonUI';
import * as Const from '../Lib/Const';

const log = console.log;

// ---- test code ---- //
$(() => {
    //ie test es6 method!

    const { Async, Fn } = CommonUI;

    log('TOUCH_EVENT', Const.TOUCH_EVENT);

    const aaa = new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    }).then((result) => {
        //log(result + 1); // 1
        return result;
    });

    const bb = {
        as: 1,
        cs: 3,
    };

    const { as, cs } = bb;

    const ddd = Object.assign({ as }, { cs });
    log(ddd);
    log(ddd);
    //log(ddd);

    //디바운스 쓰로쓸링 테스트
    const TestPromise2 = (timeout: number) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, timeout);
        });

    const DTestPromise2 = Async.debounce(TestPromise2, 1000);
    const TTestPromise2 = Async.throttling(TestPromise2, 2000);

    $('h2').on('click', () => {
        console.log('test!!');
        DTestPromise2(1000).then(console.log);
        //TTestPromise2(1000).then(console.log);
    });

    (() => {
        let cashGenerator: null | Generator = null;
        let eventChkFlag = true;

        //비동기 함수들 --> 동기적으로 실행 예시!!
        const promiseCallback: PromiseCallback = (resolve, reject) => {
            $('.col:first-child h2').animate({ 'margin-left': 100 }, 5000, () => {
                resolve(true);
                //reject(new Error('에러다!'));
            });
        };
        const promiseCallback2: PromiseCallback = (resolve, reject) => {
            $('.col:first-child h2').animate({ 'margin-left': 0 }, 5000, () => {
                resolve(true);
                //reject(new Error('에러다!'));
            });
        };

        function* testEvent01() {
            //log('!!!!!!!!!!!!start');
            eventChkFlag = false;
            try {
                const delay1 = yield Async.wait(2000, 'delay2초');
                log(delay1);

                const runVal11 = yield Async.promise(promiseCallback);
                log(runVal11);

                const runVal2 = yield 'test2';
                log(runVal2);

                const runVal3 = yield 'test3';
                log(runVal3);

                const runVal4 = yield 'test4';
                log(runVal4);

                const delay2 = yield Async.wait(3000, 'delay3초');
                log(delay2);

                const runVal22 = yield Async.promise(promiseCallback2);
                log(runVal22);
            } catch (err) {
                log(err.message);
            }
            eventChkFlag = true;
            //log('end!!!!!!!!!!!!');
        }

        $('.startBtn_0').on('click', () => {
            //if (cashGenerator) cashGenerator.return();
            console.log(eventChkFlag);
            if (!eventChkFlag) return;
            cashGenerator = testEvent01();
            Async.generaterRun(cashGenerator);
        });
        $('.endBtn_0').on('click', () => {
            if (cashGenerator) cashGenerator.return(true);
            if (!eventChkFlag) eventChkFlag = true;
        });
    })();

    /*
    const actionAsync = Async.generaterRun(function* () {
        try {
            const delay1 = yield Async.wait(2000, 'delay2초');
            log(delay1);

            const runVal11 = yield Async.promise(promiseCallback);
            log(runVal11);

            const runVal2 = yield 'test2';
            log(runVal2);

            const runVal3 = yield 'test3';
            log(runVal3);

            const runVal4 = yield 'test4';
            log(runVal4);

            const delay2 = yield Async.wait(3000, 'delay3초');
            log(delay2);

            const runVal22 = yield Async.promise(promiseCallback2);
            log(runVal22);
        } catch (err) {
            log(err.message);
        }
    });

    console.log('actionAsync', actionAsync.then(log));
    */

    function* testGeneraterF() {
        const delay1 = yield Async.wait(2000, 'delay2초');
        const a = yield 10;
        const b = yield `${a} + 10`;

        return 10 + a + b;
    }

    const testGenerater = testGeneraterF();
    console.log('generater next!!!', testGenerater.next().value);
    console.log('generater next!!!', testGenerater.next().value);
    console.log('generater next!!!', testGenerater.next(10).value);

    //(Array.prototype as any).mapToNumbers = function () {
    ///* ... */
    //};

    //함수형 프로그래밍 test코드!
    /*
    const FF = (list: number[], length: number) => {
        return Fn.reduce(
            (acc, cur) => acc + cur,
            0,
            Fn.take(
                length,
                Fn.map(
                    (cur) => cur * cur,
                    Fn.filter((cur) => Boolean(cur % 2), list),
                ),
            )!,
        );
    };*/

    //console.log(Fn.map((cur) => (cur as number) * (cur as number), [1, 2]));

    const { LFilterCurry, LMapCurry, TakeCurry, TakeWhileCurry, TakeEveryCurry, ReduceCurry } = CommonUI;

    const FF2 = async (list: number[], length: number) => {
        const val = await Fn.Lisp(
            list,
            //LFilterCurry((cur) => Boolean(cur % 2)), //실제함수를 커리함수로 만들고 콜백함수를 파라미터로 넘겨 한번 커링된 상태임! (...bs: any[]) => f(a, ...bs)
            LMapCurry((cur) => Promise.resolve(cur * cur)),
            LMapCurry((cur) => cur + 2),
            LFilterCurry((cur) => Boolean(cur % 2)),
            //MapCurry((cur: number) => Promise.resolve(cur * cur)),
            TakeCurry(length), //파라미터로 받은 상수 값만틈만 리스트를 가져옴!
            //TakeEveryCurry((cur: number) => Boolean(cur > 10)), //파라미터로 받은 인수 그대로 리턴 시키면 모든 값 가져옴!
            //ReduceCurry((acc: number, cur) => acc + cur),
            //Fn.curry(Fn.curry(Fn.reduce)((acc: number, cur: number) => acc + cur))(0),
        );

        console.log('val', val);
    };
    //const test11 = Fn.filter((a)=>Boolean(a%2), [1,2,3,4,5]);
    //log('리턴값', test11); //리턴값은 제너레이터인;;
    /*
    const test22 = Fn.map(
        (cur) => cur * cur,
        Fn.filter((cur) => Boolean(cur % 2), [1,2,3,4,5]),
    );

    log('리턴값', test22.next());
    log('리턴값', test22.next());
    log('리턴값', test22.next());
    log('리턴값', test22.next());

    const test33 = Fn.curry((a, b, c) => a * b + c);
    log('test', Fn.curry(test33(3))(2)(1));
    */

    /*
    Fn.Lisp(
        Promise.resolve(1),
        (a) => (a as number) + 1,
        (a) => Promise.resolve((a as number) + 5),
        (a) => (a as number) + 22,
        log
    );

    console.log('test', Fn.takeWhile((a)=>a<3, [1, 2]));
    Fn.takeWhile((a)=>a<3, [Promise.resolve(1), Promise.resolve(2)]).then((a)=>console.log('test2', a));
        */

    //log('test!', Promise.resolve(1).then((a)=>a));

    (() => {
        //log(FF([1, 2, 3, 4, 5], 3));

        log('FF2', FF2([1, 2, 3, 4, 5], 3));
    })();

    console.log('----하단----');
});
