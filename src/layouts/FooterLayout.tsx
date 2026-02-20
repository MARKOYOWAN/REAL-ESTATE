import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

/**
 * Interface pour la structure des colonnes du footer.
 */
interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

/**
 * FooterLayout Component
 * Mis à jour avec les coordonnées de Marko William.
 */
const FooterLayout = () => {
  const currentYear = new Date().getFullYear();

  // --- MENU DU FOOTER (Mis à jour) ---
  const sections: FooterSection[] = [
    {
      title: "Navigation",
      links: [
        { label: "Tableau de bord", href: "/" },
        { label: "Nouvelle Analyse", href: "/analyse" },
        { label: "Historique", href: "/historique" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation AI", href: "#" },
        { label: "Support Technique", href: "#" },
        { label: "Confidentialité", href: "#" },
      ],
    },
  ];

  // --- RÉSEAUX SOCIAUX (GitHub, LinkedIn, WhatsApp mis à jour) ---
  const socialLinks = [
    {
      Icon: FaGithub,
      href: "https://github.com/MARKOYOWAN",
      label: "GitHub"
    },
    {
      Icon: FaLinkedin,
      href: "https://www.linkedin.com/in/marko-william-ratsimbazafy/",
      label: "LinkedIn"
    },
    {
      Icon: FaWhatsapp,
      href: "https://wa.me/261347178475", // Format international pour WhatsApp
      label: "WhatsApp"
    },
  ];

  return (
    <footer className="bg-black border-t border-white/5 relative overflow-hidden">

      {/* EFFET DE LUMIÈRE (Glow) */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full filter blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* --- COLONNE 1 : BRANDING --- */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo/logo.png"
                alt="Logo Analyse AI"
                className="w-10 h-10 object-contain"
              />
              <span className="text-white font-black tracking-tighter text-xl">
                REAL<span className="opacity-30">.ESTATE</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
              Système immobilier conçu par Marko William.
            </p>
          </div>

          {/* --- COLONNES 2 & 3 : MENU --- */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em]">
                {section.title}
              </h4>
              <ul className="space-y-4 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/40 hover:text-white transition-all duration-300 font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* --- COLONNE 4 : CONNECT --- */}
          <div>
            <h4 className="text-white font-black mb-6 text-[11px] uppercase tracking-[0.3em]">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank" // Ouvre dans un nouvel onglet
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              Contact : +261 34 71 784 75
            </p>
          </div>
        </div>

        {/* --- BARRE INFÉRIEURE --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">
            © {currentYear} REAL.ESATE — DEVELOPED BY MARKO WILLIAM
          </p>


        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;