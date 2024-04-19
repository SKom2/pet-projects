import React from 'react';
import styles from './RegisterPage.module.scss';
import AuthForm from '@/components/AuthorizationForm/AuthorizationForm';

const Register = () => {
  return (
    <div className={styles.registerPage}>
      <div className={styles.registerPage__formWrapper}>
        <h1 className={styles.formWrapper__title}>Welcome! Please login.</h1>
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default Register;