import React, { useMemo, useState } from "react";
import Container from "@/components/Container";
import Brandmark from "@/components/Brandmark";
import { useScrollSpy } from "@/components/useScrollSpy";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";

// Color mapping for buttons
const buttonColors = [
  { border: "#95e6cb", text: "#95e6cb" }, // cyan
  { border: "#d4bfff", text: "#d4bfff" }, // purple  
  { border: "#bae67e", text: "#bae67e" }, // green
  { border: "#ffcc66", text: "#ffcc66" }, // yellow
  { border: "#f28779", text: "#f28779" }, // orange
  { border: "#59c2ff", text: "#59c2ff" }, // blue
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const nav = useMemo(
    () => [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Publications", href: "#publications" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  // Extract section IDs for scrollspy
  const sectionIds = nav.map(item => item.href.replace('#', ''));
  const activeSection = useScrollSpy(sectionIds, 200);

  const navWithAccents = nav.map((item, idx) => {
    const colorIndex = idx % buttonColors.length;
    return {
      ...item,
      colorIndex,
      isActive: activeSection === item.href.replace('#', '') && !hoveredItem,
      isHovered: hoveredItem === item.href,
    };
  });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[rgba(31,36,48,0.6)] backdrop-blur">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          {/* Left: Name */}
          <a
            href="#top"
            className="group text-subtext transition-colors hover:text-accent-cyan"
            aria-label="Ojas M"
          >
            <Brandmark className="h-6 w-6" />
            <span className="sr-only">Ojas M</span>
          </a>

          {/* Center: Nav */}
          <nav 
            className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-4 md:flex"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navWithAccents.map((n) => {
              const isHighlighted = n.isHovered || n.isActive;
              const colors = buttonColors[n.colorIndex];
              
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onMouseEnter={() => setHoveredItem(n.href)}
                  className="rounded-xl border px-3 py-1.5 text-sm transition-all duration-300 ease-out"
                  style={{
                    borderColor: isHighlighted ? colors.border : '#2b3240',
                    color: isHighlighted ? colors.text : '#9da5b4'
                  }}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Social links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/ojas-mediratta"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-purple transition-colors"
            >
              <Github className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/ojas-mediratta/"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-blue transition-colors"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="https://www.instagram.com/ojas.mediratta_/"
              target="_blank"
              rel="noreferrer"
              className="text-subtext hover:text-accent-orange transition-colors"
            >
              <Instagram className="size-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-xl border border-border p-2 md:hidden transition-colors hover:border-accent-purple"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div 
            className="grid gap-2 pb-4 md:hidden"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {navWithAccents.map((n) => {
              const isHighlighted = n.isHovered || n.isActive;
              const colors = buttonColors[n.colorIndex];
              
              return (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => setHoveredItem(n.href)}
                  className="rounded-xl border bg-panel px-3 py-2 transition-all duration-500 ease-out"
                  style={{
                    borderColor: isHighlighted ? colors.border : '#2b3240',
                    color: isHighlighted ? colors.text : '#9da5b4'
                  }}
                >
                  {n.label}
                </a>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}