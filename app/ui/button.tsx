import { createData, loginUser } from "@/app/lib/actions"
import styles from "@/public/styles/form-styles.module.css"
import React from "react"
import { signOut } from "@/auth"

export function ButtonCreate() {
    return <button className={styles.button}>Register</button>
}


export function ButtonSignOut() {
    return (
        <div>
            <form 
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button>
                    Log Out
                </button>
            </form>
        </div>
    );
}