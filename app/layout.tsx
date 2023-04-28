import "./globals.css";
import { GlobalContextProvider } from "../lib/context/store";
import Layout from "./components/layout";

export const metadata = {
  title: "TimeArk",
  description:
    "TimeArk is a client, project, task and invoice management platform which is created by freelancer for freelancer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <Layout>
            <main>{children}</main>
          </Layout>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
