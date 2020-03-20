#### 1. ES5/ES6 的类的实现除了写法以外还有什么区别？   
[参考链接](https://es6.ruanyifeng.com/#docs/class)  

1.类不存在变量提升（hoist），这一点与 ES5 完全不同，类似于 `let`、`const` 声明变量。   
2.`class` 声明内部会启用严格模式。   
3.`class` 的所有方法（包括静态方法和实例方法）都是不可枚举的。   
4.`class` 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有`[[construct]]`，不能使用 `new`来调用。   
5.必须使用 `new` 调用 `class`。   
6.`class` 内部无法重写类名。   
##### 在继承实现上的区别   
ES5 的继承，实质是先创造子类的实例对象`this`，然后再将父类的方法添加到`this`上面（`Parent.apply(this)`）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到`this`上面（所以必须先调用`super`方法），然后再用子类的构造函数修改`this`。   

#### 2. 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣    
`Object.prototype.toString.call()`: 万金油的方法，对所有的数据类型都可以使用。如果 toString 方法没有重写的话，会返回`[Object type]`，其中 type 为对象的类型。   

`instanceof`: A `instanceof` B,原理是判断 `B.prototype` 是否在 A 的原型链上，找到返回 true，否则返回 false。但 `instanceof` 只能用来判断对象类型，原始类型不可以。并且所有对象类型 `instanceof` Object 都是 true。

`Array.isArray()`: 当检测 Array 实例时，`Array.isArray` 优于 `instanceof` ，因为 `Array.isArray` 可以检测出 `iframes`，`Array.isArray()`是ES5新增的方法，当不存在 `Array.isArray()` ，可以用 `Object.prototype.toString.call()` 实现。   

#### 3. 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化
