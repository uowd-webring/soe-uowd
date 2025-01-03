import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'

export default function DocsPage() {
  return (
    <main className="min-h-screen min-w-full bg-black font-sf-mono text-[14px] flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 font-sf-pro">SOE@UOWD Webring Documentation</h1>
          
          <section className="mb-12">
            <p className="text-[rgb(160,160,160)] mb-8 text-lg">
              Welcome to the University of Wollongong Dubai's School of Engineering Webring! This initiative connects portfolio websites of our current students and alumni, creating a vibrant community showcase of engineering talent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl text-white mb-4 font-sf-pro font-medium">What is a Webring?</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-lg">
              A webring is a collection of websites linked together in a circular structure, allowing visitors to navigate from one site to another. Our webring specifically showcases the work and achievements of UOWD's engineering students and graduates.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl text-white mb-4 font-sf-pro font-medium">Eligibility Requirements</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-lg">
              Before joining the webring, please ensure you meet the following criteria:
            </p>
            <ul className="list-disc list-inside text-[rgb(160,160,160)] space-y-2 text-lg ml-4">
              <li>You are currently enrolled in or have graduated from the UOWD School of Engineering</li>
              <li>You have a personal portfolio website that is:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>Publicly accessible on the internet</li>
                  <li>Contains your own work, projects, or professional information</li>
                  <li>Regularly maintained and functional</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl text-white mb-4 font-sf-pro font-medium">How to Join the Webring</h2>
            
            <div className="mb-8">
              <h3 className="text-xl text-white mb-3 font-sf-pro">Method 1: Using GitHub (Recommended for those familiar with Git)</h3>
              <ol className="list-decimal list-inside text-[rgb(160,160,160)] space-y-2 text-lg ml-4">
                <li>Fork our repository at <a href="https://github.com/uowd-webring/soe-uowd" className="text-white hover:text-[rgb(200,200,200)] transition-colors duration-300">github.com/uowd-webring/soe-uowd</a></li>
                <li>Add your information to the <code className="bg-[rgba(160,160,160,0.1)] px-2 py-1 rounded">students.ts</code> file located in <code className="bg-[rgba(160,160,160,0.1)] px-2 py-1 rounded">/src/lib</code> in the following format:</li>
                <pre className="bg-[rgba(160,160,160,0.1)] p-4 rounded mt-2 mb-2 overflow-x-auto">
{`{
    name: "Your Name",
    year: YYYY,
    major: "Your Engineering Major",
    portfolioLink: "https://your-portfolio-url.com"
}`}
                </pre>
                <li>Submit a pull request to our main repository</li>
                <li>Wait for the maintainers to review and approve your submission (give us 1 to 2 business days)</li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="text-xl text-white mb-3 font-sf-pro">Method 2: Manual Submission (For those new to Git)</h3>
              <ol className="list-decimal list-inside text-[rgb(160,160,160)] space-y-2 text-lg ml-4">
                <li>Fill out our online submission form at [Form URL]</li>
                <li>Include the following information:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                    <li>Your full name</li>
                    <li>Portfolio website URL</li>
                    <li>Expected graduation year or alumni status</li>
                    <li>Engineering major</li>
                  </ul>
                </li>
                <li>Wait for the maintainers to review and approve your submission (give us 12 to 14 business days)</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl text-white mb-4 font-sf-pro font-medium">Technical Support</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-lg">
              Need help? We're here to assist. You can do one of the following:
            </p>
            <ul className="list-disc list-inside text-[rgb(160,160,160)] space-y-2 text-lg ml-4">
              <li>Open an issue on our <a href="https://github.com/uowd-webring/soe-uowd/issues" className="text-white hover:text-[rgb(200,200,200)] transition-colors duration-300">GitHub repository</a></li>
              <li>Email our technical team at <a href="mailto:uowdwebring@proton.me" className="text-white hover:text-[rgb(200,200,200)] transition-colors duration-300">uowdwebring@proton.me</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4 font-sf-pro font-medium">Maintenance and Updates</h2>
            <p className="text-[rgb(160,160,160)] mb-4 text-lg">
              The webring is maintained by fellow students. For updates or changes to your information, please submit a new pull request or fill out the form above.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
} 