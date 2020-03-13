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
