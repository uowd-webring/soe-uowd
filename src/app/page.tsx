'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { students, type Student, majors } from "@/lib/data"
import { Search, X, ChevronDown, Filter } from 'lucide-react'
import Fuse from 'fuse.js'
import Header from '../components/header'

const searchInputStyles = `
  ::-webkit-search-cancel-button,
  ::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }
`

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedMajors, setSelectedMajors] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showYearFilter, setShowYearFilter] = useState(false)
  const [showMajorFilter, setShowMajorFilter] = useState(false)
  const searchIconRef = useRef<SVGSVGElement>(null)
  const tableRef = useRef<HTMLUListElement>(null)
  const searchSectionRef = useRef<HTMLDivElement>(null)
  
  const years = useMemo(() => {
    return Array.from(new Set(students.map(s => s.year.toString()))).sort()
  }, [])

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

  const filteredStudents = useMemo(() => {
    let result = students

    // Apply search query
    if (searchQuery) {
      result = fuse.search(searchQuery).map((result: Fuse.FuseResult<Student>) => result.item)
    }

    // Apply year filter
    if (selectedYears.length > 0) {
      result = result.filter(student => selectedYears.includes(student.year.toString()))
    }

    // Apply major filter
    if (selectedMajors.length > 0) {
      result = result.filter(student => selectedMajors.includes(student.major))
    }

    return result
  }, [searchQuery, selectedYears, selectedMajors])

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

  const toggleYear = (year: string) => {
    setSelectedYears((prev: string[]) => 
      prev.includes(year) 
        ? prev.filter((y: string) => y !== year)
        : [...prev, year]
    )
  }

  const toggleMajor = (major: string) => {
    setSelectedMajors((prev: string[]) => 
      prev.includes(major) 
        ? prev.filter((m: string) => m !== major)
        : [...prev, major]
    )
  }

  const totalFilters = selectedYears.length + selectedMajors.length

  return (
    <main className="min-h-screen min-w-full bg-black font-sf-mono text-[14px] flex flex-col pt-[48px]">
      <Header />

      <div className="flex flex-col flex-nowrap items-center min-h-screen" id="centeredContent">
        <div className="fixed top-[48px] left-0 right-0 h-[350px] bg-black z-[30] mb-0"></div>
        <div className="fixed top-[96px] left-0 right-0 flex flex-col items-center z-[40] pt-12 pb-4">
          <style>{searchInputStyles}</style>
          <h1 className="font-sf-pro font-bold text-[40px] sm:text-[48px] md:text-[64px] text-white tracking-tight mb-2 text-center px-4 transition-all duration-300">
            SOE@UOWD
          </h1>
          <p className="font-sf-compact text-[rgb(160,160,160)] text-sm sm:text-base mb-8 sm:mb-12 text-center px-4 max-w-[90%] sm:max-w-[80%] md:max-w-[65%] transition-all duration-300">
            A collection of portfolio websites from UOWD School of Engineering students
          </p>

          <div ref={searchSectionRef} className="flex flex-col items-center justify-center w-[90%] sm:w-[80%] md:w-[65%] transition-all duration-300">
            <div className="flex flex-row items-center justify-center w-full border-b border-[rgb(160,160,160)]">
              <Search 
                ref={searchIconRef}
                className="h-[15px] w-[15px] text-[rgb(160,160,160)] transition-all duration-300" 
              />
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="search by name / major / year / site"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  onFocus={() => handleSearchFocus(true)}
                  onBlur={() => handleSearchFocus(false)}
                  className="ml-[5px] bg-transparent text-white caret-white border-none h-[20px] outline-none w-full placeholder:text-[rgb(160,160,160)] font-sf-mono text-[14px] focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300"
                  spellCheck={false}
                  maxLength={100}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[rgb(160,160,160)] hover:text-white transition-all duration-300"
                  >
                    <X className="h-[15px] w-[15px]" />
                  </button>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-1 ml-4 text-[rgb(160,160,160)] hover:text-white transition-all duration-300"
                >
                  <Filter className="h-4 w-4" />
                  {totalFilters > 0 && (
                    <span className="text-sm">({totalFilters})</span>
                  )}
                </button>
                {showFilters && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-black border border-[rgb(160,160,160)] rounded-md shadow-lg z-50">
                    <div className="border-b border-[rgb(160,160,160)]">
                      <button
                        onClick={() => setShowYearFilter(!showYearFilter)}
                        className="flex items-center justify-between w-full p-4 text-white hover:text-white transition-all duration-300"
                      >
                        <span>Year {selectedYears.length > 0 && `(${selectedYears.length})`}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showYearFilter ? 'rotate-180' : ''}`} />
                      </button>
                      {showYearFilter && (
                        <div className="px-4 pb-4">
                          <div className="grid grid-cols-2 gap-2">
                            {years.map((year: string) => (
                              <label
                                key={year}
                                className="flex items-center hover:bg-[rgba(160,160,160,0.1)] cursor-pointer text-[rgb(160,160,160)] hover:text-white transition-all duration-300 rounded px-2 py-1"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedYears.includes(year)}
                                  onChange={() => toggleYear(year)}
                                  className="mr-2"
                                />
                                {year}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => setShowMajorFilter(!showMajorFilter)}
                        className="flex items-center justify-between w-full p-4 text-white hover:text-white transition-all duration-300"
                      >
                        <span>Major {selectedMajors.length > 0 && `(${selectedMajors.length})`}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMajorFilter ? 'rotate-180' : ''}`} />
                      </button>
                      {showMajorFilter && (
                        <div className="px-4 pb-4">
                          {majors.map((major: string) => (
                            <label
                              key={major}
                              className="flex items-center hover:bg-[rgba(160,160,160,0.1)] cursor-pointer text-[rgb(160,160,160)] hover:text-white transition-all duration-300 rounded px-2 py-1"
                            >
                              <input
                                type="checkbox"
                                checked={selectedMajors.includes(major)}
                                onChange={() => toggleMajor(major)}
                                className="mr-2"
                              />
                              {major}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                    {totalFilters > 0 && (
                      <div className="p-4 border-t border-[rgb(160,160,160)]">
                        <button
                          onClick={() => {
                            setSelectedYears([])
                            setSelectedMajors([])
                          }}
                          className="w-full text-center text-[rgb(160,160,160)] hover:text-white transition-all duration-300"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-[380px] relative z-0 pb-20">
          <ul ref={tableRef} className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-16 gap-y-6 sm:gap-y-8 w-[90%] sm:w-[80%] md:w-[65%] mx-auto px-4 md:px-0 transition-all duration-300">
            {filteredStudents.map((student: Student, index: number) => (
              <StudentCard 
                key={`${student.name}-${student.year}`} 
                student={student}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

function StudentCard({ student, index }: { student: Student; index: number }) {
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
    <li className="flex flex-col gap-1 opacity-0 animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
      <a
        href={student.portfolioLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col gap-1 text-[rgb(160,160,160)] hover:text-white transition-all duration-300"
      >
        <div className="text-sm sm:text-base">
          {student.name} / {abbreviateMajor(student.major)} / {student.year}
        </div>
        <div className="text-sm opacity-60">
          {host}
        </div>
      </a>
    </li>
  )
}

