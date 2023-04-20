import { IAppState } from './types';
import { UserInfo } from '@/utils/APITypes';


export default {
    isAuthenticated(state: IAppState): boolean {
        return !!state.token;
    },
    authStatus(state: IAppState): string {
        return state.status;
    },
    getErrorStatus(state: IAppState): boolean {
        return state.error;
    },
    authToken(state: IAppState): string {
        return state.token;
    },
    userInfo(state: IAppState): UserInfo {
        return state.myUser;
    },
    isDriver(state: IAppState): boolean {
        return state.myUser.grupo === 'motorista';
    },
    isPassenger(state: IAppState): boolean {
        return state.myUser.grupo === 'passageiro';
    },
};