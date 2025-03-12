export type User = {
    id: string;
    username: string;
    password: string;
};

export type Admin = {
    id: string;
    username_admin: string;
    password_admin: string;
};

export type Movie = {
    id: number;
    title: string;
    genre: string;
    poster: string;
    features: number[];
};