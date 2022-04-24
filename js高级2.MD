
***7.迭代器

1.自定义迭代器 一般自定义迭代器需要闭包，因为新的迭代运算开始，需要新的迭代器新计数，例如
 # js 
  class Counter
   {
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
2：提前终止迭代器，可以通过在迭代器工厂函数里加一个return函数，返回有效的IteratorResult 对象 即{done: true}; 这种设置设置提前关闭迭代的方法，如果在forof中运用,有判断条件，则可以通过break continue return throw提前退出；通过解构也会根据解构的个数提前关闭迭代；
    
