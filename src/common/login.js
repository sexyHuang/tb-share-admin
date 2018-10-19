import user from '@/conf/user';
import store from '@/store';

const failMessages = ['用户不存在', '密码错误'];
export const login = (account, password, isSave) => {
  let _mes = failMessages.shift();
  const u = user.find(item => {
    if (item.account === account) _mes = failMessages.shift();
    return item.account === account && item.password === password;
  });
  if (u) window[isSave ? 'localStorage' : 'sessionStorage'].token = u.token;
  return (
    u || {
      error: _mes
    }
  );
};

export const checkLogin = () => {
  let token = window.sessionStorage.token || window.localStorage.token;
  if (!token) return false;
  const u = user.find(item => {
    return item.token === token;
  });
  store.commit('setUser', {
    user_name: u.user_name || ''
  });
  return u;
};

export const logOut = () => {
  window.sessionStorage.removeItem('token');
  window.localStorage.removeItem('token');
  location.replace('/');
};
