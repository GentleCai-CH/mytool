<<<<<<< HEAD

# mytool

##快速应用

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
>>>>>>> c6bf94b (init)



# mytool 编辑器 详情


## ✨ 特性

- 内容编辑器
  - Markdown（GFM）
  - emoji
  - 上传文件
    - 图片
    - 文件
    - 单独渲染 MP3 文件
    - 单独渲染视频文件
  - 剪切板处理
    - 粘贴内容处理为 Markdown
    - 粘贴图片自动重新上传
  - 数学公式（LaTeX）、流程图支持
  - 工具栏
    - 表情
    - 粗体
    - 斜体
    - 引用
    - 无序列表
    - 有序列表
    - 链接
    - 上传
    - 预览
    - 全屏
  - 编辑模式
    - 传统的 Markdown 分屏编辑预览
    - 保留 Markdown 标记符的即时渲染
    - 类富文本编辑器的所见即所得
- 注册
  - 用户名
  - 邮箱
  - 验证码
- 登录
  - 账户(用户名/邮箱)
  - 密码
  - 忘记密码
    - 邮箱
    - 邮箱验证
- 发帖
  - 帖子类型
    - 普通帖子
  - 标题
  - 正文
    - 内容编辑器
  - 标签
    - 使用已有（选择、自动完成）或创建
    - 默认“待分类”
  - 发布后
    - 可更新
    - 可删除
- 回帖
  - 内容编辑器
  - 回复（回复针对回帖）
- 货币
  - 货币规则
- 浏览贴子
  - 编辑自己的帖子
  - 发布时间/浏览数/标签
  - 分享
    - 微信
    - 分享链接（带用户标识）

## 报告缺陷

> 社区系统可能存在一些潜在的缺陷，大家如果有空的话可以帮助我们一起解决。
如果你在使用社区时发现了如下类型的问题，请回帖进行反馈，并附上 bug 截图以及操作步骤：

* **功能性缺陷**：例如发布文章失败、创建作品集失败等
* **安全性漏洞**：例如 XSS/CSRF、盗用用户信息等

## 功能建议

欢迎对社区提出功能特性方面的建议，我们一起讨论，如果有可能我们会尽快实现。

在提功能建议前可以先看一下 [计划表](https://rymcu.com/article/29) ，避免重复提议

## 鸣谢
- 感谢 `JetBrains` 对本项目的帮助,为作者提供了开源许可版 `JetBrains` 全家桶
 
 
![JetBrains](assets/jb_beam.svg)

## Build Setup

```bash
# install dependencies
$ npm install
# serve with hot reload at localhost:3000
$ npm dev
# build for production and launch server
$ npm build
$ npm start
# generate static project
$ npm generate
```

## 项目部署
1. 关闭本地项目后,在控制台执行 `npm run build` 进行打包
2. 拷贝以下文件至服务器

![build](assets/build.png)
   
3. 服务器安装 `Nodejs` 环境
4. 项目目录下执行 `npm install`
5. 执行 `npm install pm2 -g`
6. 执行 `pm2 list` 检查 `pm2` 是否安装好
7. 执行 `pm2 start npm --name nebula -- run start`


For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
