import LoginForm from './login-form';
import CreateForm from './create-form';
import styles from '@/public/styles/form-styles.module.css';

export default function LoginPage() {
    return (
        <div className={styles.form}>
            <LoginForm />
            <hr />
            <CreateForm />
        </div>
    );
}