import styles from './Input.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

export function Textarea({ label, id, ...props }: TextareaProps) {
  return (
    <div className={styles.inputWrapper}>
      <textarea id={id} className={styles.input} placeholder=" " {...props} required />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
