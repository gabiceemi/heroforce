// src/components/Input/Input.tsx
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Input({ label, id, ...props }: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <input id={id} className={styles.input} {...props} required />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
