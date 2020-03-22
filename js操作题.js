// 1 深度优先遍历和广度优先遍历（以dom树为例）
function dfs(node, nodeList = []) {
  if(node !== null) {
    nodeList.push(node)
    const childs = node.children
    for(let i=0;i<childs.length;i++) {
      dfs(childs[i],nodeList)
    }
  }
  return nodeList
}
// 借助队列 queue 实现(先进先出)
function bfs(node) {
  let nodeList = []
  let queue = []
  if(node) {
    queue.push(node)
    while(queue.length) {
      const item = queue.shift()
      const childs = item.children
      nodeList.push(item)
      for(let i=0;i<childs.length;i++) {
        queue.push(childs[i])
      }
    }
  }
  return nodeList
}

// 2.请分别用深度优先思想和广度优先思想实现一个拷贝函数
/* 深拷贝和浅拷贝是针对复杂数据类型来说的，浅拷贝只拷贝一层，而深拷贝是层层拷贝。
  浅拷贝：
      浅拷贝是会将对象的每个属性进行依次复制，但是当对象的属性值是引用类型时，实质复制的是其引用，当引用指向的值改变时也会跟着变化。
  深拷贝：
      深拷贝复制变量值，对于非基本类型的变量，则递归至基本类型变量后，再复制。深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。
  深拷贝的实现：
      1.深拷贝最简单的实现是: JSON.parse(JSON.stringify(obj))
      问题：  1.对象的属性值是函数时，无法拷贝。
             2.原型链上的属性无法拷贝
             3.不能正确的处理 Date 类型的数据
             4.不能处理 RegExp
             5.会忽略 symbol
             6.会忽略 undefined
      2.实现一个深拷贝函数的思路：
            1.如果是基本数据类型，直接返回
            2.如果是 RegExp 或者 Date 类型，返回对应类型
            3.如果是复杂数据类型，递归。
            4.考虑循环引用的问题
*/
function dfsDeepclone(obj,hash = new WeakMap) {
  // 如果是基本类型，直接返回
  if(obj !== null && typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  // 处理循环引用
  if(hash.has(obj)) {
    return hash.get(obj)
  }
  let newObj = new obj.constructor()
  hash.set(obj, newObj)
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      newObj[key] = dfsDeepclone(obj[key])
    }
  }
  return newObj
}
// TODO 待实现
function bfsDeepclone(obj, hash = new WeakMap){
  let queue = []
  let obj2 = {}
  queue.push(obj)
  while(queue.length) {
    let item = queue.shift()
      // 如果是基本类型，直接返回
    if(item !== null && typeof item !== 'object') {
      return item
    }
    if (item instanceof RegExp) return new RegExp(item)
    if (item instanceof Date) return new Date(item)
    // 处理循环引用
    if(hash.has(item)) {
      return hash.get(item)
    }
    let newObj = new item.constructor()
    hash.set(item, newObj)
    for(let key in item) {
      if(item[key] !== null && item[key] !== 'object') {
        newObj[key] = item[key]
      } else {
        queue.push(item[key])
      }
    }
  }
}

/* 3. 已知如下数组：
      var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
      编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
*/
const fn = (arr) => {
  return [...new Set(arr.flat(Infinity))].sort((a,b) => a-b)
}

/* 4. 情人节福利题，如何实现一个 new
    new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
      1.创建一个空的简单JavaScript对象（即{}）；
      2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
      3.将步骤1新创建的对象作为this的上下文 ；
      4.如果该函数没有返回对象，则返回this。
*/
const _new = () => {
  let instance = {}
  const [constructor, ...args] = [...arguments]
  instance.__proto__ = constructor.prototype
  const result = constructor.apply(instance, args)
  if ( result !== null && (typeof result === 'object' || typeof result === 'function')) {
    return result
  }
  return instance
}
// 更简单的一个实现
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}

//  5. 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D'].map(item => item + 3)
const arr3 = [...arr1,...arr2].sort().map(item => {
  if(item.includes('3')) {
    return item.split('')[0]
  }
  return item
})

// 6.下面的代码打印什么内容，为什么？
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
// 打印结果： 在非匿名自执行函数中，函数变量为只读状态无法修改
/*ƒ b() {
b = 20;
console.log(b)
}*/

// 7.使用迭代的方式实现 flatten 函数。
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]
// 方式一
function flatten(arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
// 方式二
function flatten(arr) {
  return arr.reduce((acc,cur) => {
    if(Array.isArray(cur)) {
      acc.concat(flatten(cur))
    } else {
      acc.concat(cur)
    }
  }, [])
}


/* 8 a 怎样取值，使 a == 1 && a == 2 && a == 3 为真
    考察的使对象的类型转换，对象的 ToPrimitive 转换的规则如下：
      1 obj[Symbol.toPrimitive](hint) , hint 值为 'string', 'number', 'default'，表示期望得到的基本类型 。函数返回一个基本类型的值；
      2 如果函数不存在，hint 值为 'string' , 会先调用 obj.toSting() 方法，如果返回的不是基本类型值，继续尝试调用 obj.valueOf() 方法；
      3 如果函数不存在，hint 值不是 'string' ，会先调用 obj.valueOf() 方法，如果返回的不是基本类型值，继续尝试调用 obj.toSting() 方法；
      如果返回的都不是基本类型，会报错:  Uncaught TypeError: Cannot convert object to primitive value
    当我们创建一个普通对象时（{} 或 new Object() 的方式等），对象上是不具备 [Symbol.toPrimitive] （方法）属性的。
    默认情况下，一个普通的对象 toString() 方法返回 "[object Object]"；
    valueOf() 方法返回对象本身。（会被忽略掉）
    数组默认的 toString()  方法经过了重新定义，将所有单元字符串化以后再用 ',' 连接起来。

*/
// 方式一
let a = {
  i: 1,
  toString () {
    return a.i++
  }
}
// 方式二
let a = {
  i: 1,
  valueOf () {
    return a.i++
  }
}
// 方式三
let a = {[Symbol.toPrimitive]: ((i) => () => ++i) (0)};
//方式四，利用数组默认的 toString 方法
var a = [1,2,3];
a.join = a.shift;
