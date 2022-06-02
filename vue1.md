1. v-once: 只让该值在插入的dom上不更新，渲染初始值；
2. 可以用动态参数加到属性 例如<p :[name]="name">动态参数</p>
3. computed: 计算属性是基于它们的响应式依赖进行缓存的,只有相关的依赖变化了，才能进行重新进行求值；这就意味着只要 依赖变量 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行。计算属性默认只有getter，但是同样也可以设置setter
   # computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
    进行设置：vm.fullName = 'John Doe'
4. computed和watch的区别
    1. computed是计算属性；watch是监听，监听data中的数据变化。
    2. computed支持缓存，当其依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值；watch不支持缓存，当对应属性发生变化的时候，响应执行。
    3. computed不支持异步，有异步操作时无法监听数据变化；watch支持异步操作。
    4. computed第一次加载时就监听；watch默认第一次加载时不监听。
5. 动态class
    1. 对象语法： <p :class={active: isActive}></p>
    2. 数组语法： <p :class="[isActive ? 'active' : '', otherClassData]"></p>
    3. 对于使用组件时，class添加会自动添加到组件的根元素上；
6. 条件渲染： 
    1. v-if 在使用时，如果切换，如果元素相同，那么就不会重新渲染的相同元素，如果避免相互影响，则可以给元素加一个key区分 patch算法；当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级
     #<template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
      </template>
     2. v-show 不支持 <template>
7. v-for: 循环；可以在 <template> 上使用 v-for；
8. 事件函数：<button @click="a($event, 其他参数)">点击</button>； 其中$event就可以访问原始的 DOM 事件；$event可以在随意哪个参数位置，但是必须写成$event；
9. v-model 
      装饰符：1.lazy:让input更改不用input事件实时更新，而是change事件失焦或着enter再更改；2. trim修饰符 去掉input框的字段两边的空
      2. v-model自定义组件使用 可以直接通过子组件中通过$emit实现父组件传props修改，避免了父组件通过接收函数修改
        // 子组件
        <input :value="currentValue" @change="changeValue" /> 
        props: {
          valueProp: "默认值"
        }
        data() {
          currentValue: '张三丰',
        }
        model: {
          prop: "这里定义需要双向绑定的props字段 比如这里的valueProp"
          event: "change 这里定义prop需要双向绑定的字段 当需要更新通知的函数名 this.$emit(名称，value)"
        },
        methods: {
          changeValue(e) {
            this.currentValue = e.target.value;
            // this.$emit的第一个参数函数名称就是model中的event字段的值
            this.$emit('change', this.currentValue)
          }
        } 
        // 父组件
        <Son v-model="value"> // value就是需要双向绑定的值
         model: 默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是有些情况下，value需要用于其他地方，
         因此可以用model定义解决
10. 组件
     1. 组件data是一个函数， 因为每个组件需要维护一份独立的data，函数可以确保vue每个实例可以维护一份被返回对象的独立的拷贝，如果是对象，则所有的组件数据都不能独立，而是共享；
     2: 子组件传值： props: 数组形式 ['props1','props2'], 对象形式： { props1: { type: String, defalut: '' }  }
