'use client'

import styles from "./page.module.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/services/redux/typeHooks';
import { getCurrentUser, logout } from '@/services/redux/slices/auth/auth';
import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Posts from '@/components/Posts/Posts';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.isLoading);
  useEffect(() => {
    dispatch(getCurrentUser()).then((resultAction) => {
      if (getCurrentUser.rejected.match(resultAction)) {
        router.push('/login');
      }
    });
  }, [dispatch, router]);




  return (
    <main className={styles.main}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Hero />
          {/*<Posts />*/}
        </>
      )}
    </main>
  );
}
