import React from "react";

export default function Header() {
    return (
      <header className="fixed top-0 left-0 right-0 z-[100] h-12 bg-black/50 backdrop-blur-md font-sf-pro">
        <div className="container mx-auto h-full flex justify-between items-center px-4">
          <a href="/" className="flex items-center">
            <img src="/logotemp.png" alt="SOE@UOWD Webring repository link" width="32" height="32" />
          </a>
          <nav className="flex items-center gap-6">
            <a 
              href="/docs"
              className="text-[rgb(160,160,160)] hover:text-white transition-colors duration-1000 text-sm"
            >
              Docs
            </a>
            <a 
              href="https://github.com/uowd-webring/soe-uowd" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[rgb(160,160,160)] hover:text-white transition-colors duration-1000 text-sm"
            >
              GitHub
            </a>
            <a 
              href="https://www.uowdubai.ac.ae/degrees/bachelors/engineering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[rgb(160,160,160)] hover:text-white transition-colors duration-1000 text-sm"
            >
              SOE@UOWD
            </a>
            <a 
              href="#"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[rgb(160,160,160)] hover:text-white transition-colors duration-1000 text-sm"
            >
              SOCS@UOWD
            </a>
          </nav>
        </div>
      </header>
    )
  }  