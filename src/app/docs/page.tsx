'use client'

import Header from '@/src/components/header'

export default function DocsPage() {
  return (
    <main className="min-h-screen min-w-full bg-black font-sf-mono text-[14px] flex flex-col pt-[48px]">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 flex-grow">
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 font-sf-pro transition-all duration-300">
            SOE@UOWD Webring Documentation
          </h1>
          
          <section className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            <p className="text-[rgb(160,160,160)] mb-8 text-base sm:text-lg transition-all duration-300">
              Welcome to the University of Wollongong Dubai's School of Engineering Webring! This initiative connects portfolio websites of our current students and alumni, creating a vibrant community showcase of engineering talent.
            </p>
          </section>

          <section className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-sf-pro font-medium transition-all duration-300">What is a Webring?</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-base sm:text-lg transition-all duration-300">
              A webring is a collection of websites linked together in a circular structure, allowing visitors to navigate from one site to another. Our webring specifically showcases the work and achievements of UOWD's engineering students and graduates.
            </p>
          </section>

          <section className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '300ms' }}>
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-sf-pro font-medium transition-all duration-300">Eligibility Requirements</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-base sm:text-lg transition-all duration-300">
              Before joining the webring, please ensure you meet the following criteria:
            </p>
            <ul className="list-disc list-inside text-[rgb(160,160,160)] space-y-2 text-base sm:text-lg ml-4 transition-all duration-300">
              <li className="hover:text-white transition-all duration-300">You are currently enrolled in or have graduated from the UOWD School of Engineering</li>
              <li className="hover:text-white transition-all duration-300">You have a personal portfolio website that is:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li className="hover:text-white transition-all duration-300">Publicly accessible on the internet</li>
                  <li className="hover:text-white transition-all duration-300">Contains your own work, projects, or professional information</li>
                  <li className="hover:text-white transition-all duration-300">Regularly maintained and functional</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '400ms' }}>
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-sf-pro font-medium transition-all duration-300">How to Join the Webring</h2>
            
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl text-white mb-3 font-sf-pro transition-all duration-300">Method 1: Using GitHub (Recommended for those familiar with Git)</h3>
              <ol className="list-decimal list-inside text-[rgb(160,160,160)] space-y-2 text-base sm:text-lg ml-4 transition-all duration-300">
                <li className="hover:text-white transition-all duration-300">Fork our repository at <a href="https://github.com/uowd-webring/soe-uowd" className="text-white hover:text-[rgb(200,200,200)] transition-all duration-300">github.com/uowd-webring/soe-uowd</a></li>
                <li className="hover:text-white transition-all duration-300">Add your information to the <code className="bg-[rgba(160,160,160,0.1)] px-2 py-1 rounded">students.ts</code> file located in <code className="bg-[rgba(160,160,160,0.1)] px-2 py-1 rounded">/src/lib</code> in the following format:</li>
                <pre className="bg-[rgba(160,160,160,0.1)] p-4 rounded mt-2 mb-2 overflow-x-auto text-sm sm:text-base">
{`{
    name: "Your Name",
    year: YYYY,
    major: "Your Engineering Major",
    portfolioLink: "https://your-portfolio-url.com"
}`}
                </pre>
                <li className="hover:text-white transition-all duration-300">Submit a pull request to our main repository</li>
                <li className="hover:text-white transition-all duration-300">Wait for the maintainers to review and approve your submission (give us 1 to 2 business days)</li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-lg sm:text-xl text-white mb-3 font-sf-pro transition-all duration-300">Method 2: Manual Submission (For those new to Git)</h3>
              <ol className="list-decimal list-inside text-[rgb(160,160,160)] space-y-2 text-base sm:text-lg ml-4 transition-all duration-300">
                <li className="hover:text-white transition-all duration-300">Fill out our online submission form at [Form URL]</li>
                <li className="hover:text-white transition-all duration-300">Include the following information:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                    <li className="hover:text-white transition-all duration-300">Your full name</li>
                    <li className="hover:text-white transition-all duration-300">Portfolio website URL</li>
                    <li className="hover:text-white transition-all duration-300">Expected graduation year or alumni status</li>
                    <li className="hover:text-white transition-all duration-300">Engineering major</li>
                  </ul>
                </li>
                <li className="hover:text-white transition-all duration-300">Wait for the maintainers to review and approve your submission (give us 12 to 14 business days)</li>
              </ol>
            </div>
          </section>

          <section className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '500ms' }}>
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-sf-pro font-medium transition-all duration-300">Technical Support</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-base sm:text-lg transition-all duration-300">
              Need help? We're here to assist. You can do one of the following:
            </p>
            <ul className="list-disc list-inside text-[rgb(160,160,160)] space-y-2 text-base sm:text-lg ml-4 transition-all duration-300">
              <li className="hover:text-white transition-all duration-300">Open an issue on our <a href="https://github.com/uowd-webring/soe-uowd/issues" className="text-white hover:text-[rgb(200,200,200)] transition-all duration-300">GitHub repository</a></li>
              <li className="hover:text-white transition-all duration-300">Email our technical team at <a href="mailto:uowdwebring@proton.me" className="text-white hover:text-[rgb(200,200,200)] transition-all duration-300">uowdwebring@proton.me</a></li>
            </ul>
          </section>

          <section className="opacity-0 animate-fadeIn" style={{ animationDelay: '600ms' }}>
            <h2 className="text-xl sm:text-2xl text-white mb-4 font-sf-pro font-medium transition-all duration-300">Maintenance and Updates</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-base sm:text-lg transition-all duration-300">
              The webring is maintained by fellow students. For updates or changes to your information, please submit a new pull request or fill out the form above.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
} 