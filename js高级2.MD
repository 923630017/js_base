
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
   3. 生成器对象是通过调用生成器函数产生的；这个对象和迭代器类似，一开始暂停状态，然后通过next()方法才能恢复执行状态；function* generatorFn() {}；const g = generatorFn(); g.next();
