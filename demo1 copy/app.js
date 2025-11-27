
//管理员：用户名：admin 密码：adminpass
const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/mongoConnection');

const indexRouter = require('./routes/index');
const parksRouter = require('./routes/park');
const usersRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const port = 3000;

// 连接 MongoDB 数据库
connectDB().then((db) => {
    console.log('已成功连接到数据库');
}).catch((error) => {
    console.error('数据库连接失败:', error);
});

// 设置 EJS 为模板引擎
app.set('view engine', 'ejs');
// 使用 express-ejs-layouts 中间件设置布局
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// 解析请求体（表单数据）
app.use(express.urlencoded({ extended: true }));

// 配置会话中间件，用于用户登录状态管理
app.use(session({
    secret: 'secretKey', // 用于签名会话 ID 的密钥（实际项目中应使用环境变量）
    resave: false,
    saveUninitialized: false
}));

// 将当前用户信息（如果已登录）传递给视图模板
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 挂载路由模块
app.use('/', indexRouter);         // 主页和公共路由
app.use('/parks', parksRouter);    // 公园相关功能
app.use('/users', usersRouter);    // 用户相关功能（登录/注册/个人资料）
app.use('/admin', adminRouter);    // 管理员相关功能

// 启动服务器
app.listen(port, () => {
    console.log(`服务器已启动，访问 http://localhost:${port}`);
});
