'use client'

import React from "react"
import Link from "next/link"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted && isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, mounted])

  React.useEffect(() => {
    setMounted(true)
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const menuItems = [
    { name: "Docs", href: "/docs" },
    { name: "Add Portfolio", href: "/add" },
    { name: "GitHub", href: "https://github.com/uowd-webring/soe-uowd", external: true },
    { name: "SOE@UOWD", href: "https://www.uowdubai.ac.ae/degrees/bachelors/engineering", external: true },
    { name: "SOCS@UOWD", href: "#", external: true },
  ]

  const renderLink = (item: typeof menuItems[0], className: string) => {
    if (item.external) {
      return (
        <a
          href={item.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.name}
        </a>
      )
    }
    return (
      <Link href={item.href} className={className}>
        {item.name}
      </Link>
    )
  }

  if (!mounted) return null

  return (
    <>
      <Navbar 
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="fixed top-0 bg-black/50 backdrop-blur-md z-[100] h-[48px] transition-all duration-300"
        classNames={{
          wrapper: "px-4 h-[48px] max-w-full",
          content: "h-[48px] gap-3",
          brand: "h-[48px]",
          toggle: "text-[rgb(160,160,160)] hover:text-white transition-all duration-300",
          menuItem: "py-2",
          base: "h-[48px]",
        }}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link href="/" className="flex items-center">
              <img src="/logotemp.png" alt="SOE@UOWD Webring repository link" width="32" height="32" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex" justify="end">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              {renderLink(
                item,
                "text-[rgb(160,160,160)] hover:text-white transition-all duration-300 text-sm"
              )}
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>
      </Navbar>

      {/* Mobile Menu Overlay with Animation */}
      <div 
        className={`fixed inset-0 top-[48px] bg-black/95 backdrop-blur-md z-[90] transition-all duration-300 transform ${
          isMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] py-8 px-4">
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className={`w-full py-3 transform transition-all duration-300 delay-[${index * 100}ms] ${
                isMenuOpen 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              }`}
            >
              {renderLink(
                item,
                "text-[rgb(160,160,160)] hover:text-white transition-all duration-300 text-lg block w-full text-center"
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}  