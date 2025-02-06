'use client'

import Link from 'next/link';
import styles from '@/public/styles/side-nav.module.css';
import styles_navtop from '@/public/styles/on-top-nav.module.css';

const SideBar = () => {
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

const OnTopBar = () => {
    const menuItems = [
        { name: 'Home', path: '#home'},
        { name: 'Film', path: '#film'},
        { name: 'Logout', path: '/home/logout'},
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