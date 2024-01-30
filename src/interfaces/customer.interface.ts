import { User } from "./user.interface";

export interface Customer{

    id?: number;
    customerImage?: string;
    firstName: string;
    lastName: string;
    mobile: string;
    address: string;
    email: string;
    //lastComment: Comment;
    user: User

  }
