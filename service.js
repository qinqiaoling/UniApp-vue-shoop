// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}
const addUser = function (userInfo) {
    let users = getUsers();
	// 替换原数据
	users.splice(0,1,userInfo)
    // users.push({
    //     account: userInfo.account,
    //     password: userInfo.password
    // });
	// 替换账号密码原数据后再存储
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}
export default {
    getUsers,
    addUser
}
