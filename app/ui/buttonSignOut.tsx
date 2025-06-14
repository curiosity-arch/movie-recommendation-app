import stylesButton from "@/public/styles/button.module.css";
import { signOut } from "@/app/auth/auth";
import Image from "next/image";
import SignOut from "@/public/icons/signout.png";

export function ButtonSignOut() {
    return (
        <div>
            <form 
                action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}
            >
                <button className={stylesButton.buttonSignOut}>
                    <Image src={SignOut} alt="Icon SignOut" width={20} height={20}/>
                    <p>Log Out</p>
                </button>
            </form>
        </div>
    );
}