# SOE@UOWD Webring

A directory of student portfolios from the School of Engineering at UOWD.

## Adding Your Portfolio

To add your portfolio to the webring:

1. Fork this repository
2. Edit \`lib/data.ts\`
3. Add your information to the \`students\` array:

\`\`\`typescript
{
  name: "Your Name",
  year: 2024, // Your graduation year
  major: "Computer Science", // Must match one of the predefined majors
  portfolioLink: "https://your-portfolio.com"
}
\`\`\`

4. Create a pull request

## Development

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Run the development server: \`npm run dev\`
4. Open [http://localhost:3000](http://localhost:3000)

## Features

- Fuzzy search for finding students by name or major
- Filter by major and graduation year
- Responsive design
- Built with Next.js and shadcn/ui

## Contributing

Contributions are welcome! Please read the contributing guidelines before making a pull request.
\`\`\`

