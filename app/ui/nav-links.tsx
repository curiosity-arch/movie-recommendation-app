import Link from 'next/link';
import styles from '@/public/styles/side-nav.module.css';
import styles_navtop from '@/public/styles/on-top-nav.module.css';
import { ButtonSignOut } from './button';

const SideBar = () => {
    const menuItems = [
        { name: 'Home', path: '/dashboard'},
        { name: 'Film', path: '/dashboard/film'},
        { name: 'User', path: '/dashboard/user'},
        { name: 'Admin', path: '/dashboard/admin'},
    ];

    return (
        <>
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={styles.item}
                >
                    {item.name}
                </Link>
            ))}
            <div>
                <ButtonSignOut />
            </div>
        </>
    );
};

const OnTopBar = () => {
    const menuItems = [
        { name: 'Home', path: '#home'},
        { name: 'Film', path: '#film'},
    ];

    return (
        <>
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={styles_navtop.item}
                >
                    {item.name}
                </Link>
            ))}
        </>
    );

};

export { SideBar, OnTopBar };