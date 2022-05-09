
***7.迭代器

1.自定义迭代器 一般自定义迭代器需要闭包，因为新的迭代运算开始，需要新的迭代器新计数，例如下面 如果实例进行了一次forof; 再次进行forof就不能实现迭代；因为返回的是一个this 
 # class Counter{
     contructor(limit){
        this.limit = limit;
        this.count = 1;
     };
     next() { 
       if (this.count <= this.limit) { 
          return { done: false, value: this.count++ }; 
       } else { 
          return { done: true, value: undefined }; 
       } 
    } 
    [Symbol.iterator]() { 
      return this; 
      }
    }
  }
2：提前终止迭代器，可以通过在迭代器工厂函数里加一个return函数，返回有效的IteratorResult 对象 即{done: true}; 这种设置设置提前关闭迭代的方法，如果在forof中运用,有判断条件，则可以通过break continue return throw提前退出；通过解构也会根据解构的个数提前关闭迭代； 迭代器没有设置关闭时，如果再次forof迭代器时，会在上次break的地方，继续迭代，例如数组的迭代器就没哟关闭；
    
3:生成器；拥有在一个函数块内暂停和恢复代码执行的能力；使用生成器可以自定义迭代器和实现协程
   1. 生成器： 只要可以定义函数的地方就可以定义生成器； 定义生成器特点就是在函数名前加*，例如：function *a(){};let a = function*(){}
   2. 箭头函数不能定义生成器；定义生成器的* 不受两边空格影响，只要是在函数名前；例如 function * a(){} === fucntion *a(){}
   3. 生成器对象是通过调用生成器函数产生的；这个对象和迭代器类似，一开始暂停状态，然后通过next()方法才能恢复执行状态；function* generatorFn() {}；const g = generatorFn(); g.next();这个生成器对象也有迭代器[Symbol.iterator]();它的迭代器就是自身；
   4. yield 中断执行： yield这个关键字就是用于中断生成器函数的，例如function * a(){ yield }；遇到yield关键字，则会保存该函数目前执行的状态；停止执行的生成器函数只能通过在生成器对象上调用 next()方法来恢复执行：yield必须直接定义在函数中，不能嵌套在非生成器函数的函数中；
   5. yield 相当于在函数中间加一个返回值，其后面的值就是生成对象next()f返回的value值；
   6. 生成器函数内部执行流程会对其生成的每个生成器对象区分作用域，每个生成器对象调用next()不会影响生成函数执行产生的其他的生成器；
   7. 生成器对象是可迭代对象；
   
***8 对象 类 面向对象编程

1. 属性的类型：es中用来一些内部特征描述属性特性， 通常不能直接访问这些特性；这些特性用[[]]括起来； 属性分为数据属性和访问属性
   1.数据属性：数据属性一般用于直接存储数据数值，值会重这里写入和读取，数据属性包括4个特性：[[Configurable]]：能否delete属性，[[Enumerable]]:能否通过forin循环属性，[[Writable]]：能否修改值，[[Value]]：包含属性实际的值； 如果要修改属性的特性，需要通过Object.defineProperty(obj, key, { 特性： boolean }); 特殊的属性特性：cofigurable该属性特性改为不可配置之后，不能再改回可配置；
   2.访问器属性：它是包含获取getter和设置setter函数；访问属性有四个特性:[[Configurable]]：能否delete属性，[[Enumerable]]:能否通过forin循环属性,[[Get]]：获取函数,[[Set]]：设置函数; 访问属性定义属性必须用Object.defineProperty(obj, key, { get() { return this._key_ }, set(newVal) { this._key_ = newVal, this.otherKey = newVal + 2 }} )定义；使用场景就是设置一个属性会导致其他属性改变；该思想是vue双向绑定数据实现的核心内涵；
2. 定义多个属性
   可以通过Object.defineProperties()定义多个属性;通过该方法定义时，此时的属性特性cofigurable等默认为false
   # Object.defineProperties(obj, {
     name: {
       value: '张三丰'
     },
     _age: {
       value: 23
     },
     age: {
       get(){
         return this._age   
       },
       set(newVal){
         this._age_ = newValue;
       }
     }
   })
3. 获取某一个属性的特性：Object.getOwnPropertyDescriptor(obj, key); 可以分别返回数据属性的特性和访问器属性的特性；包括访问器属性的set和get函数；
4. 获取所有的属性的特性：Object.getOwnPropertyDescriptors(obj);相当于每个属性调用Object.getOwnPropertyDescriptor()；返回的时一个对象{name: 属性特性对象，....}
5. 
