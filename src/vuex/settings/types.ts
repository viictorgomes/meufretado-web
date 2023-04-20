import { UserInfo } from '@/utils/APITypes'

export interface MutationAuthUserInfo
{
  token: string;
  user: UserInfo
}

export interface IAppState {
  token: string;
  myUser: UserInfo;
  status: string;
  error: boolean;
};