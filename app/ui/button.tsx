'use client'

import { createData, loginUser } from "@/app/lib/actions"
import styles from "@/public/styles/form-styles.module.css"

export function ButtonCreate() {
    return <button formAction={createData} className={styles.button}>Register</button>
}

export function ButtonLogin() {
    return <button formAction={loginUser} className={styles.button}>Login</button>
}