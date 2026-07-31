import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Английский без потолка | B2 → C2",
    template: "%s | Английский без потолка",
  },
  description:
    "Помогаю тем, кто застрял на B2, выйти на C1-C2 и сдать IELTS/Cambridge — без воды, только то, что реально работает.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
