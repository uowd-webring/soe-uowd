'use client'

import { useState } from 'react'
import { majors } from '@/lib/data'

export default function AddPage() {
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    year: new Date().getFullYear().toString(),
    portfolioLink: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string, prUrl?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      setSubmitStatus({
        type: response.ok ? 'success' : 'error',
        message: data.message,
        prUrl: data.prUrl
      })
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your information. Please try again or contact support.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen min-w-full bg-black font-sf-mono text-[14px] flex flex-col pt-[48px]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 flex-grow">
        <div className="max-w-xl mx-auto animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 font-sf-pro">
            Join the SOE@UOWD Webring
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-white mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-[rgba(160,160,160,0.1)] text-white border border-[rgba(160,160,160,0.2)] focus:border-white focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="major" className="block text-white mb-2">Engineering Major</label>
              <select
                id="major"
                name="major"
                required
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-[rgba(160,160,160,0.1)] text-white border border-[rgba(160,160,160,0.2)] focus:border-white focus:outline-none transition-colors [&>option]:bg-black appearance-none"
              >
                <option value="" disabled>Select your major</option>
                {majors.map((major) => (
                  <option key={major} value={major} className="text-white bg-black">
                    {major}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-white mb-2">Year of Graduation</label>
              <input
                type="number"
                id="year"
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                min="2000"
                max="2100"
                className="w-full px-4 py-2 rounded-md bg-[rgba(160,160,160,0.1)] text-white border border-[rgba(160,160,160,0.2)] focus:border-white focus:outline-none transition-colors [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="2024"
              />
            </div>

            <div>
              <label htmlFor="portfolioLink" className="block text-white mb-2">Portfolio Link</label>
              <input
                type="url"
                id="portfolioLink"
                name="portfolioLink"
                required
                value={formData.portfolioLink}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-[rgba(160,160,160,0.1)] text-white border border-[rgba(160,160,160,0.2)] focus:border-white focus:outline-none transition-colors"
                placeholder="https://your-portfolio.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-white text-black hover:bg-[#f0f0f0] active:bg-[#e0e0e0]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {submitStatus && (
            <div
              className={`mt-6 p-4 rounded-md ${
                submitStatus.type === 'success'
                  ? 'bg-green-900/50 text-green-200'
                  : 'bg-red-900/50 text-red-200'
              }`}
            >
              <p>{submitStatus.message}</p>
              {submitStatus.prUrl && (
                <p className="mt-2">
                  <a
                    href={submitStatus.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    View your pull request
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 