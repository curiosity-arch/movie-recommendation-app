"use client";

import { createUser, State } from "@/app/lib/createUser";
import { useState, useActionState, useEffect} from "react";
import { useRouter } from "next/navigation";
import stylesButton from "@/public/styles/button.module.css";

export default function CreateFormUser() {
    const initialState: State = { message: null, errors: {}, success: false };
    const [ state, formAction ] = useActionState(createUser, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state?.success) {
            router.push('/home');
        }
    }, [state?.success, router]);
    
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

    return (
        <form action={formAction}>
            <label htmlFor="usernameCreate">
                Username
            </label>
            <input
                type="text"
                name="usernameCreate"
                id="usernameCreate"
                placeholder="Input Username"
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

            <div>
                <button
                    type="submit"
                    className={stylesButton.buttonSignIn}
                >
                    Register
                </button>
                {state?.message &&
                    <p>{state.message}</p>
                }
            </div>
        </form>
    );
}