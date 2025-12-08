import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Neighbourly',
  description:
    'A platform for neighbours to connect, organize small volunteering events, and support each other.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
