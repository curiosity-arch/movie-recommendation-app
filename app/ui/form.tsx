"use client"

import styles from '@/public/styles/form-styles.module.css';
import YearSelectionForm from '@/app/ui/years-selection';
import { createData, loginUser } from '@/app/lib/actions';

import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useSearchParams } from "next/navigation";
import { useState } from 'react';

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
    };

    return (
        <div className={styles.form}>
            <div className={styles.login_form}>
                <h2 className={styles.h2}>Login</h2>
                <form action={formAction} onSubmit={handleLogin}>
                    <label htmlFor='username_user'>
                        Username
                    </label>
                    <input 
                        type='text'
                        name='username_user'
                        id='username_user'
                        placeholder='Input username'
                        required
                    />
                    <label htmlFor='password_user'>
                        Password
                    </label>
                    <input 
                        type='password'
                        name='password_user'
                        id='password_user'
                        placeholder='Input Password'
                        minLength={6}
                        required
                    />
                    <br />
                    <input type="hidden" name='redirectTo' value={callbackUrl}/>
                    <button 
                        type="submit"
                        className={styles.button}
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
                <form action={createData}>
                    <label htmlFor="username-register">Username</label>
                    <input type="text" name="username-register" id="username-register" maxLength={10} required/>
                    <label htmlFor="password-register">Password</label>
                    <input type="password" name="password_register" id="password-register" maxLength={6} required/>
                    <label htmlFor="birthYear">Tahun Lahir</label>
                    <YearSelectionForm /><br />
                    <button type="submit" className={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
}