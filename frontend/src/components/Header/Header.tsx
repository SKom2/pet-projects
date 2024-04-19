import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import Button from '../../ui/Button/Button';
import { logout } from '@/services/redux/slices/auth/auth';
import { useAppDispatch, useAppSelector } from '@/services/redux/typeHooks';
import { useRouter } from 'next/navigation';

const menuItems = [
  {
    id: 1,
    text: 'Works',
    path: '/works'
  },
  {
    id: 2,
    text: 'Blog',
    path: '/blog'
  },
  {
    id: 3,
    text: 'Contact',
    path: '/contact'
  }
];

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.user.name);
  const logoutUser = (e: any) => {
    e.preventDefault();
    dispatch(logout()).then((resultAction) => {
      if (logout.fulfilled.match(resultAction)) {
        router.push('/login')
      }
    })
  }
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <ul className={styles.header__menu}>
          <li className={styles.header__menu_userName}>
            {userName}
          </li>
          {
            menuItems.map((item) => (
              <li key={item.id} className={styles.header__menu_item}>
                <Link href={item.path} className={styles.header__menu_link}>{item.text}</Link>
              </li>
            ))
          }
          <li>
            <Button text="Logout" onClick={logoutUser}/>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;