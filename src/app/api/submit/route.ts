import { Octokit } from '@octokit/rest'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, major, year, portfolioLink } = await request.json()

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    })

    // Get the current content of students.ts
    const { data: fileData } = await octokit.repos.getContent({
      owner: 'uowd-webring',
      repo: 'soe-uowd',
      path: 'lib/students.ts'
    })

    if ('content' in fileData) {
      // Decode the current content
      const currentContent = Buffer.from(fileData.content, 'base64').toString()
      
      // Create new student entry
      const newStudent = `
    {
        name: "${name}",
        year: ${year},
        major: "${major}",
        portfolioLink: "${portfolioLink}"
    }`

      // Remove the closing bracket and semicolon
      const contentWithoutClosing = currentContent.replace(/\s*\];\s*$/, '')
      
      // Add the new entry and close the array
      const updatedContent = contentWithoutClosing + 
        (contentWithoutClosing.trim().endsWith('}') ? ',\n' : '') + 
        newStudent + '\n];'

      // Create a new branch
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0,8) + '-' + new Date().toISOString().replace(/[^0-9]/g, '').slice(8,14)
      const branchName = `add-${name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`
      
      // Get the main branch reference
      const { data: ref } = await octokit.git.getRef({
        owner: 'uowd-webring',
        repo: 'soe-uowd',
        ref: 'heads/main'
      })

      // Create a new branch
      await octokit.git.createRef({
        owner: 'uowd-webring',
        repo: 'soe-uowd',
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha
      })

      // Update the file in the new branch
      await octokit.repos.createOrUpdateFileContents({
        owner: 'uowd-webring',
        repo: 'soe-uowd',
        path: 'lib/students.ts',
        message: `Add ${name} to webring`,
        content: Buffer.from(updatedContent).toString('base64'),
        branch: branchName,
        sha: fileData.sha
      })

      // Create a pull request
      const { data: pr } = await octokit.pulls.create({
        owner: 'uowd-webring',
        repo: 'soe-uowd',
        title: `Add ${name} to webring`,
        head: branchName,
        base: 'main',
        body: `Adding ${name} to the SOE@UOWD webring.
        
Details:
- Name: ${name}
- Major: ${major}
- Year: ${year}
- Portfolio: ${portfolioLink}

This PR was automatically generated from the webring submission form on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString('en-US', { hour12: false })}.`
      })

      return NextResponse.json({ 
        success: true, 
        message: 'Your submission has been received! A pull request has been created and will be reviewed soon.',
        prUrl: pr.html_url
      })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Could not read the students file. Please try again later.' 
    }, { status: 500 })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An error occurred while submitting your information. Please try again or contact support.' 
    }, { status: 500 })
  }
} 