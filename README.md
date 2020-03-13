# new
前端常见问题
#### 1.防抖和节流的简单实现   
**防抖**：触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
```JavaScript
// 实现的思路：利用定时器实现，debounce 函数返回一个函数，函数每次执行时先接触上一次的定时器，
   如果此时定时器已经执行，则没有影响，如果还未执行，就会取消上一次的执行。然后再创建一个定时器，
   在指定的延迟后执行。fn 是回调执行的函数， delay 表示指定的延迟
function debounce(fn,delay) {
  // 利用闭包，保存定时器 id
  let timeId = null
  return function(){
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn.apply(this, arguments)
    },delay)
  } 
}
```
使用场景：对于频繁触发的事件，只需要执行一次：
* 每次 resize/scroll 触发统计事件
* 文本输入的验证（连续输入文字后发送 AJAX 请求进行验证，验证一次就好）

**节流**：一个函数执行一次后，只有大于设定的执行周期后才会执行第二次。
```JavaScript
  //实现思路：每次函数执行时进行比较，看时间差是否已经大于设定的执行周期，如果不是则不执行，如果是的话，执行函数，更新上次执行时间戳。
  function throttle(fn, delay) {
    // 初始值为 0 可以确保第一次会直接执行
    let timeStart = 0
    return function() {
      let timeEnd = Date.now()
      if (timeEnd - timeStart > delay) {
        fn.apply(this, arguments)
        timeStart = timeEnd
      }      
    }
  }
```
使用场景：需要间隔一定时间触发回调来控制函数调用频率
* DOM 元素的拖拽功能实现（mousemove）
* 搜索联想（keyup）
* 计算鼠标移动的距离（mousemove）
* Canvas 模拟画板功能（mousemove）
* 射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
* 监听滚动事件判断是否到页面底部自动加载更多：给 scroll 加了 debounce 后，只有用户停止滚动后，才会判断是否到了页面底部；如果是 throttle 的话，只要页面滚动就会间隔一段时间判断一次    

:smile:

#### 2.Set、Map、WeakSet 和 WeakMap 的区别？
具体的介绍见链接：http://es6.ruanyifeng.com/#docs/set-map
##### Set
   ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
   `Set`本身是一个构造函数，用来生成 Set 数据结构
   Set 可以实现数组去重
   ```JavaScript
   let arr = [3, 5, 2, 2, 5, 5];
   let unique = [...new Set(arr)];
   // [3, 5, 2]
   ```
##### WeakSet
   WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
   首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
   其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
   因此 ES6 规定 WeakSet 不可遍历。
##### Map
   JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
   为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
   
##### WeakMap
   WeakMap结构与Map结构类似，也是用于生成键值对的集合。
   WeakMap与Map的区别有两点。
   首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
   其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。
