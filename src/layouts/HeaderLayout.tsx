import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiHome, HiOfficeBuilding, HiMenu, HiX } from "react-icons/hi";

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: "Accueil", to: "/", icon: HiHome },
  { label: "Biens", to: "/properties", icon: HiOfficeBuilding },
];

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Scroll effect simplifié
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isSticky
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/logo/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="font-extrabold text-brand-gold text-xl tracking-tight hidden sm:block">
            REAL<span className="opacity-50">.ESTATE</span>
          </span>
        </NavLink>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navItems.map(({ label, to, icon: Icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-semibold transition ${
                      isActive ? "text-black" : "text-black/50 hover:text-black"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <NavLink
            to="/login"
            className="bg-black text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-neutral-800 transition"
          >
            Se connecter
          </NavLink>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2"
        >
          {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <MobileMenu closeMenu={() => setIsOpen(false)} />
      )}
    </header>
  );
};

/* -------------------- */
/*   MOBILE MENU        */
/* -------------------- */

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu = ({ closeMenu }: MobileMenuProps) => {
  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-xl p-8 md:hidden animate-in slide-in-from-top-4">
      <ul className="space-y-6">
        {navItems.map(({ label, to, icon: Icon }) => (
          <li key={label}>
            <NavLink
              to={to}
              onClick={closeMenu}
              className="flex items-center gap-4 text-lg font-bold"
            >
              <Icon size={22} className="text-black/40" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink
        to="/login"
        onClick={closeMenu}
        className="block mt-6 bg-black text-white text-center py-3 rounded-xl font-bold"
      >
        Se connecter
      </NavLink>
    </div>
  );
};

export default Header;
