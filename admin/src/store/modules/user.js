import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            if (res.meta.status == 200) {
              const token = res.data.token;
              setToken(token);
              commit("SET_TOKEN", token);
              resolve();
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    msgLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            if (res.meta.status == 200) {
              const userInfo = res.data;
              const avatar = userInfo.avatar == "" || userInfo.avatar == null ? require("@/assets/logo/avatar.jpg") : userInfo.avatar;
              if (userInfo.rids && userInfo.rids.split(",").length > 0) {
                // 验证返回的roles是否是一个非空数组
                commit("SET_ROLES", userInfo.rids);
                // commit("SET_PERMISSIONS", res.permissions);
              } else {
                commit("SET_ROLES", ["ROLE_DEFAULT"]);
              }
              commit("SET_NAME", userInfo.username);
              commit("SET_AVATAR", avatar);
              resolve(res);
            }else{
              reject(res.meta.msg)
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 退出系统
    LogOut({ commit, state }) {
      removeToken();
      return;
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
