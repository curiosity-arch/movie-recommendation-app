import styles from '@/public/styles/form-styles.module.css';
import YearSelectionForm from '@/app/ui/years-selection';

export default function Login() {
    const maxUsername = 10;
    const maxPassword = 8;

    return (
        <div className={styles.form}>
            <div className={styles.login_form}>
                <h2 className={styles.h2}>Login</h2>
                <form action="">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" maxLength={maxUsername} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" maxLength={maxPassword} required/><br />
                    <button className={styles.button}>Login</button>
                </form>
            </div>
            <div className={styles.hr}>
                <hr />
            </div>
            <div className={styles.register_form}>
                <h2 className={styles.h2}>Register</h2>
                <form action="">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" maxLength={maxUsername} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" maxLength={maxPassword} required/>
                    <label htmlFor="tahun">Tahun Lahir</label>
                    <YearSelectionForm /><br />
                    <button className={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
}