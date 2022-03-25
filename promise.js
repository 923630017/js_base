// Promise手写
// 定义状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";

class MyPromise {
  constructor(executor) {
    // 定义初始值
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 这是Promise new出实例，该实例多次调用then 且是异步 用于保存执行顺序 且依次执行
    /**
     * const p1 = new Promise((res, rej) => {
     *   setTimeout(() => {
     *      res(232)
     *   }, 2000)     
     * })
     * p1.then()
     * p1.then()
     * p1.then()
     * p1.then()
     * p1.then()
     * */  
    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];

    const reslove = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 异步时 当执行reslove时， 意味着该按顺序执行所有的成功
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;
        // 异步时 当执行reject时， 意味着该按顺序执行所有的成功
        this.onRejectCallbacks.forEach(fn => fn());
      }
    };
    /**
     * executor throw可能报错
     * new Promise((reslove, reject) => { new throw 'ewe' })
     * */
    try {
      executor(reslove, reject);
    } catch (error) {
      // 报错直接执行reject
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // 同步时成功
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    // 同步失败
    if(this.status == REJECT) {
      onRejected(this.reason)
    }
    /**
     * const p1 = new Promise((res, rej) => {
     *   setTimeout(() => {  异步
     *      res(232)
     *   }, 2000)     
     * })
     * 异步时(在执行器 new Promise时 执行异步) 如果实例多次then调用 
     * 同步不需要考虑 因为同步都会是按照顺序执行
     * 就利用发布订阅 存储所有的异步reslove、reject
     * p1.then()
     * p1.then()
     * */ 
    if(this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => { onFulfilled(this.value) });
      this.onRejectCallbacks.push(() => { onRejected(this.reason) })
    }
  }
}

module.exports = MyPromise