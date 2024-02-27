export interface TodoInterface{
    title:string;
    note:string;
    duedate:string;
    status:string;
    email:string;
    _id:string | number;
    createdOn:string;
    modifiedOn:string;
}

export interface UserInterface{
    firstName:string;
    lastName:string;
    email:string;
    password?:string;
    confirmPassword?:string;
}

export interface QuoteInterface{
    quote:string;
    author:string;
    category:string;
}