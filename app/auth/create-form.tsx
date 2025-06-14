"use client";

import { createUser, State } from "@/app/lib/createUser";
import { useState, useActionState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "@/public/styles/form-styles.module.css";
import stylesButton from "@/public/styles/button.module.css";

export default function CreateForm() {
    const initialState: State = { message: null, errors: {}, success: false };
    const [ state, formAction ] = useActionState(createUser, initialState);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state?.success && state?.username) {
            const passwordInput = document.getElementById("passwordCreate") as HTMLInputElement | null;
            const password = passwordInput ? passwordInput.value : "";

            sessionStorage.setItem("username", state.username);
            sessionStorage.setItem("password", password);

            router.push("/home");
        }
    }, [state?.success, state?.username, router]);
    
    // Mendapatkan tahun saat ini
    const currentYear = new Date().getFullYear();
    
    // Membuat array tahun dari 55 tahun terakhir
    const years = Array.from({ length: 55 }, (_, i) => currentYear - i);

    // State untuk menyimpan tahun yang dipilih
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    // Menangani perubahan tahun
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        startTransition(() => {
            formAction(formData);
        });

        setLoading(false);
    };

    return (
        <div className={styles.register_form}>
            <h2 className={styles.h2}>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="usernameCreate">
                    Username
                </label>
                <input
                    type="text"
                    name="usernameCreate"
                    id="usernameCreate"
                    placeholder="Input Username"
                    minLength={3}
                    required
                />
                <div>
                    {state?.errors?.username &&
                        state.errors.username.map((error: string) => (
                            <p key={error}>
                                {error}
                            </p>
                        ))
                    }
                </div>

                <label htmlFor="passwordCreate">
                    Password
                </label>
                <input
                    type="password"
                    name="passwordCreate"
                    id="passwordCreate"
                    placeholder="Input Password"
                    minLength={6}
                    required
                />

                <label htmlFor="tahunLahir">
                    Tahun Lahir
                </label>
                <select
                    id="tahunLahir"
                    name="tahunLahir"
                    value={selectedYear}
                    onChange={handleYearChange}
                    required
                >
                    <option disabled>Pilih Tahun Lahir</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <div>
                    {state?.errors?.tahunLahir &&
                        state.errors.tahunLahir.map((error: string) => (
                            <p key={error}>
                                {error}
                            </p>
                        ))
                    }
                </div>
                <button
                    type="submit"
                    className={stylesButton.buttonSignIn}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                <div>
                    {state?.message &&
                        <p>{state.message}</p>
                    }
                </div>
            </form>
        </div>
    );
}