'use server'

import { redirect } from "next/navigation"

export async function createData() {
    redirect('/home')
}

export async function updateData() {
    
}

export async function deleteData() {
    
}

export async function loginUser() {
    redirect('/dashboard');
}