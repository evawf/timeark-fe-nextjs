import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />

      <main>{children}</main>
      <Footer />
    </>
  );
}
