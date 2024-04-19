import React, { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  download?: string;
  onClick?: (e: any) => void;
}

const Button: FC<ButtonProps> = ({ text, className, type = 'button', href, download, onClick }) => {
  const buttonClassName = `${styles.button} ${className || ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
      >
        {text}
      </a>
    );
  }

  return (
    <button className={buttonClassName} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
