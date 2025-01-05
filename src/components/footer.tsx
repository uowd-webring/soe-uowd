'use client'

import React, { useEffect, useState } from 'react'

export default function Footer() {
  const [lastUpdate, setLastUpdate] = useState<string>('')

  useEffect(() => {
    async function fetchLastUpdate() {
      try {
        const response = await fetch('https://api.github.com/repos/uowd-webring/soe-uowd/commits?per_page=1')
        const [latestCommit] = await response.json()
        const date = new Date(latestCommit.commit.committer.date)
        setLastUpdate(date.toLocaleDateString())
      } catch (error) {
        console.error('Error fetching last update:', error)
        setLastUpdate('1/1/2025') // Fallback date
      }
    }

    fetchLastUpdate()
  }, [])

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md z-[100] h-12">
      <div className="container mx-auto h-full flex justify-between items-center px-4">
        <h2 className="font-sf-pro text-white text-sm">
          SOE@UOWD Webring 
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative flex">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
          </div>
          <p className="text-[rgb(160,160,160)] text-sm">
            Updated {lastUpdate}
          </p>
        </div>
      </div>
    </footer>
  )
} 