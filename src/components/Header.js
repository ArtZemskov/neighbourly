import Link from 'next/link';
import HeaderAuthStatus from './HeaderAuthStatus';

const Header = () => {
  return (
    <header className="border-b border-zinc-900 bg-black">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-wide">
          Neighbourly
        </Link>

        <div className="flex items-center gap-6">
          <nav className="flex gap-4 text-sm text-zinc-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/events" className="hover:text-white">
              Events
            </Link>
            <Link href="/information" className="hover:text-white">
              Information
            </Link>
          </nav>
          <HeaderAuthStatus />
        </div>
      </div>
    </header>
  );
};

export default Header;
