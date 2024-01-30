import { Customer } from "@/interfaces/customer.interface";

export enum UserRole {
    HANDLER = "HANDLER",
    ADMIN = "ADMIN",
    
  }

export interface User {
    id: number,
    email: string,
    firstName: string
    lastName: string,
    mobile: string,
    password: string,
    roleType: UserRole,
    customer?: Customer[]
}