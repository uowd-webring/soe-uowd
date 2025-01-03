'use client'

import { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { students, majors, getUniqueYears, type Student } from '@/lib/data'
import Fuse from 'fuse.js'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMajor, setSelectedMajor] = useState<string | 'all'>('all')
  const [selectedYear, setSelectedYear] = useState<string | 'all'>('all')
  
  const fuse = new Fuse(students, {
    keys: ['name', 'major'],
    threshold: 0.4,
  })

  const filteredStudents = useMemo(() => {
    let results = searchQuery 
      ? fuse.search(searchQuery).map(result => result.item)
      : students

    if (selectedMajor !== 'all') {
      results = results.filter(student => student.major === selectedMajor)
    }

    if (selectedYear !== 'all') {
      results = results.filter(student => student.year === parseInt(selectedYear))
    }

    return results
  }, [searchQuery, selectedMajor, selectedYear])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        SOE@UOWD Webring
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search by name or major..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        
        <div className="flex gap-2">
          <Select
            value={selectedMajor}
            onValueChange={setSelectedMajor}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Majors</SelectItem>
              {majors.map((major) => (
                <SelectItem key={major} value={major}>
                  {major}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {getUniqueYears().map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard key={`${student.name}-${student.year}`} student={student} />
        ))}
      </div>
    </main>
  )
}

function StudentCard({ student }: { student: Student }) {
  return (
    <a
      href={student.portfolioLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full hover:bg-gray-50 transition-colors p-4 cursor-pointer"
    >
      <div className="space-y-1">
        <p className="text-lg">
          {student.name} / {student.major} / {student.year}
        </p>
        <p className="text-gray-600">
          {student.portfolioLink.replace(/(^\w+:|^)\/\//, '')}
        </p>
      </div>
    </a>
  )
}

