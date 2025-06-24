"use client"

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from "next/navigation";
import { authenticate } from "../lib/actions";
import styles from '@/public/styles/form-styles.module.css';
import stylesButton from "@/public/styles/button.module.css";

function LoginContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';
    const router = useRouter();

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await authenticate(undefined, formData);

        setLoading(false);

        if (result) {
            setErrorMessage(result);
        } else {
            router.push(callbackUrl);
        }
    };

    return (
        <div className={styles.login_form}>
            <h2 className={styles.h2}>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='username'>
                    Username
                </label>
                <input 
                    type='text'
                    name='username'
                    id='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Input username'
                    minLength={3}
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    type='password'
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
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
    );
}

export default function LoginForm() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <LoginContent />
        </Suspense>
    )
}