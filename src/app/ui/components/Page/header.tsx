import Link from "next/link";

export default  function Header(){


    return (
        <header className="bg-blue-600 p-4">
        <nav className="container mx-auto flex justify-between">
          <div className="text-white font-bold text-xl">My Website</div>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" legacyBehavior>
                <a className="text-white">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/home" legacyBehavior>
                <a className="text-white">Home page</a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="text-white">About</a>
              </Link>
            </li>
            <li>
              <Link href="/contacts" legacyBehavior>
                <a className="text-white">Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/blog/posts" legacyBehavior>
                <a className="text-white"> blog posts</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}