'use server'

import { signIn } from "@/app/auth/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation"; // Redirect setelah login sukses

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
        redirect("/home"); // Redirect ke home setelah sukses login
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid username or password.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}