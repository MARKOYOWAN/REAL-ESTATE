import { useEffect, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AppProtectionWrapper({ children }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloque Ctrl/Cmd + C, X, V, A
      if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'v', 'a'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()} // Bloque clic droit
      onCopy={(e) => e.preventDefault()}       // Bloque copier
      onCut={(e) => e.preventDefault()}        // Bloque couper
      onPaste={(e) => e.preventDefault()}      // Bloque coller
      onDragStart={(e) => e.preventDefault()}  // Bloque drag & drop de texte/images
      className="app-wrapper"
    >
      {children}
    </div>
  );
}
