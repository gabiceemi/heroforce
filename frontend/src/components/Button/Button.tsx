import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'icon';
};

export function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
