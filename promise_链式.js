// Promise手写
// 定义状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";

// .then 在链式操作中 不管是then的成功中还是失败中; catch一样
// 成功
// .then return js值 value
// .then return 新的promise resolve

// 失败
// then return 新的promise reject
// then 抛出错误 throw new Error(error)；

// resolvePromise 这是对x集中处理的函数
function resolvePromise(promise2, x, resolve, reject) {
  // promise2, x不能相同
  if (promise2 === x) {
    reject("promise2, x不能相同");
    return;
  }
  let called;//防止调用了以后还调用
  // 判断x是不是函数 对象 包含着promise
  if (x !=null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 判断 x是否有then属性
      let then = x.then; // 在获取then属性 可能抛出异常
      if (typeof then === "function") {
        // 如果then是函数就认为他是promise
        // 如果then是函数，将x作为函数的作用域this调用之。
        // 传递两个回调函数作为参数，第一个参数叫做resolvePromise，第二个参数叫做rejectPromise:
        then.call(x,(y) => {
            if(called) return;
            called = true;
             // 如果Y是promise就继续递归promise
             /**
              * let promise2 = p1.then((res) => {
              *     return new MyPromise((res, rej) => {
              *        res(new MyPromise((res, rej) => {
              *           res(23232323232323)  
              *        }))
              *     })
              * })
             */
            resolvePromise(promise2, y, resolve, reject)
          },(r) => {
            //只要失败了就失败了
            if(called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        //then是一个普通对象，就直接成功即可
        resolve(x)
      }
    } catch (error) {
        if(called) return;
        called = true;
       //抛出异常
       reject(error)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(executor) {
    // 定义初始变量
    this.status = PENDING; // 初始状态
    this.value = undefined; //成功的返回值
    this.reason = undefined; //失败的原因

    // 这是多次调用then时 保证调用的then按依次执行成功或者失败的回调函数集合
    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];

    // resolve, reject每个实例时单独 因此定义杂构造函数中 不写道原型
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 异步 通常都是异步 发布 依次执行存储的成功或者失败函数
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;
        // 异步 通常都是异步 发布 依次执行存储的成功或者失败函数
        this.onRejectCallbacks.forEach((fn) => fn());
      }
    };
    // 处理器 实例化立即执行 需要考虑报错
    try {
      executor(resolve, reject);
    } catch (error) {
      //报错时 直接reject改变状态
      reject(error);
    }
  }
  // 定义then和catch需要定义道原型prototype上
  then(onFulfilled, onReject) {
    // 穿透作用
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onReject = typeof onReject === 'function' ? onReject : reason => { throw reason}
    // 为了实现链式 规范提出
    // then必须返回一个promise2 为promise
    // 同时规范 onFulfilled, onRejected必须返回一个值x 或者抛出错误直接rejcet
    // 因为x可能是变量，可能是promise 因此需要判断 分别处理 利用函数 resolvePromise 集中处理
    const promise2 = new MyPromise((resolve, reject) => {
      // 成功时 不是异步时
      if (this.status === FULFILLED) {
        // 在实践中，这要求确保onFulfilled和onRejected异步地执行
        // 其次 异步确保resolvePromise能拿到promise2
        setTimeout(() => {
          try {
            // 成功
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 抛出错误
            reject(error);
          }
        }, 0);
      }
      // 失败时 不是异步时
      if (this.status === REJECT && onReject) {
        setTimeout(() => {
          try {
            const x = onReject(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 抛出错误
            reject(error);
          }
        }, 0);
      }
      // 实例化类 存在异步导致状态改变延迟时 需要收集所有的then的onFulfilled
      // onReject 在状态改变后 依次执行 这是PrmiseA+的规范  相当于订阅存储then的执行
      // Promise 实例可以多次then，当成功后会将 then 中的成功方法按顺序执行，
      // 我们可以先将 then 中成功的回调和失败的回调存到数组内。当成功的时候调用成功的数组即可
      if (this.status === PENDING) {
        // 异步时 导致状态未改变 然后push函数 在异步执行后，resolve或者reject函数中执行这些即可
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              // 成功
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              // 抛出错误
              reject(error);
            }
          }, 0);
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onReject(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              // 抛出错误
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(catchCallBack) {
    // catch 方法就是then方法没有成功的简写
    return this.then(null, catchCallBack);
  }
}

// 生成一个成功的promise
MyPromise.resolve = function(value){
  return new MyPromise((resolve,reject) => resolve(value))
}
// 生成一个失败的promise
MyPromise.reject = function(reason){
    return new MyPromise((resolve,reject) => reject(reason));
}

module.exports = MyPromise;
