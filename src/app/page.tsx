'use client'

import * as React from 'react'
import { useState, useMemo, useEffect, useRef } from 'react'
import { Input } from "../../components/ui/input"
import { students, type Student } from '../../lib/data'
import { Search, X } from 'lucide-react'
import Header from '../components/header'
import Footer from '../components/footer'
import Fuse from 'fuse.js'

const searchInputStyles = `
  ::-webkit-search-cancel-button,
  ::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }
`

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchIconRef = useRef<SVGSVGElement>(null)
  const tableRef = useRef<HTMLUListElement>(null)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  
  const fuse = new Fuse(students, {
    includeScore: false,
    threshold: 0.4,
    keys: [
      'name',
      'major',
      'year',
      'portfolioLink'
    ]
  })

  const isCompleteYear = (query: string) => /^20\d{2}$/.test(query)

  const filteredStudents = useMemo(() => {
    if (!searchQuery) return students

    // If searching for a complete year (e.g., 2025), only show exact year matches and domain matches
    if (isCompleteYear(searchQuery)) {
      const yearMatches = students.filter(student => student.year.toString() === searchQuery) // Exact year match
      const domainMatches = students.filter(student => student.portfolioLink.includes(searchQuery)) // Domain match
      return [...yearMatches, ...domainMatches]
    }

    // Otherwise use fuzzy search for all fields
    return fuse.search(searchQuery).map(result => result.item)
  }, [searchQuery])

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current && searchSectionRef.current) {
        const tableTop = tableRef.current.getBoundingClientRect().top
        const searchBottom = searchSectionRef.current.getBoundingClientRect().bottom
        const searchHeight = searchSectionRef.current.clientHeight
        
        tableRef.current.style.clipPath = "none"
        let difference = 0
        
        if (tableTop < 0) {
          difference = tableTop * (-1) + searchHeight + 25
        } else if (tableTop <= searchBottom) {
          difference = Math.abs(tableTop - searchBottom) + 25
        } else if (tableTop > searchBottom && Math.abs(tableTop - searchBottom) < 25) {
          difference = 25 - Math.abs(tableTop - searchBottom)
        }
        
        if (tableTop <= 50) {
          tableRef.current.style.clipPath = `inset(${difference}px 0 0 0)`
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchFocus = (focused: boolean) => {
    if (searchIconRef.current) {
      searchIconRef.current.style.filter = focused 
        ? "brightness(0) saturate(100%) invert(93%) sepia(93%) saturate(30%) hue-rotate(125deg) brightness(107%) contrast(106%)"
        : "none"
      searchIconRef.current.style.transition = "1s"
    }
  }

  return (
    <main className="min-h-screen min-w-full bg-black font-sf-mono text-[14px] flex flex-col">
      <Header />

      <div className="flex flex-col flex-nowrap items-center min-h-screen" id="centeredContent">
        <div className="fixed top-0 left-0 right-0 h-[350px] bg-black z-40 mb-0"></div>
        <div className="fixed top-20 left-0 right-0 flex flex-col items-center z-50 pt-12 pb-4">
          <style>{searchInputStyles}</style>
          <h1 className="font-sf-pro font-bold text-[64px] md:text-[64px] text-[40px] text-white tracking-tight mb-2 text-center px-4">
            SOE@UOWD
          </h1>
          <p className="font-sf-compact text-[rgb(160,160,160)] text-base mb-12 text-center px-4">
            A collection of portfolio websites from UOWD School of Engineering students
          </p>

          <div ref={searchSectionRef} className="flex flex-row items-center justify-center mb-8 w-[90%] md:w-[65%] border-b border-[rgb(160,160,160)]">
            <Search 
              ref={searchIconRef}
              className="h-[15px] w-[15px] text-[rgb(160,160,160)]" 
            />
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="search by name / major / year / site"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => handleSearchFocus(true)}
                onBlur={() => handleSearchFocus(false)}
                className="ml-[5px] bg-transparent text-white caret-white border-none h-[20px] outline-none w-full placeholder:text-[rgb(160,160,160)] font-sf-mono text-[14px] focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck={false}
                maxLength={100}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[rgb(160,160,160)] hover:text-white transition-colors duration-300"
                >
                  <X className="h-[15px] w-[15px]" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-[380px] relative z-0 pb-20">
          <ul ref={tableRef} className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-16 gap-y-8 w-[90%] md:w-[65%] mx-auto px-4 md:px-0">
            {filteredStudents.map((student) => (
              <StudentCard key={`${student.name}-${student.year}`} student={student} />
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function StudentCard({ student }: { student: Student }) {
  const cleanUrl = new URL(student.portfolioLink)
  let host = cleanUrl.hostname
  if (host.startsWith('www.')) {
    host = host.substring(4)
  }

  const abbreviateMajor = (major: string) => {
    return major
      .replace('Computer Engineering', 'Comp Eng')
      .replace('Mechanical Engineering', 'Mech Eng')
      .replace('Telecommunications Engineering', 'Tele Eng')
      .replace('Electrical Engineering', 'Elec Eng')
      .replace('Mechatronic Engineering', 'Tron Eng')
      .replace('Civil Engineering', 'Civil Eng')
  }

  return (
    <li className="flex flex-col gap-1">
      <a
        href={student.portfolioLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-1 text-[rgb(160,160,160)] hover:text-white transition-colors duration-1000"
      >
        <div>
          {student.name} / {abbreviateMajor(student.major)} / {student.year}
        </div>
        <div>
          {host}
        </div>
      </a>
    </li>
  )
}

