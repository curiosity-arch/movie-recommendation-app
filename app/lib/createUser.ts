"use server";

import { z } from "zod";
import postgres from "postgres";
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string().optional(),
    username: z.string({
        invalid_type_error: 'Please input a user.',
    }),
    password: z.string({
        invalid_type_error: 'Please input a password.',
    }),
    tahunLahir: z.string({
        invalid_type_error: 'Please input a valid birth year.',
    }),
});

const CreateUser = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        username?: string[];
        password?: string[];
        tahunLahir?: string[];
    };
    message?: string | null;
    success?: boolean;
    username?: string;
};

export async function createUser(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validateFields = CreateUser.safeParse({
        username: formData.get('usernameCreate'),
        password: formData.get('passwordCreate'),
        tahunLahir: formData.get('tahunLahir'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
            success: false,
        };
    }

    // Prepare data for insertion into the database
    const { username, password, tahunLahir } = validateFields.data; // Ini berhubungan dengan variabel CreateUser
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert data into the database
    try {
        // Cek apakah username sudah ada
        const existingUser = await sql`SELECT username FROM users WHERE username = ${username}`;
        if (existingUser.length > 0) {
            return { message: 'Username already exists. Please choose another one.', success: false };
        }

        // Insert data ke database
        await sql`
            INSERT INTO users (username, password, tahun_lahir) 
            VALUES (${username}, ${hashedPassword}, ${tahunLahir})
        `;

        return { success: true, username };
    } catch (error) {
        // If a database error occurs, return a more specific error.
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create User.',
            success: false,
        };
    }
}