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
