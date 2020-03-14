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


















