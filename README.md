# AI Project Builder

> Generate complete project structures from simple text descriptions. Built with Next.js and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-13+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-blue?logo=tailwind-css)](https://tailwindcss.com/)

## Features

- **Instant Generation**: Transform ideas into runnable project skeletons
- **Smart Templates**: Intelligent file structure and boilerplate code
- **Multiple Languages**: Support for JavaScript and other programming languages
- **Zero Configuration**: Ready-to-run development environment

## Project Structure

```
AI_project_builder/
├── components/              # Reusable UI components
│   ├── AnimatedButton.js   # Interactive button with animations
│   ├── DarkModeToggle.js   # Theme switching component
│   ├── Footer.js           # Application footer
│   ├── Header.js           # Navigation and branding
│   ├── Logo.js             # Brand logo component
│   └── ResultCard.js       # Display generated project results
├── contexts/               # React context providers
│   └── ThemeContext.js     # Global theme state management
├── pages/                  # Next.js pages and API routes
│   ├── _app.js            # Application wrapper and global providers
│   ├── index.js           # Homepage and main interface
│   └── api/               # Backend API endpoints
│       └── generate.js    # AI project generation endpoint
├── styles/                # Global styling
│   └── globals.css        # Base styles and Tailwind imports
├── utils/                 # Utility functions and helpers
│   └── generator.js       # Core project generation logic
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## Quick Start

### Prerequisites

- Node.js 16.0 or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/shahinakt/AI_project_builder.git
cd AI_project_builder

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Usage

1. **Enter your project idea**: Describe your project concept in plain English
2. **Configure options**: Choose whether to include non-JavaScript files
3. **Generate**: Click generate to create your project structure
4. **Download**: Get your complete project skeleton ready to run

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Configuration

The project can be customized through:

- **Next.js Config**: Modify `next.config.js` for framework settings
- **Tailwind Config**: Update `tailwind.config.js` for styling preferences
- **Generator Logic**: Extend `utils/generator.js` for new project templates

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - UI component library
- AI-powered code generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

If you encounter any issues or have questions:

- Email: [your-email@example.com](mailto:your-email@example.com)
- Issues: [GitHub Issues](https://github.com/shahinakt/AI_project_builder/issues)
- Discussions: [GitHub Discussions](https://github.com/shahinakt/AI_project_builder/discussions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/shahinakt">shahinakt</a>
</p>
