'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/public/styles/side-nav.module.css';

const SideBar = () => {
    const pathname = usePathname();
    
    const menuItems = [
        { name: 'Home', path: '/dashboard'},
        { name: 'Film', path: '/dashboard/film'},
        { name: 'User', path: '/dashboard/user'},
        { name: 'Admin', path: '/dashboard/admin'},
        { name: 'Logout', path: '/dashboard/logout'},
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
        </>
    );
};

export default SideBar;