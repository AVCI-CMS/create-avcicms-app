# Create AVCI CMS App

The official CLI tool to quickly bootstrap new projects with AVCI CMS. It downloads Next.js templates, automatically configures your `.env` variables, and installs dependencies.

## 🚀 Getting Started

**Important:** Before creating a project, you must create an account and a project on the [AVCI CMS App](https://app.avcicms.com) to obtain your `API Key` and `Project ID`. You will need them during the setup wizard.

### Usage

Simply run the following command in your terminal:

```bash
npx create-avcicms-app
```

The interactive wizard will guide you through:
1. Choosing your project name.
2. Selecting a template (e.g., Next.js Blog, Blank Project).
3. Entering your AVCI CMS API Key and Project ID.

The CLI will automatically set up the `.env` file and run `npm install`.

## Features
- Interactive Wizard
- Fast template downloading (via `degit`)
- Automatic `.env` and `npm install` automation

## Resources
- **Documentation & Guides:** https://doc.avcicms.com
- **Official Website:** https://avcicms.com
- **Help Center:** https://avcicms.com/resources/help-center
