import Link from 'next/link';

export default function Header() {
  return (
    <Header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          <span className="bg-blue-700 text-white p-1 rounded">C</span>
          <span>Comparison24</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/fixed-term" className="hover:text-blue-700">Fixed-term</Link>
          <Link href="/savings" className="hover:text-blue-700">Savings</Link>
          <Link href="/banks" className="hover:text-blue-700">Banks</Link>
          <Link href="/guide" className="hover:text-blue-700">Guide</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-700">
            Login
          </Link>
          <Link href="/register" className="bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors">
            Register
          </Link>
        </div>
      </div>
    </Header>
  );
}
