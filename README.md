# Domain Availability Checker

[![Powered by HSINI MOHAMED](https://img.shields.io/badge/Powered%20by-HSINI%20MOHAMED-FFD700?style=for-the-badge&logo=github)](https://github.com/hsinidev)

A modern, fast, and SEO-optimized web application to instantly check the availability of domain names using the WhoisXML API. This project features a sleek dark theme, a TLD selector, detailed WHOIS data display, and is built as a zero-build, single-page application.

## ✨ Features

- **Instant Domain Search:** Quickly check if a domain is available or taken.
- **Multiple TLDs:** Supports popular TLDs including `.com`, `.net`, `.org`, `.io`, `.co`, and `.ai`.
- **Detailed WHOIS Data:** For taken domains, it displays creation date, expiration date, and registrant information.
- **Sleek Dark UI:** A modern, comfortable, and responsive user interface built with Tailwind CSS.
- **API Key Management:** Securely saves your WhoisXML API key in the browser's local storage, so you don't have to enter it every time.
- **Loading & Error States:** Clear visual feedback for API calls in progress and for any potential errors.
- **SEO Optimized:** Includes comprehensive metadata for better search engine ranking and social sharing.
- **Informational Pages:** A clean popup modal provides easy access to About, Contact, Privacy, and other essential information.

## 🚀 Getting Started

### Prerequisites

You need a free or paid API key from [WhoisXML API](https://www.whoisxmlapi.com/) to use this application. The tool will not work without it.

### Usage

1.  Open the `index.html` file in your browser, or deploy the project to a web server.
2.  You will be prompted to enter your **WhoisXML API Key**. Paste your key into the input field.
3.  Enter the domain name you want to check (e.g., `my-awesome-site`).
4.  Select the desired TLD from the dropdown menu.
5.  Click the **"Check"** button.
6.  The result will be displayed instantly below.

## 💻 Tech Stack

- **Framework:** React
- **Styling:** Tailwind CSS (via CDN)
- **API Communication:** Browser `fetch` API
- **Language:** TypeScript

## 📂 Project Structure

```
.
├── public/
│   ├── favicon.svg      # Application favicon
│   ├── robots.txt       # Instructions for search engine crawlers
│   └── sitemap.xml      # Sitemap for search engines
├── components/
│   ├── InfoPopup.tsx    # Modal for informational pages
│   ├── LoadingSpinner.tsx # Reusable loading spinner
│   └── ResultDisplay.tsx  # Component to show availability results
├── App.tsx              # Main application component
├── index.html           # Main HTML entry point with SEO tags
├── index.tsx            # React entry point
├── metadata.json        # Application metadata
├── types.ts             # TypeScript type definitions
└── README.md            # This file
```

## 📄 License

This project is open-source and available for personal and commercial use. Please see the license file for more details.

---

Built with ❤️ by [HSINI MOHAMED](https://github.com/hsinidev).
