# Rahul Pandey's Personal Website

[![Deploy Status](https://github.com/iRahulPandey/irahulpandey.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/iRahulPandey/irahulpandey.github.io/actions/workflows/deploy.yml)

A modern, responsive personal website built with Hugo and deployed to GitHub Pages.

<!-- Test commit to trigger GitHub Actions CI/CD pipeline -->

## 🚀 Features

- **Fast & Modern**: Built with Hugo static site generator
- **Responsive Design**: Mobile-first approach with dark/light mode
- **Professional Content**: Showcasing expertise in AI, MLOps, and cloud architecture
- **Automated Deployment**: CI/CD pipeline with GitHub Actions
- **SEO Optimized**: Search engine friendly with proper meta tags

## 🛠️ Technology Stack

- **Static Site Generator**: Hugo
- **Theme**: GitHub Style
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Styling**: Custom CSS with responsive design

## 📝 Content

- **Homepage**: Professional overview and technical skills
- **Blog Posts**: Technical articles on machine learning, cloud architecture, and web development
- **Responsive Images**: Optimized SVG images for all screen sizes
- **Reading Time**: Automatic calculation for all blog posts

## 🔧 Development

### Local Development

```bash
# Install Hugo (if not already installed)
brew install hugo

# Clone the repository
git clone https://github.com/iRahulPandey/irahulpandey.github.io.git
cd irahulpandey.github.io

# Start the development server
hugo server --buildDrafts --port 1313
```

### Building for Production

```bash
# Build the site
hugo --minify

# The built site will be in the `public/` directory
```

## 📁 Project Structure

```
├── .github/workflows/     # GitHub Actions CI/CD
├── content/              # Site content (posts, pages)
├── layouts/              # Custom templates
├── static/               # Static assets (images, CSS)
├── themes/               # Hugo theme (GitHub Style)
└── config.yaml          # Site configuration
```

## 🚀 Deployment

The site is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. The deployment process:

1. **Build**: Hugo builds the static site
2. **Deploy**: GitHub Actions deploys to GitHub Pages
3. **Status**: Build status is shown in the badge above

## 📧 Contact

- **Email**: rpandey1901@gmail.com
- **LinkedIn**: [Rahul Pandey](https://www.linkedin.com/in/rahulpandey1901/)
- **GitHub**: [iRahulPandey](https://github.com/iRahulPandey)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
