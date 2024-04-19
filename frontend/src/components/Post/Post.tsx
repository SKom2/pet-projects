import React, { FC } from 'react';
import styles from './Post.module.scss';

interface PostProps {
  title: string;
  date: string;
  stack: string;
  text: string;
}

const Post: FC<PostProps> = ({ title, text, stack, date}) => {
  return (
    <article className={styles.post}>
      <div className={styles.post__container}>
        <h3 className={styles.post__title}>{title}</h3>
        <div className={styles.post__info}>
          <span className={styles.post__date}>{date}</span>
          <span className={styles.post__line} />
          <span className={styles.post__stack}>{stack}</span>
        </div>
        <p className={styles.post__text}>{text}</p>
      </div>
    </article>
  );
};

export default Post;