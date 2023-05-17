import styles from "./styles.module.css";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={styles.signin}>{children}</section>;
}
