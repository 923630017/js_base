// Promise手写
// 定义状态
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECT = "REJECT";

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
    // 成功时 不是异步时
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    // 失败时 不是异步时
    if (this.status === REJECT && onReject) {
      onReject(this.reason);
    }
    // 实例化类 存在异步导致状态改变延迟时 需要收集所有的then的onFulfilled
    // onReject 在状态改变后 依次执行 这是PrmiseA+的规范  相当于订阅存储then的执行
    // Promise 实例可以多次then，当成功后会将 then 中的成功方法按顺序执行，
    // 我们可以先将 then 中成功的回调和失败的回调存到数组内。当成功的时候调用成功的数组即可
    if (this.status === PENDING) {
      // 异步时 导致状态未改变 然后push函数 在异步执行后，resolve或者reject函数中执行这些即可
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectCallbacks.push(() => {
        onReject(this.reason);
      });
    }
  }
}
module.exports = MyPromise;


