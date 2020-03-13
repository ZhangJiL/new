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
