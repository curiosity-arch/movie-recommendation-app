import Link from 'next/link';
import styles_navtop from '@/public/styles/on-top-nav.module.css';
import styles from '@/public/styles/layoutHome.module.css';

const OnTopBar = () => {
    const menuItems = [
        { name: 'Home', path: '#home'}, // ada di halaman /home
        { name: 'Film', path: '#film'}, // ada di halaman /ChooseMovie
        { name: 'About', path: '#about'} // ada di halaman /home
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

const OnAboutBar = () => {
    const menuItems = [
        { name: 'Home', path: '#home'}, // ada di halaman /home
        { name: 'Film', path: '#film'}, // ada di halaman /ChooseMovie
        { name: 'About', path: '#about'} // ada di halaman /home
    ];

    return (
        <div className={styles.aboutBar}>
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={styles.itemAboutBar}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );

};

export { OnTopBar, OnAboutBar };