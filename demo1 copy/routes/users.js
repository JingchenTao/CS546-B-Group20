// 文件: routes/users.js
// 兼容写成 ./routes/users 的引入，转发到真正的 user.js

const router = require('./user');
module.exports = router;
