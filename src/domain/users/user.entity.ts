export interface User {
    id: number;
    email: string;
    password: string;
    following?: User[];
    followedBy?: User[];
}
