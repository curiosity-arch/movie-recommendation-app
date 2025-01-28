'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

export async function createData(formData: FormData) {
    const username = formData.get('username-register');
    const password = formData.get('password_register');
    const birthYear = formData.get('birthYear');
}

export async function updateData(formData: FormData) {
    
}

export async function deleteData(formData: FormData) {
    
}

export async function loginUser(formData: FormData) {
    const username = formData.get('username_login');
    const password = formData.get('password_login');

    redirect('/dashboard');
}