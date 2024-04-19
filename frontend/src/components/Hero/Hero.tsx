import React from 'react';
import styles from './Hero.module.scss';
import { useAppSelector } from '@/services/redux/typeHooks';
import Image from 'next/image';
import ProfileIcon from '@/images/Avatar.jpg'
import Button from '../../ui/Button/Button';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__info}>
          <h1 className={styles.hero__greeting}>Hi, I am Aleksandr,
            Frontend Developer</h1>
          <p className={styles.hero__text}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <Button text="Download Resume"  href='/Resume.pdf' download="Resume.pdf"/>
        </div>
        <Image className={styles.hero__profileImage} src={ProfileIcon} alt="Profile Icon" width={243} height={243}></Image>
      </div>
    </section>
  );
};

export default Hero;