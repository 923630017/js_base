
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
5. 合并对象：Object.assgin(target, sources); 会将源对象的自身可枚举的属性通过get获取，然后通过目标对象taget通过set设置属性值；是浅复制；多个源对象sources有相同的属性，会使用最后一个属性的值；
6. object.is(参数1，参数2)是一个比较，类似于===比较，唯一的特殊用处：判断+0和-0的比较不等、NaN和NaN比较不等问题；
7. 可计算属性：以前写动态变量属性，必须通过obj[动态变量] =''; 现在可以直接在字面量申明时，通过let obj = {[动态变量]: '' }
8. 对象属性为方法时，可以简写;同时 简写方法名与可计算属性键相互兼容****
   #  let person = { 
       name_: '', 
       get name() { 
         return this.name_; 
       }, 
       set name(name) { 
         this.name_ = name; 
       }, 
       [sayName]() { 
         console.log(`My name is ${this.name_}`); 
       } 
      }
9. 对象解构：let { name: nameNew, age ="默认年龄" } = info;  解构相当于浅拷贝；
   解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，** 则赋值表达式必须包含在一对括号中：
   let personName, personAge; 
   let person = { 
    name: 'Matt', 
    age: 27 
   }; 
   ({name: personName, age: personAge} = person); 
   console.log(personName, personAge); // Matt, 27
10. 嵌套解构： let { like: { play } }  = obj; 如果是解构嵌套，=前面的解构和obj的对象属性，在外层属性不存在的情况下解构，会报错，例如前面的obj没有like属性或者等号前面的like不是obj属性，就会报错，如果是最里层的属性例如paly不存在，没有影响； 同时，如果解构过程中，如果例如嵌套解构外层属性没有导致报错，那么该属性之前的解构成功，之后的失败；
11. 创建对象：除了Object构造函数和字面量，但创建相同类属性的对象，需要重复编写；还有其他方式；
    1. 工厂模式:这种模式可以一下创建多个对象，但是对象都是Object,不知创建的对象类型是Person类型还是Student类型，因此不能区分对象标识
       # function creatObj(name, age) {
         let o = new Object();
         o.name = name;
         o.age = age;
         o.getInfo(){
           return this.name
         }
         return o;
       }
     2. 构造函数模式：优点： 有了对象类型标识， 特点：没有显示的创建对象，将属性和方法直接给this,没有return。使用new过程：内存中先创建一个新对象，将新对象的__proto__被赋值为构造函数的prototype，将this赋值为新对象，然后执行构造函数，给新对象添加属性，如果构造函数有非空对象，则返回该对象，否在返回创建的新对象；  构造函数也存在问题，不共用方法和属性，也就是每个实例的方法不相同，导致每创建一个，就会导致需要新的内存；
       function Person(name, age, job){ 
         this.name = name; 
         this.age = age; 
         this.job = job; 
         this.sayName = function() { 
           console.log(this.name); 
         }; 
        }
      3. 原型模式：每个构造函数都有prototype属性，是个对象，这个对象里的方法和属性都是实例共享的,实质就是原型对象共享所有实例；实例的[[Prototype]]指针是在调用构造函数时自动赋值的，之后如果重写原型对象后 Person.prototype = {}，由于实例指针指向旧的原型对象，因此无法使用新的原型对象属性。 
        1. 往往可以通过obj.__proto__ === Person.prototype判断某一个对象的原型是不是构造函数的原型属性，还是可以通过Person.protoype.isPrototypeOf(obj)判断某一个对象是否为对象的原型；
        2. 获取某个对象obj的原型对象： Object.getPrototypeOf(obj), 类似于obj.__proto__; 重写某一个实例的原型对象：不影响构造函数原型对象和其他实例原型对象
        3. Object.setPrototypeOf(obj1, 新原型对象)， 此方法只修改了obj1原型对象，没有改变其他实例的，但是此方法不适合使用， **因此可以通过Object.create(protoObj)创建对象的同时，指定新的原型对象protoObj； 
        4. 因为constructor在原型对象上，因此实例可以直接通过obj.constructor访问；
        5. 通过obj.hasOwnPropertyy(key)判断某个属性是否是自身的属性还是原型对象上的属性， 返回布尔值；
        6. in和原型： in有两种使用方法： 单独使用：('key1' in obj) //判断key1属性能否在obj下访问的，无论该属性是在实例上还是在原型上，只要可循环枚举；forin返回的是对象及其原型对象上可枚举的属性集合； Object.keys()返回的是对象自身可枚举的属性集合；如果想获取所有的实例自身属性,包括不可枚举的=>Object.getOwnPropertyNames(obj)
        7. 最好不用用contructor判断类型，通常通过instanceof判断；
        8. Object.keys(obj):返回对象自身可枚举的属性， Object.values(obj)返回的是对象自身value的集合数组， Object.entries()返回的是[[key1, value1]]集合的数组;
        9. 原型的动态性：即任何时候对原型对象修改会反映到实例上，即实例化实例之后，再在对为原型对象添加属性，实例仍然可以访问，但是如果是在实例化之后重写原型对象，那么访问重写的原型对象上的属性，是无法访问的； 原因：实例在实例化时，原型对象绑定是通过指针绑定的原型对象，如果完全重写原型对象，实例绑定的原型对象还是之前的原型对象指针，无法使用新的原型对象；
        10. 原型创建的问题： 1.弱化构造函数传参，所以实例都会获得一样的属性值；2.原型对象上的引用类型共享，如果某一个实例修改了原型对象某个引用属性，那么所有的实例都会共享；
12. 继承
    1.原型链继承：实则是将父类实例化的实例赋值给字类的原型对象；缺点： 不能给父类传递参数， 同时修改父类实例的某个引用值，会导致其他子实例共享；
      # function Parent() {
        this.name = 张三丰
      }
      Parent.prototype.sayName() {
        return this.name
      }  
      function Child(){
        this.age = 27;
      }
      // 开始继承父类原型 直接将父类实例赋值给子类原型
      Child.prototype = new Parent()
      写其他原型属性
      Child.prototype.sayAge(){
        return this.age
      }
     2：盗用构造函数继承：实际上就是在字类构造函数中通过Parent.call(this, p1,p2)调用父类构造函数;此方法可以实现子类实例化向父类构造函数传递参数，缺点就是不能继承父类原型，每次实例化时，对于父类实例化都会重新创建新的属性方法，导致内存消耗；
       function Child(p1){
        Parent(this, p1)
        this.age = 27;
      }
     3.组合继承： 构造函数和原型链继承组合：调用了两次父类; 优点是既继承了父类的原型对象，又可以往父类传参，缺点是需要实例化两次父类；
       function Child(p1){
         Parent(this, p1)
         this.age = 27;
       }
       Child.prototype = new Prent() 
     4.原型式继承： 和Object.create()功能类似; 利用函数传入一个原型对象用于继承，然后直接实例化返回实例； 适合于不需要单独创建构造函数的，也就是实例没有属性的情况，但是这种情况的原型属性如果是引用类型，则修改时也会共享； 
        # funtion object(proto){
            funtion F(){};
            F.prototype = proto;
            return new F();
          }
      5.寄生式继承： 相当于寄生于对象，添加一些属性方法，增强对象功能；就是在原型式的基础上，添加新的方法和属性; 缺点和原型式一样，原型对象属性如果是引用值，修改后会共享所有实例
         # funtion createObject(proto){
             const obj = object(proto) // 通过调用函数创建一个新对象
             obj.sayName = function(){ // 通过对对象新增方法， 以此增强对象
                .....
             }
             return obj
          }
       6.寄生式组合构造函数：寄生式继承 + 盗用构造函数继承； 既可以增强对象；往父类传参，继承父类， 同时不用实例化两次父类； 最优继承
         # funtion Child(name) {
            Parent.call(this, name); // 盗用构造函数继承 继承父类实例的属性
            this.age = 14;
         }
         # Child.prototype = Object.create(Parent.prototype) // 继承父类的原型 就不要实例化两次父类
           Child.prototype.contructor = Child; // 增强对象
 13. 类
    1. 类声明式不会像函数一样，变量提升；但是类表达式var S = Class{}时会变量提升
    2. 类的构成： 构造函数、获取函数、设置函数、静态方法、实例党方法；
    3. 类使用表达式时，let Person = class PersonName {}; 这个时候的类表达式的名称PersonName是可选的；通过name属性可以获取类表达式名称PersonName字符串，但是通过PersonName.name获取只能再类的作用域内部访问， Person.name也可以获取PersonName；
    4. 类构造函数
      1. constructor 会告诉解释器在使用 new 操作符创建类的新实例时,调用contructor这个函数，创建实例过程和构造函数创建一样； 类构造函数如果返回不是this对象，而是其他的对象时，那么这样创建的实例就不会通过 instanceof 操作符检测出跟类有关联
      2. 类构造函数和构造函数主要的区别是调用类构造函数必须使用new,而构造函数不用new时，就是以全局为this; 
      3. 
    
    
