import React from 'react';
import styles from './Posts.module.scss';
import Post from '@/components/Post/Post';

const posts = [
  {
    id: 1,
    title: 'Making a design system from scratch',
    date: '12 Feb 2020',
    stack: 'Design, Pattern',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  },
  {
    id: 2,
    title: 'Creating pixel perfect icons in Figma',
    date: '13 Feb 2020',
    stack: 'Figma, Icon Design',
    text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  }
]

const Posts = () => {
  return (
    <section className={styles.posts}>
      <div className={styles.posts__container}>
        <div className={styles.posts__heading}>
          <h2 className={styles.posts__title}>Recent posts</h2>
          <span className={styles.posts__all}>View All</span>
        </div>
        <ul className={styles.posts__cards}>
          {
            posts.map((post) => (
              <li className={styles.post__card} key={post.id}>
                <Post title={post.title} date={post.date} stack={post.stack} text={post.text} />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  );
};

export default Posts;