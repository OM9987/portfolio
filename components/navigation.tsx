"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "home", path: "/" },
    { name: "projects", path: "/projects" },
    { name: "blog", path: "/blog" },
    { name: "about", path: "/about" },
  ]

  return (
    <header className="sticky top-6 z-50 flex justify-center w-full px-4 text-sm font-mono">
      <div className="glass-panel shadow-2xl shadow-emerald-500/10 rounded-full px-6 py-3 w-full max-w-3xl flex items-center justify-between">
        <nav className="flex items-center justify-between w-full relative">
          <Link href="/" className="text-lg font-bold text-white tracking-widest">
            Tenshi Terminal
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white transition-transform duration-200 ease-out active:scale-95"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`command-prompt hover:text-primary transition-colors ${pathname === item.path ? "text-primary" : "text-white"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div
          className={`md:hidden absolute top-[calc(100%+16px)] left-0 w-full glass-panel rounded-2xl overflow-hidden transition-all duration-300 ease-out ${isMenuOpen ? "max-h-72 opacity-100 p-4 border border-white/10" : "max-h-0 opacity-0 p-0 border-transparent"
            }`}
        >
          <div className={`transition-transform duration-300 ease-out ${isMenuOpen ? "translate-y-0" : "-translate-y-2"}`}>
            <ul className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <li
                  key={item.path}
                  className={`transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <Link
                    href={item.path}
                    className={`command-prompt block hover:text-primary transition-colors ${pathname === item.path ? "text-primary" : "text-white"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

