/***
 * promise.then((res) => {
 * 
 * 
 * }, (err) => {
 *   如果现在走 reject 
 *   retuurn err
 * }).then((res) => {
 *     如果上一个then走reject 
 *     当前then则还是走reslove
 * }, (res) => {
 * 
 * })
 * 
 * 在then的成功中如果出现throw new Error() 
 * 则下一个then则走reject
 * 
 * 如果then reject和 catch同时存在，走错误时，会默认走then的reject
 * 
 * catch默认上就是一个then 它遵循then的规则
 * 
 * 成功条件
 *    1. then 返回一个普通js值
 *    2. then 返回一个new Promise的成功状态
 * 失败条件
 *    1. then抛出一个异常
 *    2. then 返回一个 new Promise的失败状态
 * 
 * 每一个promise实际上都返回了一个 new Promise 并且传给下个then
 * */ 