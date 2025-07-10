import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🦸‍♂️ HeroForce</h1>
        <p>
          Bem-vindo à sua plataforma de gestão de projetos heroicos.
          Organize, acompanhe e vença suas batalhas com eficiência, agilidade e muito heroísmo!
        </p>
        <button className={styles.cta}>
          Comece agora 🚀
        </button>
      </main>

      <footer className={styles.footer}>
        © 2025 HeroForce. Todos os direitos reservados.
      </footer>
    </div>
  );
}
