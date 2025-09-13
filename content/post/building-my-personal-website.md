---
title: "Building My Personal Website with Hugo and GitHub Pages"
date: 2025-01-13T16:00:00Z
draft: false
summary: "A comprehensive guide on how I built my personal website using Hugo static site generator, GitHub Style theme, and automated deployment with GitHub Actions."
tags: ["hugo", "github-pages", "static-site", "web-development", "tutorial"]
---

Building a personal website is one of the best ways to showcase your professional journey and share your knowledge with the world. In this post, I'll walk you through how I built this website using modern tools and best practices.

<!--more-->

## Why Hugo and GitHub Pages?

When deciding on the technology stack for my personal website, I considered several factors:

- **Performance**: Static sites load incredibly fast
- **Simplicity**: Easy to maintain and update
- **Cost**: Free hosting with GitHub Pages
- **SEO**: Better search engine optimization
- **Security**: No database or server-side vulnerabilities

![Website Demo Image](/images/website-demo.svg)

## The Technology Stack

Here's what I used to build this website:

### Core Technologies
- **Hugo**: Fast static site generator written in Go
- **GitHub Style Theme**: Clean, professional theme inspired by GitHub
- **GitHub Pages**: Free hosting for static websites
- **GitHub Actions**: Automated CI/CD pipeline
- **Markdown**: Content authoring format

### Development Tools
- **Task Master AI**: Project management and task automation
- **Git**: Version control
- **VS Code**: Code editor with Hugo extensions

## Step-by-Step Build Process

### 1. Project Initialization

I started by setting up the project structure using Task Master AI:

```bash
# Initialize Hugo site
hugo new site . --force

# Add GitHub Style theme as submodule
git submodule add https://github.com/MeiK2333/github-style.git themes/github-style
```

### 2. Configuration Setup

The heart of any Hugo site is its configuration. I created a comprehensive `config.yaml`:

```yaml
baseURL: "https://irahulpandey.github.io"
languageCode: "en-us"
title: "Rahul Pandey's Blog"
theme: "github-style"

params:
  author: "Rahul Pandey"
  description: "Senior Solutions Architect at adidas | Cloud AI & MLOps Specialist"
  github: "iRahulPandey"
  linkedin: "https://www.linkedin.com/in/rahulpandey1901/"
  email: "rpandey1901@gmail.com"
  keywords: "cloud AI, MLOps, machine learning, solutions architecture, data analytics, Python, adidas"
```

### 3. Content Creation

Creating content in Hugo is straightforward with Markdown:

#### Homepage Content
I created a detailed `content/readme.md` file that serves as the main homepage content, showcasing my professional background and expertise.

#### Blog Posts
Each blog post follows a consistent structure:

```markdown
---
title: "Post Title"
date: 2025-01-13T10:00:00Z
draft: false
summary: "Brief description"
tags: ["tag1", "tag2"]
---

Content introduction here.

<!--more-->

## Main Content

Detailed content with proper formatting...
```

### 4. Theme Customization

The GitHub Style theme provided most of what I needed, but I made some customizations:

#### Custom User Profile Template
I created a custom `layouts/partials/user-profile.html` to:
- Display the full LinkedIn URL correctly
- Remove unwanted social media links (Twitter/X, RSS)
- Maintain the professional appearance

#### Image Handling
Images are stored in the `static/images/` directory and referenced in posts:

![Hugo Logo Demo](/images/hugo-logo-demo.svg)

### 5. Advanced Features

#### Dark/Light Mode Toggle
The theme includes built-in dark/light mode functionality with:
- Automatic system preference detection
- Persistent user preferences
- Smooth theme transitions

#### LaTeX Support
For mathematical expressions, I configured LaTeX rendering:

```yaml
markup:
  math:
    enable: true
    use: "katex"
```

This allows for beautiful mathematical formulas like:

$$\bar{X} \sim N(\mu, \frac{\sigma^2}{n})$$

#### Code Syntax Highlighting
Hugo's built-in syntax highlighting works perfectly:

```python
def build_website():
    """Build a personal website with Hugo"""
    site = HugoSite()
    site.configure_theme("github-style")
    site.add_content("blog posts")
    site.deploy_to_github_pages()
    return "Success!"
```

## Website Architecture

Here's a visual overview of how the website is structured and deployed:

![Website Architecture](/images/website-architecture.svg)

## Deployment Strategy

### GitHub Actions CI/CD

I set up automated deployment using GitHub Actions:

```yaml
name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
      
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      
      - run: hugo --minify
      
      - uses: actions/deploy-pages@v2
```

### Benefits of This Approach

1. **Automated Deployment**: Every push to main branch triggers a rebuild
2. **Version Control**: All changes are tracked in Git
3. **Rollback Capability**: Easy to revert to previous versions
4. **Collaboration**: Others can contribute via pull requests

## Performance Optimizations

### Build Optimizations
- **Minification**: CSS and JavaScript are minified
- **Image Optimization**: Images are optimized for web
- **Static Generation**: No server-side processing needed

### SEO Enhancements
- **Meta Tags**: Comprehensive meta tag configuration
- **Structured Data**: Proper HTML structure for search engines
- **Sitemap**: Automatic sitemap generation
- **RSS Feed**: Built-in RSS feed for content syndication

## Lessons Learned

### What Worked Well
1. **Task Master AI**: Excellent for project management and task tracking
2. **Hugo's Speed**: Incredibly fast build times
3. **GitHub Integration**: Seamless deployment workflow
4. **Theme Quality**: GitHub Style theme is well-designed and maintained

### Challenges and Solutions
1. **Theme Customization**: Required understanding of Hugo's templating system
2. **Image Management**: Needed to organize images properly in static directory
3. **Content Structure**: Required planning for consistent content organization

## Future Enhancements

I'm planning to add several features:

- **Search Functionality**: Full-text search across all posts
- **Comment System**: Enable discussions on blog posts
- **Analytics**: Track visitor engagement and popular content
- **Newsletter**: Email subscription for new posts
- **Portfolio Section**: Showcase projects and achievements

## Resources and Tools

### Documentation
- [Hugo Documentation](https://gohugo.io/documentation/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Style Theme](https://github.com/MeiK2333/github-style)

### Useful Commands
```bash
# Start development server
hugo server -D

# Build for production
hugo --minify

# Create new post
hugo new post/my-new-post.md

# Check site locally
hugo server --buildDrafts
```

## Conclusion

Building this personal website has been an excellent learning experience. The combination of Hugo, GitHub Pages, and modern development practices creates a powerful, maintainable, and professional web presence.

The key to success was:
- **Planning**: Using Task Master AI for structured development
- **Iteration**: Building incrementally and testing frequently
- **Automation**: Leveraging GitHub Actions for seamless deployment
- **Content**: Focusing on valuable, well-structured content

Whether you're a developer, data scientist, or any professional, having a personal website is invaluable for showcasing your work and building your online presence.

---

*Have you built a personal website? I'd love to hear about your experience and any tips you might have! Feel free to reach out on [LinkedIn](https://www.linkedin.com/in/rahulpandey1901/) or [email me](mailto:rpandey1901@gmail.com).*
