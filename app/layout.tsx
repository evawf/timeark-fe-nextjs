import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
