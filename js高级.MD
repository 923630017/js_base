git合并分支
  1. 先将dev先push到远程，
  2. 然后git checkout master分支， 最后pull一下master,不管个人开发还是集体开发，
  3. 然后把dev分支的代码合并到master上, 执行git merge dev
  4. 查看状态 git status, 最后 git push origin master， push到远程厂库
  
  
  
**** js高级程序设计
 
1.script: async 和defer 都是异步加载，不阻止js下载 等文档渲染完在进行加载 async执行js文件可能顺序不同

**2. 语言基础

1.Number 转化null为0；undefined，返回 NaN。parseInt则都为NaN; 空字符串Number会转化0，parseInt则会转化为NaN,目前默认转化为数字类型都是Number()

2.字符串的转义序列表，例如\u03a3 这种只能算一个字符，因此长度为1， toString()方法转化为字符传， String()也是，undfined和null只有用String()方法

3.Object 类型：
      1.contructor: 指向创建对象的构造函数， 
      2.hasOwnProperty(propertyName): 判断对象是否有某个属性， 不包括对象原型链， 
      3. isPropertyOf(object) 当前一个对象是否是个对象的原型，
      4.propertyIsEnumerable(propertyName): 某个属性是否可以通过forin循环变量枚举，
      5.toString()转化为字符串， valueOf()转化为布尔，字符，数字
  
4.操作符
     对象进行一般操作符操作时，通常调用valueOf()和/或 toString()方法来取得可以计算的值
     1.一元操作符：递增/递减操作符： 对象先valueOf()，不行再toString(),
     2. 除法操作符: 0/任何数都是NaN， 同时注意：除了加法操作符，减乘除操作符都会转化为Number
     3. 加法操作符: 对象会通过toString()转化字符串类型，而toString()是各种引用值自身的toString()方法
     4. 关系操作符：比较关系大小等， 对象先用valueof(),如果没有该方法，则使用toString()方法， 任何值和NaN比较大小，都会返回false; 
     5. 逗号操作符，赋值过程中，将一个变量赋值给一个表达式，用逗号分开值，会返回表达式最后一个值。例如：let a = (2,4,5,6,0)。这里会将0赋值给a;
   
5.语句
      1. for循环：先初始值判断，如果不通过，直接退出循环，如果通过则先处理逻辑，然后在i++，当不通过再退出循环，
      2. for in 用于遍历对象的可枚举的属性，包括对象object和数字arr等, 但是数组枚举的属性index是字符串类型数组，不是Nuber类型； 同时他会遍历原型上可枚举的属性，因此可以加hasOwnPropetry判断是否是对象实例属性。
      3. for of 适用遍历数/数组对象/字符串/map/set等拥有迭代器对象（iterator）的集合，但是不能遍历对象Object，因为没有迭代器对象
      4. with(state){ conslose.log(name) }: with语句,相当于将代码作用域设置为特定的对象state, 在其代码块内部{}，获取变量值时，首先会获取内部是否有某个变量值name,如果没有就将会从state中获取是否有属性name，
 
 ***4.变量。作用域与内存
1. 值类型： 原始值和引用值， 原始值的复制会产生新的数据，而引用值则是复制引用的地址，共享堆内存的数据；
    1. 传递参数: 函数的参数都是按值传递参数，引用类型值跟引用值的复制一样
    2. 确定类型：(1)typeof: 确定简单数据类型，(2) instanceof: 判断对象类型。 根据原型链原型对象判断，所有的原始值检查都会返回false
 
2. 执行上下文和作用域
   1.执行上下文决定函数和变量可以访问哪些数据，这个上下文有个关联对象（存在后台，代码访问不到），这个对象上存在这个上下文中的所有变量和函数。
   2.全局上下文在浏览器默认指向window,var定义的变量和方法会默认到window属性上，函数执行上下文在执行函数时，会被推到栈中，执行完毕再弹出函数执行上下文； 
   
 

      
