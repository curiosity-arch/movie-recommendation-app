'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function createData() {
    
}

export async function updateData() {
    
}

export async function deleteData() {
    
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}