import { redirect } from "next/navigation"

export async function createData() {
    redirect('/home')
}

export async function updateData() {
    
}

export async function deleteData() {
    
}

export async function loginUser(formData: FormData) {
    const query = formData.get('username_login');
    console.log(query);
    redirect('/dashboard');
}