import { Id } from './id.type';

type User = string;

export interface IUser {
    id: Id;
    name: string;
    email: string;
    password: string;
}

export type ICreateUser = Pick<
    IUser,
    'name' | 'email' | 'password'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
