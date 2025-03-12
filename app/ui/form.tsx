"use client"

import styles from '@/public/styles/form-styles.module.css';
import stylesButton from "@/public/styles/button.module.css";

import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from 'react';
import CreateFormUser from './create-form';

function LoginContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined,
    );

    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
    };

    return (
        <div className={styles.form}>
            <div className={styles.login_form}>
                <h2 className={styles.h2}>Login</h2>
                <form action={formAction} onSubmit={handleLogin}>
                    <label htmlFor='username'>
                        Username
                    </label>
                    <input 
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Input username'
                        required
                    />
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input 
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Input Password'
                        minLength={6}
                        required
                    />
                    <br />
                    <input type="hidden" name='redirectTo' value={callbackUrl}/>
                    <button
                        type="submit"
                        className={stylesButton.buttonSignIn}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div>
                        {errorMessage && (
                            <>
                                <p>{errorMessage}</p>
                            </>
                        )}
                    </div>
                </form>
            </div>
            <div className={styles.hr}>
                <hr />
            </div>
            <div className={styles.register_form}>
                <h2 className={styles.h2}>Register</h2>
                <CreateFormUser />
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <LoginContent />
        </Suspense>
    )
}
