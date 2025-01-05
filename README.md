# SOE@UOWD Webring

A collection of portfolio websites from UOWD School of Engineering students. Built with Next.js 13, TypeScript, and Tailwind CSS.

## What is a Webring?
A webring is a collection of websites linked together in a circular structure, allowing visitors to navigate from one site to another. Our webring specifically showcases the work and achievements of UOWD's engineering students and graduates.

## Eligibility Requirements
To join the webring, you must meet the following criteria:

1. **Affiliation**:
   - Currently enrolled in or graduated from the UOWD School of Engineering.

2. **Portfolio Website**:
   - Publicly accessible on the internet.
   - Contains your own work, projects, or professional information.
   - Regularly maintained and functional.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/uowd-webring/soe-uowd.git
cd soe-uowd
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
soe-uowd/
├── src/
│   ├── app/              # App router pages
│   ├── components/       # React components
│   │   ├── ui/          # UI components
│   │   ├── header.tsx   # Site header
│   │   └── footer.tsx   # Site footer
│   └── lib/             # Utilities and data
├── public/              # Static assets
└── styles/             # Global styles
```

## How to Join the Webring

### Method 1: Using GitHub (Recommended for those familiar with Git)
1. Fork our repository at [github.com/uowd-webring/soe-uowd](https://github.com/uowd-webring/soe-uowd).
2. Add your information to the `students.ts` file located in `/src/lib` in the following format:
   ```json
   {
       "name": "Your Name",
       "year": YYYY,
       "major": "Your Engineering Major",
       "portfolioLink": "https://your-portfolio-url.com"
   }
   ```
3. Submit a pull request to our main repository.
4. Wait for the maintainers to review and approve your submission (1-2 business days).

### Method 2: Manual Submission (For those new to Git)
1. Fill out our [online submission form](#).
2. Include the following information:
   - Your full name.
   - Portfolio website URL.
   - Expected graduation year or alumni status.
   - Engineering major.
3. Wait for the maintainers to review and approve your submission (12-14 business days).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technical Support
If you need assistance, you can:

- Open an issue on our [GitHub repository](https://github.com/uowd-webring/soe-uowd/issues).
- Email our technical team at [uowdwebring@proton.me](mailto:uowdwebring@proton.me).

## Maintenance and Updates
The webring is maintained by fellow students. If you need to update or change your information:

- Submit a new pull request.
- Fill out the [online submission form](#).

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Fuse.js](https://fusejs.io/) - Fuzzy search

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

We look forward to seeing your work featured in the SOE@UOWD Webring!
