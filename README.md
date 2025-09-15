# THOTI PACIFIQUE NIBISHAKA - Personal Portfolio Website

A modern, responsive, and professional portfolio website with dark/light mode toggle showcasing skills, education, and projects.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes with persistent preference
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Accessibility**: Keyboard navigation support and proper contrast ratios
- **Performance Optimized**: Fast loading with minimal JavaScript
- **Contact Form**: Functional contact form with validation
- **Social Integration**: Links to GitHub and other social profiles
- **Auto-Updating**: Copyright year updates automatically

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styling with dark/light mode support
├── script.js           # JavaScript for interactivity and theme toggle
├── 1000217198.jpg      # Professional headshot
├── README.md           # This file
└── DEPLOYMENT.md        # Deployment instructions
```

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **Toggle theme** using the moon/sun button in the navigation
4. **Customize** the content as needed (see customization section below)

## 🌙 Dark/Light Mode

The website features a built-in theme toggle that allows users to switch between:
- **Light Mode**: Clean, bright interface perfect for daytime viewing
- **Dark Mode**: Easy-on-the-eyes dark interface for low-light environments

**Features:**
- Theme preference is saved in browser localStorage
- Smooth transitions between themes
- All components adapt to the selected theme
- Accessible color contrasts in both modes

## 🎨 Skills Section

Updated technical skills with proper icons:
- **HTML5** - Web markup language
- **CSS3** - Styling and layout
- **Java** - Object-oriented programming
- **Oracle SQL** - Database management
- **PHP** - Server-side scripting

## 🌐 Deployment Options

### GitHub Pages (Recommended)

1. **Create a GitHub repository** for your portfolio
2. **Upload all files** to the repository
3. **Go to Settings** → **Pages**
4. **Select source**: Deploy from a branch
5. **Choose branch**: main/master
6. **Save** and wait for deployment
7. **Access your site** at `https://yourusername.github.io/repository-name`

### Netlify

1. **Drag and drop** your project folder to [Netlify](https://netlify.com)
2. **Or connect** your GitHub repository
3. **Deploy** automatically with custom domain support

### Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Run**: `vercel` in your project directory
3. **Follow** the setup prompts

## 🔧 Customization Guide

### Theme Customization

#### Adding Custom Colors
Modify CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #333333;
    --text-secondary: #555555;
    --accent-primary: #3498db;
    --accent-secondary: #f39c12;
}
```

#### Dark Mode Colors
```css
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #b0b0b0;
}
```

### Personal Information

Edit the following sections in `index.html`:

#### Hero Section
```html
<h1 class="hero-title">Hello, I'm <span class="highlight">YOUR NAME</span></h1>
<p class="hero-subtitle">Your Title | Your Specialty | Your Goal</p>
```

#### Skills Section
```html
<div class="skill-item">
    <i class="fab fa-react"></i>
    <span>React</span>
</div>
```

**Available Icons**: Font Awesome icons (fab fa-*, fas fa-*)

### Profile Picture

1. **Replace** `1000217198.jpg` with your own image
2. **Update** the src attribute in HTML if filename changes
3. **Recommended size**: 400x400 pixels or similar square aspect ratio
4. **Format**: JPG, PNG, or WebP
5. **Optimize** for web (compress to reduce file size)

## 📱 Responsive Breakpoints

The website is optimized for:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Advanced Customization

### Adding New Skills

1. **Add skill item** in HTML:
```html
<div class="skill-item">
    <i class="fab fa-your-icon"></i>
    <span>Skill Name</span>
</div>
```

2. **Choose appropriate icon** from Font Awesome
3. **Test** in both light and dark modes

### Theme Toggle Customization

The theme toggle button can be customized in `styles.css`:

```css
.theme-btn {
    background: none;
    border: 2px solid #3498db;
    color: #3498db;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* Add your custom styles */
}
```

### Contact Form Integration

For a functional contact form, integrate with services like:

- **Formspree**: Add action URL to form
- **Netlify Forms**: Add `netlify` attribute
- **EmailJS**: Add JavaScript integration

## 🛠️ Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile browsers**: iOS Safari, Chrome Mobile

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements, consider contributing back to help others!

## 📞 Support

If you need help customizing or deploying your portfolio:

1. **Check** this README for common solutions
2. **Search** for similar issues online
3. **Contact** the original developer if needed

## 🎯 Performance Tips

1. **Optimize images** before uploading
2. **Minify CSS/JS** for production
3. **Use CDN** for external resources
4. **Enable compression** on your web server
5. **Test** on various devices and browsers
6. **Test theme switching** on all devices

## 🌟 New Features Added

- ✅ **Dark/Light Mode Toggle** - Persistent theme switching
- ✅ **Auto-Updating Copyright** - Year updates automatically
- ✅ **Updated Skills** - Proper icons for HTML5, CSS3, Java, Oracle SQL, PHP
- ✅ **Enhanced Responsiveness** - Theme toggle works on all devices
- ✅ **Improved Accessibility** - Better contrast in both themes

---

**Built with ❤️ by THOTI PACIFIQUE NIBISHAKA**

GitHub: [https://github.com/Thotipaccy](https://github.com/Thotipaccy)
Email: thotipaccy@gmail.com
