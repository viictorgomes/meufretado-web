import { IAppState, MutationAuthUserInfo } from './types';
import { UserInfo, DefaultUserInfo } from '@/utils/APITypes'

export default {
    authRequest(state: IAppState) {
        state.status = 'loading';
        state.error = false;
  },
  authSuccess(state: IAppState, info: MutationAuthUserInfo) {
    state.error = false;
    state.status = 'success';
    state.token = info.token;
    state.myUser = info.user;
  },
  authError(state: IAppState) {
    state.error = true;
    state.status = 'error';
    state.token = '';
    state.myUser = DefaultUserInfo;
  },
  authLogout(state: IAppState) {
    state.error = false;
    state.status = '';
    state.token = '';

    state.myUser = DefaultUserInfo;
  },
  updateUserInfo(state: IAppState, info: UserInfo)
  {
    state.myUser.telefone = info.telefone;
    state.myUser.email = info.email;
  }
};