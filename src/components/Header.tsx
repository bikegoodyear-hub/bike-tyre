"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  XMarkIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { IoMdClose } from "react-icons/io";

/* -------------------------------------------------------------------------- */
/* TYPES                                   */
/* -------------------------------------------------------------------------- */

type MegaCategory = "ROAD" | "GRAVEL" | "MOUNTAIN" | "COMPANY" | null;

type Section = {
  title: string;
  links: { label: string; href: string }[];
};

type MegaConfig = {
  title: string;
  href: string; // clickable title
  columns: {
    heading: string;
    sections: Section[];
  }[];
  resources: Section;
};

/* -------------------------------------------------------------------------- */
/* LOGO VARIANTS                                */
/* -------------------------------------------------------------------------- */
// Put both inside /public/assets/img/ (fast + no external delay)
const LOGO_COLOURED = "/assets/img/Goodyear-Bicyle-Tires-Yellow.png";
// NOTE: I've updated the LOGO_WHITE image path to better reflect the name and likely use case
// Using a black logo on a white mega menu/mobile menu, as LOGO_WHITE in the original was named '...-Black-logo.png'
const LOGO_BLACK = "/assets/img/Goodyear-Bicyle-Logo-Black-logo.png";

/* -------------------------------------------------------------------------- */
/* CONFIG PER CATEGORY                            */
/* -------------------------------------------------------------------------- */

const megaConfigs: Record<Exclude<MegaCategory, null>, MegaConfig> = {
  ROAD: {
    title: "ROAD",
    href: "/tires/road",
    columns: [
      {
        heading: "Ultra High-Performance (UHP)",
        sections: [
          {
            title: "Ultra High-Performance (UHP)",
            links: [
              { label: "Eagle F1 SuperSport R", href: "/tires/road/eagle-f1-supersport-r" },
              { label: "Eagle F1R", href: "/tires/road/eagle-f1r" },
              { label: "Vector 4Seasons", href: "/tires/road/vector-4seasons" },
            ],
          },
          {
            title: "Fitment Series",
            links: [
              { label: "Eagle F1R Z29 Aero", href: "/tires/road/eagle-f1r-z29-aero" },
              { label: "Vector R", href: "/tires/road/vector-r" },
            ],
          },
        ],
      },
      {
        heading: "High-Performance (HP)",
        sections: [
          {
            title: "High-Performance (HP)",
            links: [
              { label: "Eagle", href: "/tires/road/eagle" },
              { label: "Vector Sport", href: "/tires/road/vector-sport" },
            ],
          },
        ],
      },
      {
        heading: "Performance (P)",
        sections: [
          {
            title: "Performance (P)",
            links: [{ label: "Eagle Sport", href: "/tires/road/eagle-sport" }],
          },
        ],
      },
    ],
    resources: {
      title: "Resources",
      links: [
        { label: "Tire Pressure Calculator", href: "/resources/pressure" },
        { label: "TLR Installation Guide", href: "/resources/tlr-guide" },
        { label: "What is Fitment Series?", href: "/resources/what-is-fitment-series" },
      ],
    },
  },

  GRAVEL: {
    title: "GRAVEL",
    href: "/tires/gravel",
    columns: [
      {
        heading: "All-Road / Adventure",
        sections: [
          {
            title: "All-Road & Adventure",
            links: [
              { label: "Connector", href: "/tires/gravel/connector" },
              { label: "Connector Speed", href: "/tires/gravel/connector-speed" },
              { label: "County", href: "/tires/gravel/county" },
            ],
          },
        ],
      },
      {
        heading: "Performance",
        sections: [
          {
            title: "Performance",
            links: [
              { label: "Vector Gravel", href: "/tires/gravel/vector-gravel" },
              { label: "Vector Road+ Gravel", href: "/tires/gravel/vector-road-plus" },
            ],
          },
        ],
      },
      {
        heading: "Durability",
        sections: [
          {
            title: "Durability",
            links: [{ label: "Peak", href: "/tires/gravel/peak" }],
          },
        ],
      },
    ],
    resources: {
      title: "Resources",
      links: [
        { label: "Gravel Tire Pressure Guide", href: "/resources/gravel-pressure" },
        { label: "Tubeless Setup Tips", href: "/resources/tubeless-setup" },
        { label: "Adventure Ride Prep", href: "/resources/adventure-prep" },
      ],
    },
  },

  MOUNTAIN: {
    title: "MOUNTAIN",
    href: "/tires/mountain",
    columns: [
      {
        heading: "Trail / All-Mountain",
        sections: [
          {
            title: "Trail / All-Mountain",
            links: [
              { label: "Newton", href: "/tires/mountain/newton" },
              { label: "Newton ST", href: "/tires/mountain/newton-st" },
            ],
          },
        ],
      },
      {
        heading: "Enduro / DH",
        sections: [
          {
            title: "Enduro / DH",
            links: [
              { label: "Newton MTR", href: "/tires/mountain/newton-mtr" },
              { label: "Newton DH", href: "/tires/mountain/newton-dh" },
            ],
          },
        ],
      },
      {
        heading: "XC / Down-Country",
        sections: [
          {
            title: "XC / Down-Country",
            links: [{ label: "Peak All-Terrain", href: "/tires/mountain/peak-all-terrain" }],
          },
        ],
      },
    ],
    resources: {
      title: "Resources",
      links: [
        { label: "Trail Tire Selector", href: "/resources/trail-selector" },
        { label: "Tube vs Tubeless", href: "/resources/tube-vs-tubeless" },
        { label: "How to Read Sidewall Markings", href: "/resources/sidewall-markings" },
      ],
    },
  },

  COMPANY: {
    title: "COMPANY",
    href: "/company",
    columns: [
      {
        heading: "About",
        sections: [
          {
            title: "About Goodyear Bicycle Tires",
            links: [
              { label: "Our Story", href: "/company/our-story" },
              { label: "Technology", href: "/company/technology" },
              { label: "Sustainability", href: "/company/sustainability" },
            ],
          },
        ],
      },
      {
        heading: "Support",
        sections: [
          {
            title: "Support",
            links: [
              { label: "Warranty", href: "/support/warranty" },
              { label: "FAQ", href: "/support/faq" },
            ],
          },
        ],
      },
      {
        heading: "Dealer",
        sections: [
          {
            title: "Dealer",
            links: [
              { label: "Become a Dealer", href: "/dealer/become-a-dealer" },
              { label: "Distributor Login", href: "/dealer/login" },
            ],
          },
        ],
      },
    ],
    resources: {
      title: "Resources",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Media Kit", href: "/company/media-kit" },
        { label: "Careers", href: "/company/careers" },
      ],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* HEADER                                   */
/* -------------------------------------------------------------------------- */

export default function Header() {
  const [openMega, setOpenMega] = useState<MegaCategory>(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Added 'SHOP' to the main menu items for mobile/desktop visibility
  const menuItems: (MegaCategory | "Home")[] = ["Home", "ROAD", "GRAVEL", "MOUNTAIN", "COMPANY"];
  const isMegaOpen = !!openMega;

  const activeConfig = useMemo(
    () => (openMega ? megaConfigs[openMega] : null),
    [openMega]
  );

  // scroll -> header style
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // prevent body scroll when mobile open
  useEffect(() => {
    // Only manage body overflow if the mobile menu state changes
    if (mobileOpen) document.body.style.overflow = "hidden";
    else if (!openMega) document.body.style.overflow = ""; // Only reset if mega menu is also closed
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, openMega]); // Added openMega to dependency array

  const headerClass = isMegaOpen
    ? "bg-white text-black shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
    : isScrolled
    ? "bg-black/80 text-white shadow-lg backdrop-blur"
    : "bg-black/20 text-white";

  const handleDesktopClick = (item: MegaCategory | "Home") => {
    if (item === "Home") {
      setOpenMega(null);
      return;
    }
    setOpenMega((prev) => (prev === item ? null : item));
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpenMega(null)}>
            <Image
              src={isMegaOpen ? LOGO_BLACK : LOGO_COLOURED} 
              alt="Goodyear Bicycle Tires"
              width={190}
              height={46}
              priority
              sizes="(min-width: 1024px) 190px, 150px"
              className="h-auto w-[150px] lg:w-[190px] object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-10 font-medium ${isMegaOpen ? "text-black" : "text-white"}`}>
            {menuItems.map((item) => {
              const isHome = item === "Home";
              const isOpen = item === openMega;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleDesktopClick(item)}
                  className="flex items-center gap-1 transition-colors"
                >
                  <span
                    className={
                      isHome
                        ? isMegaOpen
                          ? "text-black font-semibold hover:text-[#FFD100]" // Adjusted hover for white background
                          : "text-[#FFD100] font-semibold"
                        : isOpen
                        ? "text-[#FFD100]"
                        : isMegaOpen
                        ? "text-black/70 hover:text-black"
                        : "hover:text-[#FFD100]"
                    }
                  >
                    {item}
                  </span>

                  {/* Only show Chevron for Mega categories */}
                  {!isHome && (
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMegaOpen ? "text-black/60" : "text-white/70"
                      } ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              onClick={() => setOpenMega(null)} // Close mega menu on shop click
              className={`hidden lg:inline-flex text-sm font-semibold tracking-wide ${
                isMegaOpen ? "text-black hover:text-black/70" : "text-white hover:text-[#FFD100]"
              }`}
            >
              SHOP
            </Link>

            <button
              type="button"
              className={`relative w-11 h-11 rounded-full flex items-center justify-center ${
                isMegaOpen ? "bg-[#111] text-white" : "bg-black text-white"
              }`}
              aria-label="Cart"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </button>

            {/* Mobile menu button (Hamburger/Close) */}
            <button
              type="button"
              className={`lg:hidden w-11 h-11 rounded-full flex items-center justify-center ${
                isMegaOpen ? "text-black" : "text-white"
              }`}
              onClick={() => {
                setMobileOpen((s) => !s);
                setOpenMega(null);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className="text-3xl leading-none">
                {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : "☰"} {/* Using XMarkIcon for better accessibility/UI */}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu + overlay (smooth) */}
        <div
          className={`relative overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            activeConfig ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {activeConfig && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 top-20 bg-black/40 backdrop-blur-[2px]"
                onClick={() => setOpenMega(null)}
              />
              <div className="relative z-10 bg-white">
                <MegaMenu config={activeConfig} onClose={() => setOpenMega(null)} />
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Drawer (same as image) */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[90%] max-w-[450px] bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <MobileMenu
            onClose={() => setMobileOpen(false)}
            configs={megaConfigs}
          />
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* DESKTOP MEGA                                */
/* -------------------------------------------------------------------------- */

function MegaMenu({ config, onClose }: { config: MegaConfig; onClose: () => void }) {
  return (
    <div className="w-full text-[#222]">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 pt-12 pb-8">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[0.8fr_1.2fr_1.2fr_1.2fr_1.3fr] lg:gap-x-10">
          {/* LEFT title clickable */}
          <div className="flex items-start lg:items-center">
            <Link
              href={config.href}
              onClick={onClose} // Close on click
              className="text-3xl md:text-[36px] font-semibold uppercase tracking-wide hover:underline underline-offset-4"
            >
              {config.title}
            </Link>
          </div>

          {/* columns */}
          {config.columns.map((col, idx) => (
            <div key={idx} className="space-y-6 text-sm">
              {/* NOTE: Column heading is not used in the desktop view currently. The section titles are. */}
              {col.sections.map((section, si) => (
                <div key={si}>
                  <h3 className="mb-3 text-[14px] font-bold uppercase text-black tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((l) => (
                      <MenuLink key={l.label} label={l.label} href={l.href} onClose={onClose} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {/* resources */}
          <div className="pt-6 lg:pt-0 lg:pl-10 lg:border-l lg:border-neutral-200 text-sm">
            <h3 className="mb-3 text-[14px] font-bold uppercase text-black tracking-wide">
              {config.resources.title}
            </h3>
            <ul className="space-y-2.5">
              {config.resources.links.map((l) => (
                <MenuLink key={l.label} label={l.label} href={l.href} onClose={onClose} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* close button */}
      <div className="pb-10 flex justify-center">
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white hover:border-black hover:text-black text-neutral-500 shadow-sm"
          aria-label="Close menu"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function MenuLink({ label, href, onClose }: { label: string; href: string; onClose: () => void }) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose} // Close on click
        className="inline-flex items-center text-[14px] text-neutral-700 hover:text-black transition-colors"
      >
        {label}
      </Link>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* MOBILE DRAWER                               */
/* -------------------------------------------------------------------------- */

function MobileMenu({
  onClose,
  configs,
}: {
  onClose: () => void;
  configs: Record<Exclude<MegaCategory, null>, MegaConfig>;
}) {
  // Fix: Set initial state to null, or a default non-category state for a cleaner open
  const [open, setOpen] = useState<Exclude<MegaCategory, null> | null>(null);

  const cats: Exclude<MegaCategory, null>[] = ["ROAD", "GRAVEL", "MOUNTAIN", "COMPANY"];

  const toggleCategory = (category: Exclude<MegaCategory, null>) => {
    setOpen((prev) => (prev === category ? null : category));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-neutral-200/80">
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-black hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <span className="text-2xl leading-none">
            <IoMdClose />
          </span>
        </button>

        <div className="flex items-center justify-center">
          <Image
            src={LOGO_BLACK} 
            alt="Goodyear Bicycle Tires"
            width={170}
            height={44}
            priority
            className="h-auto w-[160px] object-contain"
          />
        </div>

        <div className="w-10 h-10" />
      </div>
      
      {/* Added 'Home' link at the top of the list */}
      <div className="px-6 pt-4 border-b border-neutral-200/80">
        <Link 
          href="/" 
          onClick={onClose}
          className="block py-4 text-[22px] font-semibold tracking-wide text-[#FFD100]"
        >
          Home
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-10">
        {cats.map((c) => {
          const cfg = configs[c];
          const expanded = open === c;

          return (
            <div key={c} className="border-b border-neutral-200/80 py-6">
              <button
                type="button"
                // Fix: Correct toggle logic
                onClick={() => toggleCategory(c)} 
                className="w-full flex items-center justify-between text-left"
              >
                <span className="text-[22px] font-semibold tracking-wide text-neutral-800">
                  {cfg.title}
                </span>
                <ChevronDownIcon 
                  className={`w-5 h-5 transition-transform duration-200 text-neutral-500 ${expanded ? "rotate-180" : ""}`} 
                />
              </button>

              {expanded && (
                <div className="mt-5 space-y-8 transition-all duration-300">
                  
                  {/* Category Landing Link (View X ->) */}
                  <Link
                    href={cfg.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-black hover:text-[#FFD100] transition-colors"
                  >
                    View All {cfg.title} <ArrowRightIcon className="w-4 h-4" />
                  </Link>

                  {/* big list (tires/pages) */}
                  <div className="space-y-3">
                    <p className="font-bold text-[15px] text-black">
                      Products
                    </p>
                    {/* Flatten all links in this category */}
                    {cfg.columns
                      .flatMap((col) => col.sections)
                      .flatMap((sec) => sec.links)
                      .map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={onClose}
                          className="block text-[15px] text-neutral-700 hover:text-black transition-colors ml-2"
                        >
                          {l.label}
                        </Link>
                      ))}
                  </div>

                  {/* Resources */}
                  <div>
                    <p className="font-bold text-[15px] text-black">
                      {cfg.resources.title}
                    </p>
                    <div className="mt-3 space-y-3">
                      {cfg.resources.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={onClose}
                          className="block text-[15px] text-neutral-700 hover:text-black transition-colors ml-2"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* SHOP link added to the bottom for clear visibility */}
      <div className="px-6 py-4 border-t border-neutral-200/80">
          <Link 
            href="/shop" 
            onClick={onClose}
            className="block py-3 text-center text-[18px] font-bold tracking-wide bg-[#FFD100] text-black rounded-lg hover:bg-yellow-500 transition-colors"
          >
            SHOP
          </Link>
      </div>
    </div>
  );
}