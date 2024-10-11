import {User} from "./user"
export interface Response {
    ok: boolean;
    msg?: string;
    token?: string;
    data?: User
}
