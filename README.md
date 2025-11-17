# Ashby BART Station - Mixed-Use Development Website

A professional real estate developer/investor website showcasing the mixed-use development opportunity at the Ashby BART Station in Berkeley, California.

## Project Overview

This website presents a premier transit-oriented development opportunity featuring:

- **750-1,200 housing units** with at least 50% affordable housing
- **4.4 acres** of prime real estate at Shattuck and Ashby Avenues
- Direct adjacency to **Ashby BART Station**
- Mixed-use development with residential, retail, and office components
- Full compliance with R-BMU zoning and Assembly Bill 2923

## Property Details

- **Address:** 3101 Martin Luther King Jr Way & 3100 Adeline St, Berkeley, CA 94703
- **Parcel Number:** 53-1597-39-4
- **Size:** Approximately 4.4 acres
- **Zoning:** R-BMU (Residential-BART Mixed Use)
- **Current Use:** Surface parking lot

## Features

The website includes:

1. **Hero Section** - Eye-catching introduction with key statistics
2. **Project Overview** - Detailed description of residential and commercial components
3. **Property Specifications** - Complete property details and zoning information
4. **Strategic Location** - Transit access and neighborhood context
5. **Market Opportunity** - Analysis of strengths, considerations, and target demographics
6. **Political & Regulatory** - Overview of supportive policy environment
7. **Investment Inquiry Form** - Contact form for interested parties
8. **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** React with modern hooks
- **Font:** Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Build

Create a production build:

```bash
npm run build
```

### Production

Run the production server:

```bash
npm start
```

## Project Structure

```
/app
  ├── layout.tsx       # Root layout with metadata
  ├── page.tsx         # Main landing page
  └── globals.css      # Global styles
/public               # Static assets
```

## Customization

To customize the website:

1. **Content:** Edit `app/page.tsx` to modify text, statistics, and sections
2. **Styling:** Adjust Tailwind classes or add custom CSS in `app/globals.css`
3. **Images:** Add property images to the `/public` directory
4. **Metadata:** Update SEO information in `app/layout.tsx`
5. **Contact Form:** Integrate form backend in the `handleSubmit` function

## Target Audience

- Real estate developers
- Investment firms
- City planners and officials
- Community stakeholders
- Potential tenants and businesses

## Development Phases

The project is designed to support:

- Pre-development marketing
- Investor presentations
- Community engagement
- Regulatory approval processes
- Ongoing project updates

## Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **AWS**
- **Google Cloud**
- Any platform supporting Node.js

## License

Copyright © 2025 Ashby BART Station Development. All rights reserved.

## Contact

For inquiries about this development opportunity, please use the contact form on the website or reach out directly to the project team.
