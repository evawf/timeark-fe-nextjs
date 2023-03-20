import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>Home Page</div>
      <div className={styles.card}>
        <Link href={"/login"}>Login</Link>
      </div>
      <div>
        <Link href={"/signup"}>Sign up</Link>
      </div>
    </main>
  );
}
