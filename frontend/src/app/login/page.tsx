import React from 'react';
import styles from './LoginPage.module.scss';
import AuthForm from '@/components/AuthorizationForm/AuthorizationForm';

const Login = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginPage__formWrapper}>
        <h1 className={styles.formWrapper__title}>Welcome! Please login.</h1>
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;