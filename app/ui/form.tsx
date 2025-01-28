import styles from '@/public/styles/form-styles.module.css';
import YearSelectionForm from '@/app/ui/years-selection';
import { createData, loginUser } from '@/app/lib/actions';

export default function Login() {
    return (
        <div className={styles.form}>
            <div className={styles.login_form}>
                <h2 className={styles.h2}>Login</h2>
                <form action={loginUser}>
                    <label htmlFor="username-login">Username</label>
                    <input type="text" name='username_login' id="username-login" maxLength={10} required/>
                    <label htmlFor="password-login">Password</label>
                    <input type="password" name='password_login' id="password-login" maxLength={6} required/><br />
                    <button type="submit" className={styles.button}>Login</button>
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