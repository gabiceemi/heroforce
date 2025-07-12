import styles from './Input.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
}

export function Select({ label, id, options, ...props }: SelectProps) {
  return (
    <div className={styles.inputWrapper}>
      <select id={id} className={styles.input} {...props} required>
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
}
