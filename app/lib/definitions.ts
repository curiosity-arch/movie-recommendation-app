export type User = {
    id: string;
    username: string;
    password: string;
    tahun_lahir: string;
};

export type Admin = {
    id: string;
    username_admin: string;
    password_admin: string;
};

export type Movie = {
    id: number;
    title: string;
    poster: string;
    year: string;
    genre: string;
    rating: string;
    description: string;
    language: string;
    director: string;
    actors: string;
    rating_float: number;
    features: number[];
};