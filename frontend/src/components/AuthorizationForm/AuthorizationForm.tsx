'use client'

import React, { FC, useState } from 'react';
import styles from './AuthorizationForm.module.scss';
import { useAppDispatch, useAppSelector } from '@/services/redux/typeHooks';
import { loginUser, registerUser } from '@/services/redux/slices/auth/auth';
import { useRouter } from 'next/navigation';
import Button from '../../ui/Button/Button';
import Link from 'next/link';

interface AuthFormProps {
  type: 'register' | 'login';
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const isRegistration = type === 'register';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useAppSelector(state => state.isLoading);
  const error = useAppSelector(state => state.error);

  console.log(error);

  const submitRegistrationForm = (e: any) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password })).then((resultAction) => {
      if (registerUser.fulfilled.match(resultAction)) {
       router.push('/')
      }
    })
  }

  const submitLoginForm = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((resultAction) => {
      if (loginUser.fulfilled.match(resultAction)){
        router.push('/')
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (

        <form
          onSubmit={isRegistration ? submitRegistrationForm : submitLoginForm}
          className={styles.form}
        >
          {isRegistration && (
            <label className={styles.form__label}>
              <span>Name</span>
              <input
                type="text"
                className={styles.form__input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label className={styles.form__label}>
            <span>Email</span>
            <input
              type="email"
              className={styles.form__input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.form__label}>
            <span>Password</span>
            <input
              type="password"
              className={styles.form__input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <span className={styles.form__error}>{error && error}</span>
          <Button text={isRegistration ? 'Register' : 'Login'} className={styles.form__button} type="submit" />
          {
            isRegistration ? (
              <p className={styles.form__hint}>Already registered? <Link href='/login' className={styles.form__link}>Login</Link></p>
            ) : (
              <p className={styles.form__hint}>Not registered yet? <Link href="/register" className={styles.form__link}>Register</Link></p>
            )
          }
        </form>
      )}
    </>
  );
};

export default AuthForm;
