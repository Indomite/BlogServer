/*
Navicat MySQL Data Transfer

Source Server         : 116.62.201.32
Source Server Version : 80026
Source Host           : 116.62.201.32:3306
Source Database       : indomite

Target Server Type    : MYSQL
Target Server Version : 80026
File Encoding         : 65001

Date: 2022-02-28 15:52:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL DEFAULT '0' COMMENT '文章对应的用户id',
  `tag_id` int NOT NULL DEFAULT '0' COMMENT '文章对应的标签id',
  `headline` varchar(255) NOT NULL DEFAULT '' COMMENT '文章标题',
  `outline` varchar(255) DEFAULT NULL COMMENT '文章副标题',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `cover_url` varchar(255) DEFAULT NULL COMMENT '文章封面图片',
  `content` text NOT NULL COMMENT '文章内容',
  `like_times` int NOT NULL DEFAULT '0' COMMENT '点赞次数',
  `look_times` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` varchar(255) NOT NULL DEFAULT '1' COMMENT '1：未锁定，0：锁定',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('20', '12', '1', '什么是跨域？解决跨域的方法', '', '2021-03-02 23:01:54', null, null, '<h1>什么是跨域？解决跨域的方法</h1><p><br></p><h2>跨域问题的出现</h2><p><br></p><p><span style=\"color: rgb(0, 0, 0);\">由于浏览器出于安全考虑的同源策略限制需要跨域，所谓的同源就是两个域需要相同的 协议（protocol）、域名（host）、端口(port)必须相同</span></p><h4><span style=\"color: rgb(0, 0, 0);\">三者之前任何一个不同都构成跨域的情况，比如说前后端分离之后，前后都在两个域之下，前端的浏览器请求后端服务器的数据的时候就需要做跨域处理</span></h4><p><br></p><h2>非同源的限制</h2><p><br></p><ol><li><span style=\"color: rgb(0, 0, 0);\">无法读取非同源网页的 Cooike、LocalStorage、IndexedDB</span></li><li><span style=\"color: rgb(0, 0, 0);\">无法接触非同源网页的DOM</span></li><li><span style=\"color: rgb(0, 0, 0);\">无法向非同源地址发送AJAX请求</span></li></ol><p><br></p><h4>原生解决跨域</h4><pre class=\"ql-syntax\" spellcheck=\"false\">&lt;script src=\"http://test.com/data.php?callback=dosomething\"&gt;&lt;/script&gt;\n&lt;script type=\"text/javascript\"&gt;\n    function dosomething(res){\n        // 处理获得的数据\n        console.log(res.data)\n    }\n&lt;/script&gt;\n</pre><h4><br></h4><h4>Vue解决跨域</h4><pre class=\"ql-syntax\" spellcheck=\"false\">this.$http.jsonp(\'http://www.domain2.com:8080/login\', {\n    params: {},\n    jsonp: \'handleCallback\'\n}).then((res) =&gt; {\n    console.log(res); \n})\n</pre><h1><br></h1>', '0', '0', '1');
INSERT INTO `article` VALUES ('22', '12', '1', 'vue-变化侦测', '', '2021-09-01 09:47:10', null, null, '<h3>前言</h3><p>变化侦测：追踪状态，或者说当数据发生了变化的时候察觉到变化</p><ul><li>在Angular中，通过脏值检查来实现变化监测</li><li>在React中，通过对比Virtual DOM来实现变化侦测</li><li>在Vue中，也存在一套机制实现变化监测</li></ul><p>我们知道，Vue最大的特点就是数据驱动视图，当数据（状态）也就是state发生变化之后，所对应的视图也就是UI相应的改变</p><p><strong>UI = render（state）</strong></p><p>当state（输入）发生变化的时候，UI（输出）也对应的发生变化，但这都是用户定义的，其中公式的规则是不变的，也就是render是不变的，而Vue也就是充当了这个render的角色</p><p>接下来，有一些问题？</p><p><strong>为什么会有Object和Array两种变化监测？</strong></p><p>这是因为对于<code style=\"background-color: rgb(243, 244, 244);\">Object</code>数据我们使用的是<code style=\"background-color: rgb(243, 244, 244);\">JS</code>提供的对象原型上的方法<code style=\"background-color: rgb(243, 244, 244);\">Object.defineProperty</code>，而这个方法是对象原型上的，所以<code style=\"background-color: rgb(243, 244, 244);\">Array</code>无法使用这个方法，所以我们需要对<code style=\"background-color: rgb(243, 244, 244);\">Array</code>型数据设计一套另外的变化侦测机制。</p><h3>Object的变化监测</h3><h4>Object.defineProperty</h4><p>对象定义属性。数据绑定，数据劫持</p><p><a href=\"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 131, 196);\">https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty</a></p><p>Object.defineProperty() 方法直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，返回此对象。</p><p>说白了就是，给对象增加、修改属性的一个方法，</p><p><code style=\"background-color: rgb(243, 244, 244);\">Object.defineProperty(obj, prop, descriptor)</code></p><pre class=\"ql-syntax\" spellcheck=\"false\">let car = {}\nlet val = 3000\n//默认 不可修改 不可重写 不可枚举\nObject.defineProperty(car, \'price\', {\n&nbsp;enumerable: true,\n&nbsp;configurable: true,\n&nbsp;get(){\n&nbsp;&nbsp;console.log(\'price属性被读取了\')\n&nbsp;&nbsp;return val\n },\n&nbsp;set(newVal){\n&nbsp;&nbsp;console.log(\'price属性被修改了\')\n&nbsp;&nbsp;val = newVal\n }\n})\n</pre><p><strong>Vue怎么知道state发生了改变？</strong></p><p>通过getter和setter对数据进行监测，当数据发生改变的时候，触发 get() 和 set() </p><p><strong>源码：src/core/observer/index.js</strong></p><ol><li>Observer类通过递归的方式把一个对象的所有属性都转化成可观测对象</li><li>并且给value新增一个__ob__属性，值为该value的 Observer 实例。这个操作相当于为 value 打上标记，表示它已经被转化成响应式了，避免重复操作</li><li>然后判断数据的类型，只有 object 类型的数据才会调用walk将每一个属性转换成 getter/setter 的形式来侦测变化。 </li><li>最后，在 defineReactive 中当传入的属性值还是一个 object 时使用 new observer（val）来递归子属性，这样我们就可以把 obj 中的所有属性（包括子属性）都转换成 getter/seter 的形式来侦测变化。 </li></ol><h4>依赖收集</h4><p>数据变化监测的目的已经达到了，那么，接下来一个问题</p><p><strong>当数据发生变化的时候，到底通知谁发生变化呢？</strong></p><p>当数据发生变化的时候，不可能说全部都重新渲染吧，谁使用了那么久更新谁，所以问题就变成了</p><p><strong>怎么知道到底是谁使用了当前有变化的数据呢？</strong></p><p>给每个数据都创建一个依赖数组，也就是说当一个UI依赖了当前的数据的时候就把当前的数据放到依赖数组中去，当数据发生变化的时候，通知对应的依赖数组。——这个过程就是<strong>依赖收集</strong></p><p>可观测的数据被获取时会触发getter属性，那么就可以在getter中收集这个依赖。同样，当这个数据变化时会触发setter属性，那么就可以在setter中通知依赖更新</p><p><strong>所谓的依赖数组到底是怎么存在的？</strong></p><p>在Vue的源码中，并不是单纯的通过一个数组去实现的依赖的存储，而是存在一个Dep依赖管理器，</p><p><strong>源码：src/core/observer/dep.js</strong></p><ol><li>初始化subs数组，用来存放依赖</li><li>定义实例方法对依赖进行添加移除等操作</li><li>通知（notify）所有的依赖进行更新</li></ol><p>回到defineReactive，可以看到，在getter中调用了dep.depend()方法收集依赖，在setter中调用dep.notify()方法通知所有依赖更新。</p><p><strong>究竟谁是这个依赖？</strong></p><p>在Vue中还实现了一个叫做Watcher的类，而Watcher类的实例就是我们上面所说的那个\"谁\"。换句话说就是：谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例。watcher相当于一个中间人。数据发生了变化，通知依赖对应的watcher，再由watcher再去通知真正的视图</p><p><strong>Watcher究竟是怎样把自己添加到数据对应的依赖管理器中的？</strong></p><p>watcher实现逻辑：</p><ol><li>当实例化Watcher类时，会先执行其构造函数；</li><li>在构造函数中调用了this.get()实例方法；</li><li>在get()方法中，首先通过window.target = this把实例自身赋给了全局的一个唯一对象window.target上，</li><li>然后通过let value = this.getter.call(vm, vm)获取一下被依赖的数据，获取被依赖数据的目的是触发该数据上面的getter</li><li>上文我们说过，在getter里会调用dep.depend()收集依赖，而在dep.depend()中取到挂载window.target上的值并将其存入依赖数组中，在get()方法最后将window.target释放掉。</li><li>而当数据变化时，会触发数据的setter，在setter中调用了dep.notify()方法，在dep.notify()方法中，遍历所有依赖(即watcher实例)，执行依赖的update()方法，也就是Watcher类中的update()实例方法，在update()方法中调用数据变化的更新回调函数，从而更新视图。</li></ol><h4>存在的问题</h4><p>Object.defineProperty虽然实现了对object数据的监测，但是他只能观测到object的取值和设置值，当添加或者删除键值对的时候，是无法观测到的。</p><p>解决方案：Vue增加了两个全局的API，Vue.set 和 Vue.delete</p><h4>总结</h4><p>首先，我们通过<code style=\"background-color: rgb(243, 244, 244);\">Object.defineProperty</code>方法实现了对<code style=\"background-color: rgb(243, 244, 244);\">object</code>数据的可观测，并且封装了<code style=\"background-color: rgb(243, 244, 244);\">Observer</code>类，让我们能够方便的把<code style=\"background-color: rgb(243, 244, 244);\">object</code>数据中的所有属性（包括子属性）都转换成<code style=\"background-color: rgb(243, 244, 244);\">getter/seter</code>的形式来侦测变化。</p><p>接着，我们学习了什么是依赖收集？并且知道了在<code style=\"background-color: rgb(243, 244, 244);\">getter</code>中收集依赖，在<code style=\"background-color: rgb(243, 244, 244);\">setter</code>中通知依赖更新，以及封装了依赖管理器<code style=\"background-color: rgb(243, 244, 244);\">Dep</code>，用于存储收集到的依赖。</p><p>最后，我们为每一个依赖都创建了一个<code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>实例，当数据发生变化时，通知<code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>实例，由<code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>实例去做真实的更新操作。</p><p>其整个流程大致如下：</p><ol><li><code style=\"background-color: rgb(243, 244, 244);\">Data</code>通过<code style=\"background-color: rgb(243, 244, 244);\">observer</code>转换成了<code style=\"background-color: rgb(243, 244, 244);\">getter/setter</code>的形式来追踪变化。</li><li>当外界通过<code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>读取数据时，会触发<code style=\"background-color: rgb(243, 244, 244);\">getter</code>从而将<code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>添加到依赖中。</li><li>当数据发生了变化时，会触发<code style=\"background-color: rgb(243, 244, 244);\">setter</code>，从而向<code style=\"background-color: rgb(243, 244, 244);\">Dep</code>中的依赖（即Watcher）发送通知。</li><li><code style=\"background-color: rgb(243, 244, 244);\">Watcher</code>接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也有可能触发用户的某个回调函数等。</li></ol><h3>Array的变化监测</h3><h4>依赖收集</h4><p><a href=\"https://vue-js.com/learn-vue/reactive/array.html#_4-%E5%86%8D%E8%B0%88%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 131, 196);\">https://vue-js.com/learn-vue/reactive/array.html#_4-%E5%86%8D%E8%B0%88%E4%BE%9D%E8%B5%96%E6%94%B6%E9%9B%86</a></p><p><strong>依赖是在什么地方收集的？</strong></p><p>其实<code style=\"background-color: rgb(243, 244, 244);\">Array</code>型数据的依赖收集方式和<code style=\"background-color: rgb(243, 244, 244);\">Object</code>数据的依赖收集方式相同，都是在<code style=\"background-color: rgb(243, 244, 244);\">getter</code>中收集，在使用data中的array数据时，需要先通过object对象中获取array数据，然后在获取array的时候就触发了getter，所以就可以在getter中收集依赖了</p><p><strong>当Array型数据发生变化时如何得知？</strong></p><p>在碰到array类型的时候，在内部的方法的原型链上修改其方法，也就是说，在内部重写了内置的几个数组方法，主要包括：\'push\',  \'pop\', \'shift\', \'unshift\', \'splice\', \'sort\', \'reverse\'方式，同时，在新的方法中，还可以实现一些其他的方法</p><p><strong>源码：src/core/observer/array.js</strong></p><ol><li>首先创建了继承自<code style=\"background-color: rgb(243, 244, 244);\">Array</code>原型的空对象<code style=\"background-color: rgb(243, 244, 244);\">arrayMethods</code>，</li><li>接着在<code style=\"background-color: rgb(243, 244, 244);\">arrayMethods</code>上使用<code style=\"background-color: rgb(243, 244, 244);\">object.defineProperty</code>方法将那些可以改变数组自身的7个方法遍历逐个进行封装。</li><li>最后，当我们使用<code style=\"background-color: rgb(243, 244, 244);\">push</code>方法的时候，其实用的是<code style=\"background-color: rgb(243, 244, 244);\">arrayMethods.push</code>，而<code style=\"background-color: rgb(243, 244, 244);\">arrayMethods.push</code>就是封装的新函数<code style=\"background-color: rgb(243, 244, 244);\">mutator</code></li><li>也就是说，实标上执行的是函数<code style=\"background-color: rgb(243, 244, 244);\">mutator</code>，而<code style=\"background-color: rgb(243, 244, 244);\">mutator</code>函数内部执行了<code style=\"background-color: rgb(243, 244, 244);\">original</code>函数，这个<code style=\"background-color: rgb(243, 244, 244);\">original</code>函数就是<code style=\"background-color: rgb(243, 244, 244);\">Array.prototype</code>上对应的原生方法。 </li><li>那么，接下来我们就可以在<code style=\"background-color: rgb(243, 244, 244);\">mutato</code>r函数中做一些其他的事，比如说发送变化通知。</li></ol><p><strong>使用拦截器</strong></p><p>回到源码的observe部分，将拦截器挂载到数组实例与<code style=\"background-color: rgb(243, 244, 244);\">Array.prototype</code>之间</p><p><strong>如何通知依赖？</strong></p><ol><li>要想通知依赖，首先要能访问到依赖。</li><li>要访问到依赖也不难，因为我们只要能访问到被转化成响应式的数据<code style=\"background-color: rgb(243, 244, 244);\">value</code>即可</li><li>因为<code style=\"background-color: rgb(243, 244, 244);\">vaule</code>上的<code style=\"background-color: rgb(243, 244, 244);\">__ob__</code>就是其对应的<code style=\"background-color: rgb(243, 244, 244);\">Observer</code>类实例，</li><li>有了<code style=\"background-color: rgb(243, 244, 244);\">Observer</code>类实例我们就能访问到它上面的依赖管理器</li><li>然后只需调用依赖管理器的<code style=\"background-color: rgb(243, 244, 244);\">dep.notify()</code>方法，让它去通知依赖更新即可</li></ol><h4>深度侦测</h4><p>也就是说当在Array上进行操作的时候，只是对基本的增加和删除的元素，而在<code style=\"background-color: rgb(243, 244, 244);\">Vue</code>中，不论是<code style=\"background-color: rgb(243, 244, 244);\">Object</code>型数据还是<code style=\"background-color: rgb(243, 244, 244);\">Array</code>型数据所实现的数据变化侦测都是深度侦测，所谓深度侦测就是不但要侦测数据自身的变化，还要侦测数据中所有子数据的变化</p><p>实现的方式就是将数组中所有的元素都转化成可以监测的对象。当有数组中有新元素添加的时候，也需要将其转化成可侦测的数据</p><p>思路就是：往数组中添加元素的有三种方是push， unshift，splice，当时前两者时，也就是传入的参数就是新增的元素，在splice中，下标为2的才是新增的元素</p><h4>不足之处</h4><p>上述的原理其实还是根据数组对应的方法进行改造的，也就是在原型链上进行了改造，之后如果直接在数组上操作数组下标其实还是会导致侦测不到的情况的</p><h4>总结</h4><ol><li>首先我们分析了对于<code style=\"background-color: rgb(243, 244, 244);\">Array</code>型数据也在<code style=\"background-color: rgb(243, 244, 244);\">getter</code>中进行依赖收集；</li><li>其次我们发现，当数组数据被访问时我们轻而易举可以知道，但是被修改时我们却很难知道，为了解决这一问题，我们创建了数组方法拦截器，从而成功的将数组数据变的可观测。</li><li>接着我们对数组的依赖收集及数据变化如何通知依赖进行了深入分析；</li><li>最后我们发现<code style=\"background-color: rgb(243, 244, 244);\">Vue</code>不但对数组自身进行了变化侦测，还对数组中的每一个元素以及新增的元素都进行了变化侦测，我们也分析了其实现原理。</li></ol><p><br></p>', '0', '0', '1');
INSERT INTO `article` VALUES ('25', '12', '1', 'js-模块化', '', '2021-09-01 09:51:48', null, null, '<h2>模块化</h2><p>常见的模块规范有<code style=\"background-color: rgb(243, 244, 244);\">AMD</code>、<code style=\"background-color: rgb(243, 244, 244);\">CMD</code>、<code style=\"background-color: rgb(243, 244, 244);\">UMD</code>、<code style=\"background-color: rgb(243, 244, 244);\">CommonJS</code>、<code style=\"background-color: rgb(243, 244, 244);\">esModule</code>。比较主流的有<code style=\"background-color: rgb(243, 244, 244);\">UMD</code>、<code style=\"background-color: rgb(243, 244, 244);\">CommonJS</code>、<code style=\"background-color: rgb(243, 244, 244);\">esModule</code>。</p><h3>CommonJS</h3><p><strong>概述</strong></p><p>Node.js是commonJS规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：<code style=\"background-color: rgb(243, 244, 244);\">module</code>、<code style=\"background-color: rgb(243, 244, 244);\">exports</code>、<code style=\"background-color: rgb(243, 244, 244);\">require</code>、<code style=\"background-color: rgb(243, 244, 244);\">global</code>。实际使用时，用<code style=\"background-color: rgb(243, 244, 244);\">module.exports</code>定义当前模块对外输出的接口，用<code style=\"background-color: rgb(243, 244, 244);\">require</code>加载模块。</p><p>commonJS用同步的方式加载模块，也就是说，只有加载完成，才能执行后面的操作。在服务端，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。</p><p><strong>特点</strong></p><ul><li>所有代码都运行在模块作用域，不会污染全局作用域。</li><li>模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。</li><li>模块加载的顺序，按照其在代码中出现的顺序。</li></ul><p><strong>基本用法</strong></p><ul><li>暴露模块：<code style=\"background-color: rgb(243, 244, 244);\">module.exports = value</code>或<code style=\"background-color: rgb(243, 244, 244);\">exports.xxx = value</code></li><li>引入模块：<code style=\"background-color: rgb(243, 244, 244);\">require(xxx)</code>,如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径</li></ul><p>此处我们有个疑问：<strong>CommonJS暴露的模块到底是什么?</strong> CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。<strong>加载某个模块，其实是加载该模块的module.exports属性</strong>。</p><pre class=\"ql-syntax\" spellcheck=\"false\">// example.js\nvar x = 5;\nvar addX = function (value) {\n&nbsp;return value + x;\n};\nmodule.exports.x = x;\nmodule.exports.addX = addX;\n</pre><p>上面代码通过module.exports输出变量x和函数addX。</p><pre class=\"ql-syntax\" spellcheck=\"false\">var example = require(\'./example.js\');//如果参数字符串以“./”开头，则表示加载的是一个位于相对路径\nconsole.log(example.x); // 5\nconsole.log(example.addX(1)); // 6\n</pre><p>require命令用于加载模块文件。<strong>require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错</strong>。</p><h3>AMD</h3><p><strong>概述</strong></p><p>AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。</p><p><strong>基本用法</strong></p><ul><li>定义暴露模块:</li></ul><pre class=\"ql-syntax\" spellcheck=\"false\">//定义没有依赖的模块\ndefine(function(){\n&nbsp;return 模块\n})\n​\n//定义有依赖的模块\ndefine([\'module1\', \'module2\'], function(m1, m2){\n&nbsp;return 模块\n})\n</pre><ul><li>引入使用模块:</li></ul><pre class=\"ql-syntax\" spellcheck=\"false\">require([\'module1\', \'module2\'], function(m1, m2){\n&nbsp;使用m1/m2\n})\n</pre><h3>CMD</h3><p><strong>概述</strong></p><p>CMD规范专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。CMD规范整合了CommonJS和AMD规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。</p><p><strong>基本使用</strong></p><ul><li>定义暴露模块：</li></ul><pre class=\"ql-syntax\" spellcheck=\"false\">//定义没有依赖的模块\ndefine(function(require, exports, module){\n&nbsp;exports.xxx = value\n&nbsp;module.exports = value\n})\n​\n//定义有依赖的模块\ndefine(function(require, exports, module){\n&nbsp;//引入依赖模块(同步)\n&nbsp;var module2 = require(\'./module2\')\n&nbsp;//引入依赖模块(异步)\n&nbsp;&nbsp;require.async(\'./module3\', function (m3) {\n&nbsp;})\n&nbsp;//暴露模块\n&nbsp;exports.xxx = value\n})\n</pre><ul><li>引入使用模块</li></ul><pre class=\"ql-syntax\" spellcheck=\"false\">define(function (require) {\n&nbsp;var m1 = require(\'./module1\')\n&nbsp;var m4 = require(\'./module4\')\n&nbsp;m1.show()\n&nbsp;m4.show()\n})\n</pre><h3>esModule</h3><p><strong>概述</strong></p><p>ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：<code style=\"background-color: rgb(243, 244, 244);\">export</code>和<code style=\"background-color: rgb(243, 244, 244);\">import</code>。<code style=\"background-color: rgb(243, 244, 244);\">export</code>命令用于规定模块的对外接口，<code style=\"background-color: rgb(243, 244, 244);\">import</code>命令用于输入其他模块提供的功能。</p><p>ES6的模块不是对象，<code style=\"background-color: rgb(243, 244, 244);\">import</code>命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。</p><p><strong>基本用法</strong></p><p>export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。</p><pre class=\"ql-syntax\" spellcheck=\"false\">/** 定义模块 math.js **/\nvar basicNum = 0;\nvar add = function (a, b) {\n&nbsp;&nbsp;return a + b;\n};\nexport { basicNum, add };\n/** 引用模块 **/\nimport { basicNum, add } from \'./math\';\nfunction test(ele) {\n&nbsp;&nbsp;ele.textContent = add(99 + basicNum);\n}\n</pre><p>如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出。</p><pre class=\"ql-syntax\" spellcheck=\"false\">// export-default.js\nexport default function () {\n&nbsp;console.log(\'foo\');\n}\n​\n// import-default.js\nimport customName from \'./export-default\';\ncustomName(); // \'foo\'\n</pre><p>模块默认输出, 其他模块加载该模块时，import命令可以为该匿名函数指定任意名字。</p><h3>Commonjs 总结</h3><p><code style=\"background-color: rgb(243, 244, 244);\">Commonjs</code> 的特性如下：</p><ul><li>CommonJS 模块由 JS 运行时实现。</li><li>CommonJs 是单个值导出，本质上导出的就是 exports 属性。</li><li>CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。</li><li>CommonJS 模块同步加载并执行模块文件。</li></ul><h3>es module 总结</h3><p><code style=\"background-color: rgb(243, 244, 244);\">Es module</code> 的特性如下：</p><ul><li>ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。</li><li>ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。</li><li>ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。</li><li>ES6 模块提前加载并执行模块文件，</li><li>ES6 Module 导入模块在严格模式下。</li><li>ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。</li></ul><p><strong>参考文档</strong></p><p><a href=\"https://juejin.cn/post/6844903744518389768\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 131, 196);\">https://juejin.cn/post/6844903744518389768</a></p><p><a href=\"https://juejin.cn/post/6994224541312483336\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 131, 196);\">https://juejin.cn/post/6994224541312483336</a></p><h2><a href=\"https://blog.csdn.net/weixin_39793189/article/details/111218603\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(65, 131, 196);\">https://blog.csdn.net/weixin_39793189/article/details/111218603</a></h2>', '0', '0', '1');
INSERT INTO `article` VALUES ('27', '12', '1', '输入url之后', '', '2021-09-01 09:55:00', null, null, '<pre class=\"ql-syntax\" spellcheck=\"false\">浏览器解析URL获取协议，域名，端口，路径\n\n查看浏览器是否有资源的缓存\n\n  有。判断是否过期\n\n    没过期。直接读取缓存\n    \n    过期。\n\n      Etag和If-None-Match\n      \n      Last-Modify和lf-Modified-Since\n      \n      文件修改了则把新资源发给浏览器（状态码200），没修改则告诉浏览器读取缓存（状态码304）\n\n  没有则进行下一步\n\n首先进行DNS解析\n  \n  寻找浏览器是否存在缓存，若没有\n  \n  寻找操作系统是否存在缓存，若没有\n  \n  寻找hosts文件中是否有域名和ip的对应关系，若没有\n  \n  查找路由器中是否有缓存\n  \n  寻找DNS服务器是否没缓存，若没有\n  \n  向根域名服务器发送请求\n\n生成HTTP请求\n\n建立TCP连接，三次握手\n\n  客户端发送一个SYN=1,Seq=X的TCP包\n  \n  服务端发回一个SYN=1,ACK=X+1，Seq=Y的TCP包\n  \n  客户端发送ACK=Y+1，Seq=Y + 1的TCP包\n\n如果是HTTP请求\n\n  对HTTP报文进行报文分割并标记序号和端口号\n\n如果是HTTPS请求\n\n  将HTTP报文交给TLS处理，TLS和服务端进行TLS握手，交换版本信息，加密算法，压缩算法，随机数（浏览器一个，客户端一个）。\n  \n  服务端发送证书，浏览器用CA的公钥对其进行验证。\n  \n  浏览器用服务端的公钥加密生成的预备主密码发送给服务端，两个随机数和预备主密码生成主密码\n  \n  使用主密码生成对称加密的密钥对，消息认证码的密钥对，对称加密的CBC分组（分组模式）需要的初始化向量密钥对。\n  \n  握手之后进行加密，对HTTP报文分组，分组后压缩，压缩后的数据和MAC一起加密。\n  \n  对称加密保障私密性，消息认证码保障完整性，数字证书保障认证，防止中间人攻击。\n\n对TCP报文打包，加入源IP地址和目标IP地址。\n\n根据目标IP地址和路由表，查询下一跳路由。使用ARP查询下一跳路由的MAC地址。\n\n对IP报文打包并附上MAC地址。\n\n发送数据，服务端接收到请求并返回响应。\n\n浏览器接收到HTTP响应，关闭TCP连接或保持复用，四次挥手。\n\n（如果返回了HTML）根据响应头的字符集进行解码\n\n如果响应头没有字符集，则浏览器会默认用一套解码规则，当解析html解析到meta标签中的编码规则时，则替换成新的解码方式重新解码。\n\n资源预解析，会将一些请求资源提前加入请求队列中\n\n解析HTML为DOM树\n\n标记化（tokenizing）: 将HTML解析成标记\n\n构建树（tree construction）: 根据标记生成DOM树\n\n解析CSS为CSSOM\n\n根据DOM树和CSSOM生成DOM渲染树\n\n从DOM的根节点遍历所有可见节点，对其应用对应的CSSOM规则。不可见节点包括（script, meta标签， 被css隐藏的节点）\n\n布局：浏览器获取每个渲染对象的位置和尺寸\n\n绘制：将计算好的像素绘制到屏幕\n\n渲染层/合成层合并\n</pre>', '0', '0', '1');
INSERT INTO `article` VALUES ('28', '12', '2', '计算机网络-http', '', '2021-09-01 09:55:51', null, null, '<h3>HTTP状态码</h3><ul><li>1XX 通知</li><li class=\"ql-indent-1\">100 客户端重新发请求</li><li class=\"ql-indent-1\">101 更改协议，http，https，http1.0，1.1，2.0</li><li>2XX 成功</li><li class=\"ql-indent-1\">200 操作成功</li><li class=\"ql-indent-1\">201 创建新资源</li><li class=\"ql-indent-1\">202 请求不被实时处理</li><li class=\"ql-indent-1\">204 请求成功，但是报文不含实体的主体部分</li><li class=\"ql-indent-1\">205 请求成功，但是报文不含实体的主体部分，要求客户端重置内容</li><li>3XX 重定向</li><li class=\"ql-indent-1\">301 永久性重定向</li><li class=\"ql-indent-1\">302 临时重定向</li><li class=\"ql-indent-1\">303 资源存在另一个URL</li><li class=\"ql-indent-1\">304 允许访问资源，但实体为空</li><li>4XX 客户端错误</li><li class=\"ql-indent-1\">400 请求报文语法错误</li><li class=\"ql-indent-1\">401 请求需要通过验证（认证证书）</li><li class=\"ql-indent-1\">403 请求资源存在，但是被拒绝</li><li class=\"ql-indent-1\">404 找不到资源</li><li class=\"ql-indent-1\">405 不支持的请求方法</li><li>5XX 服务端错误</li><li class=\"ql-indent-1\">500 执行请求发生错误</li><li class=\"ql-indent-1\">501 不支持请求方法</li><li class=\"ql-indent-1\">502 代理与上行服务器之间出现问题</li><li class=\"ql-indent-1\">503 服务器暂时超负荷</li></ul><h3>GET ， POST</h3><p>本质上来说，二者之间没有太大的区别，都取决于HTTP</p><p>GET能请求缓存，POST不行；POST支持多编码；GET回退无害，POST再次提交；GET可以保存书签，POST不行；GET的长度受限制；POST相对安全</p><p>对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；</p><p>而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）</p><h3>RESTful</h3><p>应该尽量将API部署在专用域名之下。</p><pre class=\"ql-syntax\" spellcheck=\"false\">https://api.example.com\n</pre><p>如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。</p><pre class=\"ql-syntax\" spellcheck=\"false\">https://example.org/api/\n</pre><p>在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词。</p><p>对于资源的具体操作类型，由HTTP动词表示。</p><p>如Get, Post, Put, Delete等</p><h3>HTTP头部</h3><p>请求头部</p><pre class=\"ql-syntax\" spellcheck=\"false\">cookie: \'\'\nhost: \'\'\nIf-None-Match: \'\'\nIf-Modified-Since: \'\'\n</pre><p>响应头部</p><pre class=\"ql-syntax\" spellcheck=\"false\">Set-Cookie: \'\'\nLocation: \'/\'\nETag: \'\'\nLast-Modified: \'\'\nCache-Control: \'max-age=\'\nexpires: \'\'\naccess-control-allow-origin: \'*\'\naccess-control-allow-credentials: true\n</pre><h3>HTTP协议 1.0 ，1.1， 2.0</h3><h4>HTTP1.1比起1.0</h4><ol><li>HTTP1.0默认不开启长连接，HTTP1.1默认开启（Connection：Keep-Alive），并且支持管线化（Pipeline）。</li><li>HTTP1.0不支持Host头部，HTTP1.1支持，可以实现虚拟主机。</li><li>HTTP1.1比1.0新加了E-tag，If-Node-Match，Cache-control等用于缓存控制的头部。</li><li>HTTP1.1新增24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突。</li><li>HTTP1.1对带宽进行优化。</li></ol><h4>HTTP2.0比起1.1</h4><ol><li>HTTP2.0采用的二进制格式传输，取代了HTTP1.x的文本格式的传输。</li><li>多路复用。在HTTP2.0中有两个概念，分别是帧（frame）和流（stream），帧表示最小的单位，每个帧都会标识出该帧属于哪个流。多路复用指的是一个TCP连接中可以存在多个流，也就是说，同一时间可以发送多个请求。</li><li>头部压缩。对报文的头部进行压缩，在客户端和服务端都维护着一份字典记录着头部对应的索引。</li><li>服务端推送（Server Push）。服务端可以预测客户端需要的资源，并主动推送给客户端。</li></ol><h3>HTTPS原理</h3><p>HTTP = HTTP + TLS/SSL</p><p>发送HTTPS请求时</p><ol><li>生成HTTP报文，交给TLS处理，进行TLS握手；交换互相的随机数，支持的加密算法，压缩算法，协议版本号。</li><li>服务端发送证书给客户端，证书包括服务端的公钥和CA的私钥对服务端公钥的签名。客户端用CA的公钥对签名进行验证。</li><li>验证成功后，客户端生成预备主密码，用服务端公钥加密后发送给服务端。服务端接收到预备主密码后，结合两个随机数生成主密码。</li><li>主密码用来生成会话使用的密钥，消息认证码使用的密钥，CBC模式要用到的初始向量。</li><li>报文分割后，压缩，加上MAC后进行加密传输。</li></ol><p><br></p>', '0', '0', '1');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `article_id` varchar(255) NOT NULL COMMENT '用户id',
  `content` varchar(255) NOT NULL COMMENT '留言内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `status` varchar(10) NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('2', '0', 'Indomite@qq.com', '添加留言', '2020-12-28 21:33:42', '1');
INSERT INTO `comment` VALUES ('3', '0', 'Indomite@qq.com', '添加留言', '2020-12-28 21:33:43', '1');

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL COMMENT '文章id',
  `user_id` varchar(255) NOT NULL COMMENT '用户id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '点赞时间',
  `status` varchar(255) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of likes
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '标签名',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `status` varchar(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES ('3', 'HTML', '描述', '2021-03-02 15:03:11', null, '1');
INSERT INTO `tag` VALUES ('4', 'CSS', '描述', '2021-03-02 15:03:14', null, '1');
INSERT INTO `tag` VALUES ('5', 'JavaScript', '描述', '2021-03-02 15:03:21', null, '1');
INSERT INTO `tag` VALUES ('6', 'Vue', '描述', '2021-03-02 15:03:26', null, '1');
INSERT INTO `tag` VALUES ('7', 'Node', '123456', '2021-03-02 15:03:32', null, '1');
INSERT INTO `tag` VALUES ('8', 'Nginx', 'gfds', '2021-03-02 15:03:51', null, '1');
INSERT INTO `tag` VALUES ('9', 'Linux', 'dfdfsd', '2021-03-02 15:03:56', null, '1');
INSERT INTO `tag` VALUES ('10', 'Webpack', 'dfdfsd', '2021-03-02 15:04:08', null, '1');
INSERT INTO `tag` VALUES ('11', 'ES6', 'dfdfsd', '2021-03-02 15:04:15', null, '1');
INSERT INTO `tag` VALUES ('12', 'Promise', 'dfdfsd', '2021-03-02 15:04:45', null, '1');
INSERT INTO `tag` VALUES ('13', 'Koa2', 'dfdfsd', '2021-03-02 15:04:56', null, '1');
INSERT INTO `tag` VALUES ('14', '团队协作', 'dfdfsd', '2021-03-02 15:05:10', null, '1');
INSERT INTO `tag` VALUES ('15', '面经', 'dfdfsd', '2021-03-02 15:05:21', null, '1');
INSERT INTO `tag` VALUES ('16', '安全', 'dfdfsd', '2021-03-02 15:05:27', null, '1');
INSERT INTO `tag` VALUES ('17', '浏览器', 'dfdfsd', '2021-03-02 15:05:34', null, '1');
INSERT INTO `tag` VALUES ('18', '计算机网络', 'dfdfsd', '2021-03-02 15:05:42', null, '1');
INSERT INTO `tag` VALUES ('19', '操作系统', 'dfdfsd', '2021-03-02 15:05:45', null, '1');
INSERT INTO `tag` VALUES ('20', '数据结构与算法', 'dfdfsd', '2021-03-02 15:05:55', null, '1');
INSERT INTO `tag` VALUES ('21', 'MySQL', '地方VS地方', '2021-03-02 15:06:28', null, '1');
INSERT INTO `tag` VALUES ('22', 'dbd', 'dfbsdfb', '2021-02-03 00:57:14', null, '1');
INSERT INTO `tag` VALUES ('23', 'vbsdf', 'bsfd b', '2021-02-03 01:11:01', null, '1');
INSERT INTO `tag` VALUES ('24', ' sd', 's ', '2021-02-03 01:11:20', null, '1');
INSERT INTO `tag` VALUES ('25', 'bfgsb', 'gfhdgf', '2021-02-03 01:12:05', null, '1');
INSERT INTO `tag` VALUES ('26', '豆腐干士大夫', '傻大粪', '2021-02-03 01:23:16', null, '1');
INSERT INTO `tag` VALUES ('27', 'zxc c', 'av ad', '2021-02-03 18:51:45', null, '1');
INSERT INTO `tag` VALUES ('28', '小程序', '啊啊啊', '2021-07-21 22:05:14', null, '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL DEFAULT '10' COMMENT '10:一般用户 20:管理员 30:超级管理员',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像地址',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT NULL COMMENT '更新时间',
  `status` char(1) NOT NULL DEFAULT '1' COMMENT '1:未锁定 0:锁定',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('12', '30', 'indomite', '228ac14b336c269acf1de3ec063cbb32', '123456@qq.com', 'https://avatar.csdnimg.cn/D/3/7/1_qq_43755646_1608967335.jpg', '2021-02-03 13:18:03', null, '1');
INSERT INTO `user` VALUES ('13', '30', 'admin', '228ac14b336c269acf1de3ec063cbb32', 'Indomite@qq.com', null, '2021-09-01 09:45:12', null, '1');
INSERT INTO `user` VALUES ('14', '20', 'admin1', '228ac14b336c269acf1de3ec063cbb32', '111111@qq.com', null, '2021-02-02 19:26:38', null, '1');
INSERT INTO `user` VALUES ('15', '10', 'user', '228ac14b336c269acf1de3ec063cbb32', 'aaqa@qq.com', null, '2021-01-26 11:19:40', null, '1');
INSERT INTO `user` VALUES ('16', '10', 'user2', '228ac14b336c269acf1de3ec063cbb32', 'aaq3a@qq.com', null, '2021-01-26 19:31:36', null, '1');
INSERT INTO `user` VALUES ('17', '10', 'user3', '228ac14b336c269acf1de3ec063cbb32', 'aaq3a@qq.com', null, '2021-01-26 19:31:27', null, '1');
INSERT INTO `user` VALUES ('18', '10', 'user4', '228ac14b336c269acf1de3ec063cbb32', 'aaq3a@qq.com', null, '2021-01-26 19:31:49', null, '1');
INSERT INTO `user` VALUES ('19', '10', 'indomite1', '228ac14b336c269acf1de3ec063cbb32', '2420996960@qq.com', null, '2021-01-29 22:47:03', null, '1');
INSERT INTO `user` VALUES ('20', '10', 'indomite2', '228ac14b336c269acf1de3ec063cbb32', '2420996960@qq.com', null, '2021-01-29 22:48:21', null, '1');
INSERT INTO `user` VALUES ('21', '10', 'indomite4', '228ac14b336c269acf1de3ec063cbb32', '2420996960@qq.com', null, '2021-01-29 23:31:57', null, '1');
INSERT INTO `user` VALUES ('22', '30', 'indomite5', '228ac14b336c269acf1de3ec063cbb32', '242099696@qq.com', null, '2021-07-17 22:23:13', null, '1');
INSERT INTO `user` VALUES ('23', '20', 'indomite6', '228ac14b336c269acf1de3ec063cbb32', '2420996960@qq.com', null, '2021-01-31 23:00:21', null, '1');
INSERT INTO `user` VALUES ('24', '10', 'indomite7', '228ac14b336c269acf1de3ec063cbb32', '2420996960@qq.com', null, '2021-01-30 00:55:13', null, '1');
INSERT INTO `user` VALUES ('25', '10', 'indomite74', '033eaaf442ee2b823ad6764f53d3a7a5', '2420996960@qq.com', null, '2021-01-30 01:00:03', null, '1');
