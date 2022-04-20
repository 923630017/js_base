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
   3.当变量没有在当前作用域中找到时，会自动往父作用域找，这句话也存在不严谨,找变量需要根据js静态作用域，到创建的作用域上找，而不是调用的作用域；
   4.作用域与执行上下文： js属性解释性语言，分为解释和执行两个阶段。 解释阶段：词法分析、语法分析、作用域规则确定；执行阶段： 创建执行上下文、执行函数代码、垃圾回收。执行上下文在运行时确定（this指向问题），随时可能改变；作用域在定义时就确定，并且不会改变。一个作用域下可能包含若干个上下文环境。有可能从来没有过上下文环境（函数从来就没有被调用过）；有可能有过，现在函数被调用完毕后，上下文环境被销毁了；有可能同时存在一个或多个（闭包）。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。

3. 变量声明：
   const定义的变量必须有初始值，引用值得键值可以修改，如果不想对象键值也不可修改，可以用Object.freeze(obj);
4. 垃圾回收
   垃圾回收是就是那些以某种方式可访问或者说可用的值，它们被保证存储在内存中，反之不可访问则需回收
   1. 标记清除策略：分为标记和清除两个阶段，清除阶段需要把没有标记的删除销毁，标记的方法多种多样，策略最重要，标记方法不重要，过程为：给每个对象做标记，假设内存中每个对象都是垃圾，全标记为0；然后从每个对象开始遍历，对还需要的对象标记为1；清除所有标记为0的垃圾，销毁内存；最后将内存中所有标记对象再次标为0，进行下一轮垃圾回收。该策略简单只需要简单，就标记和不打标记，缺点就是清除之后，之前标记清除的对象变量内存位置空着，之后新建的对象分配内存中的话，需要到之前清除垃圾的内存间隙中穿插进去。
   2. 引用计数算法：它把 对象是否不再需要 简化定义为 对象有没有其他对象引用到它，如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。策略： 一个引用对象被引用一次加一， 当该变量的值被其他的值覆盖，则减1， 直到0就回收清除。优点： 简单清晰，当引用对象的引用为0时，自动清除，不需要定时清除。缺点：需要计数器进行计算引用值引用的次数，需要内存存储计数器；同时会出现无法解决循环引用无法回收；
   3. v8垃圾回收基于标记清除算法.V8 中对垃圾回收机制:V8 的垃圾回收策略主要基于分代式垃圾回收机制，V8 中将堆内存分为新生代和老生代两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收, 一些小新短的引用对象，则放到新生代内存区域， 另外大老旧的引用对象则放在旧生代区域。 新生代内存区域分为两部分内存，一半内存为使用区，一半为空闲区内存，当使用区内存快满时，则需要标记活动对象，将活动对象复制按顺序排放到空闲区，同时将非活动对象进行清除，至此新生代内存的两个内存互换，之前的使用区成空闲区；同时对于使用时间较长和内存较大的活动对象直接放到老生代内存中。老生代内存就是定期进行标记清除法，从根元素递归开始标记能达到的活动对象，没有标记的就是非活动对象，进行清除，然后由于标记清除有内存间隙，因此需要进行整理排序，将存在的活动对象按一定顺序排序。 分老生代和新生代内存区域目的是为了进行优化清除策略，对于老生代内存的变量需要频率低一些，对新生代则需要频率高一些。并行回收：垃圾回收过程会阻止js运行，因为js是单线程，会阻碍js运行，因此垃圾回收进行多线程方式，并行处理垃圾回收，以此缩短时间，此种方法是适合用于新生代用户。并行回收不适合老生代，因为老生代存在较大的对象，消耗时间；

**5 基本引用类型：基本引用类型是通过new 构造函数出的实例对象

 1.Date
   1.new Date()传入毫秒，如果传入的是字符串日期，默认会通过Date.parse()转化，如果不能转化则返回NaN; Date.parse():参数方式：1.月/日/年 10/23/2006;2: 月名 日,年 May 2,2004; 3：周几 月名 日 年 时:分:秒 时区，如Tue May 23 2019 00:00:00 GMT-0700； 4： YYYY-MM-DDTHH:mm:ss格式 2009-02-21T03:44:43； 举例：new Date(Date.parse('3/12/2006'))；Date.UTC()也是返回时间毫秒，参数依次为年月日时分秒毫秒，其中年月必传，其他默认日是1，其他都是0；除了日从1-31开始，其他都是从0开始； 例如Date.UTC(2000, 0, 1,17,55,55)：// GMT 时间 2000 年 1 月 1 日下午 5 点 55 分 55 秒。Date.UTC()也可以被new Date()默认调用，例如： new Date(2000, 0) === 2000 年 1 月 1 日零点。Date now()返回当前时间毫秒数。 valueOf()用于返回时间的毫秒数，日期用于比较操作符时就会调用此方法；
   2. Date方法： getTime()获取毫秒数，和valueOf()一样；setTime(毫秒数) 设置时间；getFullYear()获取4位年份，setFullYear(year) 设置年份，此时其他时间单位依然会进行改变；其他的日期方法类似，日：getDate()1-31日；周几：getDay() 0表示周末，6表示周六；getMilliseconds()返回毫秒；

2.正则RegExp
   1.let expression = /pattern/flags;pattern为匹配模式即规则，flags为匹配的标记即方式；常用的匹配标记有：1.g全局匹配模式，2.i不区分大小写，3.多行模式，找到文本末尾继续找查; 匹配有元字符即各种特特殊符号时，需要z在元字符之前加反斜杆转义： 例如匹配[ab]cd字符串：则需要/\[ab\]cd/g。 正则可以用构造函数： new RegExp('匹配规则'， '匹配模式例如全局g')，通过构造函数时，元字符需要两次转义， 例如匹配[ab]cd字符串， 则需要new RegExp('\\[ab\\]cd', 'g'),这里使用构造函数相比字面量形式需要两次转义；
   2. 实例方法：p.exec(text): 找到了匹配项，则返回包含第一个匹配信息的数组，数字中index属性是匹配到的位置起始点，intput则指向的text；没用匹配则返回null；如果标记的是全局g匹配模式，第一次匹配index返回的是只有返回第一个匹配的位置，第二次匹配index返回的是第二个的匹配位置,例如：
      let text = "cat, bat, sat, fat"; 
      let pattern = /.at/g; 
      第一次匹配全局
      let matches = pattern.exec(text);
      console.log(matches.index); // 0
      第二次匹配全局
      matches = pattern.exec(text); 
      console.log(matches.index); // 5
      第三次匹配全局
      matches = pattern.exec(text); 
      console.log(matches.index); // 10
   test方法：此方法用于判断字符串是否匹配到；
3.原始包装类：Boolean、Number 和 String。
  1. Number: toFix(n)返回n位小数的字符串数字；toExponential(n):返回n位小数的科学计数法；Number.isInteger(number) 是不是整数
  2. String: 主要方法： 
     1.length 字符串长度
     2.charAt(index) 返回字符串对应索引的字符 如果超出长度 则返回空
     3.concat(): 返回多个字符串拼接 不改变原字符串
     4.slice(n,m): 截取字符串的方法；从索引n开始，到索引m之前的；不改变原字符串，不给参数是默认复制字符串；该方法如果传负数：直接n+字符串length， m+字服串length; 如果两者加了都还是负数，则返回空字符串；如果加了n还是负数，m是正整数，则n就直接忽略为0；
     5.substring(n,m): 截取字符串索引n开始，到索引m之前的字符；不改变原字符串，不给参数是默认复制字符串；传负数时；直接将n或者m转为0；
     6.substr(n,m); 截取从索引n开始的，m个字符串；不改变原字符串，不给参数是默认复制字符串； 如果n为负数，则直接加字符串长度，如果m为负数，则m直接为0；
     7.indexOf(str, n):返回字符串从左边n索引开始寻找str字符，如果找到则返回index，如果找不到就返回-1；
     8.lastIndexOf(str, n)：从字符串索引n开始，从右往左开始搜索后返回的index;
     9.startsWith(str, n): 从索引n开始匹配是否包含字符串str；返回boolean;这里必须从一开始就匹配；例如：'abcdef'.startsWith('a') => true; 'abcdef'.startsWith('b') => false;
     10.endsWith(str, n): 从字符串最后面往前第n个字段开始往前匹配，必须第一次匹配上才返回true,和startsWith一致；
     11.includes(str, n): 从字符串n索引开始，只有包含str就会返回true;
     12.trim()：返回清除字符串左右空格： 不影响源字符串
     13.repeat(num): 返回复制字符串nun遍；1则返回字符串本身，0返回空字符；不影响原字符串
     14.字符迭代： 字符串的原型上暴露了一个@@iterator 方法，表示可以迭代字符串的每个字符；let stringIter = str[Symbol.interator]()，这就是一个迭代器，stringIter.next()。正是因为有迭代器；所以字符串才能使用for of进行访问每个字符，才能使用字符串解构[...str]
     15.字符串大小写：toLocalUpperCase()/toUpperCase(),这是转为大写，toLoacalLowerCase()/toLowerCase()转化为小写，toLocalUpperCase()、toLoacalLowerCase()用于特殊少数语言中的大小写转化，因此最好用这两者进行大小写转换；
     16.match(regExp): 接收一个正则规则，和正则的exec()方法一致，返回一个数组，包括匹配的index索引和input属性为匹配的字符串；
     17.search(regExp):接收一个正则，返回第一匹配正则的位置索引，如果没用则返回-1；
     18.replace(regExp/string, string|function): 第一个参数为正则或者字符串，第二个为需要提成的字符串；用正则可以方便的替换全部str.replace(/aa/g, 'bb'):str字符串中，替换所有的'aa'字符串为'bb'；第二个参数为函数时，可以也可以替换，目前我认为需要用函数作为参数是当替换多种字符，比如遇到'a'需要替换成'A','b'需要替换成'B'这种，
<!--      'abcd'.replace(/[ab]/g,function(match, index, text) => {
         // 这里遇到a或者b都要替换
         // match 匹配的字符 a 或者b
         // index 匹配时的索引index 分别为0 1
         // 匹配的整个字符串 abcd
         //这个函数返回值为匹配的字段
         if(match == 'a') return 'A'
         if(match === 'b') return 'B'
      }) -->
     19.split(string|regExp, num): 返回将字符串转化为数组, string|regExp：分隔符，如果最后一个满足分隔符，则数组最后一项为空字符串; num为返回的数组不能超过的长度

  3.Global对象：不能显示访问，
    1.encodeURI()和 encodeURIComponent()方法对用于编码统一资源标识符（URI），以便传给浏览器。有效的URI不能包含某些字符，比如空格，encodeURI()着眼于整个url,encodeURIComponent()主要是部分url,前者不能编码一些特殊符号，例如冒号、问号等，而后者就可以编译，后者一般用于编译请求参数；
    2.decodeURI()和 decodeURIComponent()对编过码的进行解码；
    3.eval(js代码片段)方法 相当于js执行器；该执行的代码属于调用所在的上下文；因此在eval()执行器里可以调用上下文的变量函数，同样外部亦如此；
    4.window一般默认为浏览器的Global对象的代理。
    5.Math: ceil()向上取整；floor()向下取整；round()四舍五入；fround()方法返回数值最接近的单精度（32 位）浮点值表示。console.log(Math.fround(25.9)); // 25.899999618530273 random():随机，包括0不包括1；Math.floor(Math.Random() * (max-min+1) + min)
    
**6 集合引用类型

1.object:属性名key可以是字符串或数值
2.数组array: 
  1. Array.from()：将类数组转化为数组；只要是可迭代的，就可以化为数组；这个方法还可以实现数组的浅复制；第2个参数是一个有返回值得函数，函数得参数是数组得每项，类似于实现 Array.from().map()
  2. Array.of():将其参数转化为数组；
  3. 检测数组：1:arr instantceof Array 2: Array.isArray(arr);
  4. 数组的迭代器方法：keys():将返回数组索引的迭代器；values()返回数组每项值得迭代器；entries()返回索引和值得迭代器；这些因为是迭代器，因此可以通过Array.from()转化为数组；同时也可以通过[...interator]扩展运算转化为数组； 
  5. toString()返回每项字符由逗号拼接的字符串；valueOf()则返回数组本身；
  6. join(分隔符)：将数组由分隔符拼接的字符串；
  7. push() 推入数据 返回数组长度；
  8. pop() 删除最后一下项 返回数组最后一项；
  9. shift(item)第一项添加 返回数组长度；
  10. unshift()删除数组第一项 返回第一项元素；
  11. reverse() 反向排列数组 会修改数组；
  12. sort() 默认按ascall排序；sort((a,b) => a-b);如果第一参数a排在第二个参数b前面，则返回负数，反之则返回正数； 此方法会修改原数组
  13. concat(‘3’，[323,3,32])数字拼接，返回拼接数组；原数组不变；如果参数是一层数组，默认会打平拼接到数组中,如果不想打平参数数组，则设置参数数组的[Symbol.isConcatSpreadable]为false;
  14. slice(start, end): 获取从索引start 开始到end之前，不包括end;r如果为负数则加上数组长度;如果start大于end；则返回空数组；
  15. splice(index, num, item1, item2.....); //删除索引 删除个数 替换的元素； 返回删除元素组成的数组，没有删除元素时返回空数组；
  16. includes()判断包含元素 indexOf()lastIndexOf()也是；没有返回-1；
  17. find() 返回满足条件的第一个元素没有返回undefined； findIndex()返回第一个满足条件元素的索引,没有返回-1；
  18. every() some() filter() foreach() map() 循环数组 不改变原数组
  19. reduce((pre, cur, index) => { return xxx }, init); 这个方法适合数组归并一些值，如果有init初始值，则循环arr.length次；没有init时，pre初始值是数组第一项，cur是数组第二项，此时只循环数组length-1次；

3.map: map是可迭代的，存储键值对的结构， new Map() 键值可以微任意类型值；
  1: 如果初始化：传参数必须是二维数组,new Map([['key1','val1']]); 且二维数组里每一项数组的第一个为key,第二个为value,之后的自动忽略；
  2. 设置：map.set(key, value); 获取查询：map.get(ket) map.has(key)返回boolean 删除某一个：map.delete(key) 删除所有：map.clear() 获取键值对数量：map.size
  3. map.get(key) 中的key为绝对相等的获取，即对象的引用必须是同一个， 如果不是则不能获取
  4. map的迭代器：map提供一个迭代器，以便map按顺序插入key,value;通过map.entries()获取map迭代器，是迭代器自然可以通过forof循环，同时可以通过[...map.entries()]和Arrary.from()转化为数组；同时有map.keys()和map.value()迭代器； 除了通过迭代器map.entries() forof遍历还可以通过map.forEach((value, key) => {})遍历；
  5. map遍历forof时，oldkey在修改newKey， 但是map.get(key)获取还是通过之前的旧值oldkey获取; 
