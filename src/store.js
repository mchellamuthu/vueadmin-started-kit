import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    authToken: null,
    authenticated: false,
    user: {}
  },
  mutations: {
    updateLoggedInData(state, data) {
      state.authenticated = true;
      state.user = data.userinfo;
      state.authToken = data.token;
    },
    logout(state) {
      // acquire initial state
      state.authenticated = false;
      state.user = {};
      state.authToken = null;
    }
  },
  actions: {
    login(context, user) {
      return new Promise((resolve, reject) => {
        let data = {
          email: user.email,
          password: user.password
        }
        axios.post('/admin/login', data).then((response) => {
          let data = {
            userinfo: response.data.userinfo,
            token: response.data.token
          }
          localStorage.removeItem('user-token');
          localStorage.setItem("user-token", response.data.token); // store the token in localstorage
          context.commit('updateLoggedInData', data);
          // let responseData = response.data.userinfo
          console.log('Reponse Headers =>', response.data.token);
          resolve(response)
        }).catch((response) => {
          // console.log('errpr');
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(response)
        });
      });
    },
    logout(context) {

      localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible

      context.commit("logout");
    }
  }
})
