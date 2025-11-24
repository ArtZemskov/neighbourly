import './globals.css';

export const metadata = {
  title: 'Neighbourly',
  description:
    'A platform for neighbours to connect, organize small volunteering events, and support each other.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
