import { ActionContext } from 'vuex';
import { requestAPI } from '@/utils/API';
import { IAppState } from './types';
import { UserLogin, UserInfo } from '@/utils/APITypes'

export default {
  async authCheck(store: ActionContext<IAppState, any>): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
     
            if(!!store.state.token == false)
            {
              resolve(false)
              return;
            }

            try
            {
              var sessionResult = await requestAPI<any>('/auth/session', {
                headers: {
                  'Authorization': 'Bearer ' + store.state.token
                },
                method: 'post'
              });

              if(sessionResult.status == 200)
                resolve(true)
              else
                resolve(false);
            }
            catch(err)
            {
              resolve(false);
            }
      
          })
  },

  async authRequest(store: ActionContext<IAppState, any>, user: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        store.commit('authRequest');

        try
        {
          var loginResult = await requestAPI<UserLogin>('/auth/login', {
            headers: {
                    'authorization': 'Basic ' + Buffer.from(user).toString('base64')
                  },
                 method: 'post'
          });
          //console.log(loginResult.data)
          store.commit('authSuccess', {
            token: loginResult.data.token,
            user: loginResult.data.user
          })
          //console.log(loginResult.data)
          resolve(true)

        }
        catch(err)
        {
          store.commit('authError', err)
          resolve(false)
        }

      })
  },

  async authLogout(store: ActionContext<IAppState, any>): Promise<void> {
    return new Promise((resolve, reject) => {
      store.commit('authLogout')
      resolve()
    })
  },
  async updateUserInfo(store: ActionContext<IAppState, any>, info: UserInfo): Promise<void> {
    return new Promise((resolve, reject) => {
      store.commit('updateUserInfo', info)
      resolve()
    })
  },
};