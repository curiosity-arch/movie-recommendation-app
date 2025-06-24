"use server";

import { z } from "zod";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import { signIn } from "../auth/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const schema = z.object({
    username: z.string().min(3, "Minimal 3 karakter"),
    password: z.string().min(6, "Minimal 6 karakter"),
    tahunLahir: z.string().regex(/^\d{4}$/, "Tahun lahir tidak valid"),
});

export interface State {
    errors?: {
        username?: string[];
        tahunLahir?: string[];
    };
    message?: string | null;
    success?: boolean;
    username?: string;
};

export async function createUser(
    prevState: State, 
    formData: FormData
): Promise<State> {
    const username = formData.get("usernameCreate") as string;
    const password = formData.get("passwordCreate") as string;
    const tahunLahir = formData.get("tahunLahir") as string;

    const result = schema.safeParse({ username, password, tahunLahir });
    
    if (!result.success) {
        return {
            errors: {
                username: result.error.flatten().fieldErrors.username,
                tahunLahir: result.error.flatten().fieldErrors.tahunLahir,
            },
            message: "Gagal membuat user",
            success: false,
        };
    }
    
    try {
        // Cek apakah username sudah ada
        const existingUser = await sql`
            SELECT * FROM users WHERE username = ${username}
        `;
        if (existingUser.length > 0) {
            return { message: 'Username sudah terdaftar. Coba pilih yang lain.', success: false };
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert data ke database
        await sql`
            INSERT INTO users (username, password, tahun_lahir) 
            VALUES (${username}, ${hashedPassword}, ${tahunLahir})
        `;

        // Setelah berhasil insert, langsung sign in user
        await signIn("credentials", {
            username,
            password,
            redirect: false, // Jangan redirect di sini, biar handle dari client (terjadi melalui file create-form.tsx)
        });

        return { 
            success: true, 
            username,
            message: "Berhasil membuat akun dan login",
        };
    } catch (error) {
        console.error("Error saat register:", error);
        return {
            message: "Terjadi kesalahan saat membuat akun",
            success: false,
        };
    }
}