import { IAppState } from "./types";
import { UserInfo } from "@/utils/APITypes";

const state = {
  myUser: {
    username: '',
    email: '',
    _id: ''
  },
  token: '',
  status: 'NONE',
  error: false,
};

export default state;