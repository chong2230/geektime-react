# React 难点

1. 配置react-router

2. 编写基础组件，如Toast

3. 如何组织页面结构

# 问题及解决方案

1. 解决 react 项目控制台对 a 标签 使用了 href 属性（设置了值：javascript:;）的 warning 问题

javascript:;或javascript:void(0) 改为 # 或者 #!

https://hellodk.cn/post/131

2. React导入样式时的优先级问题，在App.js中导入common.css的优先级比Home.jsx中导入的样式优先级高

React导入样式文件时，优先级由导入的顺序决定，后导入的样式优先级高于先导入的样式

在 main.jsx中导入common.css