
import { Item } from "./cart";
import { Category } from "./category";
import { Product } from "./product";
import { Subcategory } from "./subcategory";
import {User} from "./user"
export interface Response {
    ok: boolean;
    msg?: string;
    token?: string;
    data?: User
}
export interface ResponsePro {
    ok: boolean;
    msg?: string;
    data?: Product;
}
export interface ResponseCat {
    ok: boolean;
    msg?: string;
    data?: Category;
}
export interface ResponseSub {
    ok: boolean;
    msg?: string;
    data?: Subcategory;
}