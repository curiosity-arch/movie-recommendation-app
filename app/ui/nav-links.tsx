import Link from 'next/link';
import styles_navtop from '@/public/styles/on-top-nav.module.css';

const OnTopBar = () => {
    const menuItems = [
        { name: 'Home', path: '#home'},
        { name: 'Film', path: '#film'},
        { name: 'About', path: '#about'}
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

export { OnTopBar };