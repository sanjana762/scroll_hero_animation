import "./globals.css";

export const metadata = {
  title: "Scroll Hero Animation",
  description: "Scroll-driven hero section animation assignment"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}