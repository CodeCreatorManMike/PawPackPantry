# Paw Pack Pantry

Paw Pack Pantry is a modern web platform for a Mauritius-based pet food brand offering gourmet homemade pet meals and treats while supporting stray animal welfare through its StreetSmart initiative.

A portion of every sale contributes towards feeding programmes, sterilisation initiatives, medical care, rehabilitation and community education for stray animals across Mauritius.

**Live Website:** [pawpackpantry.com](https://www.pawpackpantry.com/)

## About the Project

The Paw Pack Pantry website serves as the main digital platform for the brand, bringing together its products, ordering information, rescue work, news and community initiatives.

The project was built to provide a fast, responsive and easy-to-navigate experience across desktop and mobile devices while giving Paw Pack Pantry a scalable platform that can grow alongside the business.

## Features

### Product and Menu Experience

* Dedicated product and menu pages
* Pet meals and treats presented in a clear, accessible format
* Product information and pricing
* Customer review content
* Ordering information
* Direct pathways for customers to place orders

### StreetSmart Campaign

The StreetSmart section showcases Paw Pack Pantry's animal welfare mission.

The initiative supports areas including:

* Stray animal feeding programmes
* Sterilisation initiatives
* Veterinary and medical care
* Rescue and rehabilitation
* Community education
* Stray sponsorship and campaign support

### Stray Gallery

A dedicated gallery highlighting animals supported through Paw Pack Pantry and StreetSmart, including rescue stories and updates.

### News and Updates

The website includes a news section for publishing updates such as:

* Paw Pack Pantry news
* StreetSmart campaign updates
* Rescue stories
* Pet-related content
* Community updates
* Product and menu announcements

### Newsletter

Visitors can join the Paw Pack Pantry mailing list to receive updates including:

* New menu releases
* Rescue stories
* Pet advice
* Meal tips
* StreetSmart updates
* Stray spotlights

### Contact and Social Integration

The website provides direct access to Paw Pack Pantry through multiple channels, including:

* Contact information
* WhatsApp
* Instagram
* TikTok
* Email
* Collaboration enquiries

### Administration and Content Management

The project includes administrative functionality for managing areas of the website and its content.

### Backend and Database Integration

The application includes Supabase integration and a dedicated database schema for storing and managing application data.

### Responsive Design

The interface is designed to work across:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

## Tech Stack

The project is built using a modern web development stack.

* [Next.js](https://nextjs.org/)
* React
* TypeScript
* Supabase
* CSS
* Node.js
* npm
* Vercel

## Project Structure

```text
PawPackPantry/
├── app/                  # Next.js application routes and pages
├── components/           # Reusable React components
├── favicon/              # Site favicon assets
├── icons/                # Interface and site icons
├── lib/                  # Shared libraries, utilities and integrations
├── public/               # Static assets
├── .gitignore
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── package-lock.json
├── postcss.config.mjs    # PostCSS configuration
├── supabase-schema.sql   # Supabase database schema
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites

Before running the project locally, make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm

Clone the repository:

```bash
git clone https://github.com/CodeCreatorManMike/PawPackPantry.git
```

Navigate into the project directory:

```bash
cd PawPackPantry
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

Some functionality may require environment variables for services such as Supabase.

Create a `.env.local` file in the root of the project:

```text
.env.local
```

Add the required environment variables for your deployment or development environment.

Environment files containing credentials, API keys or secrets should never be committed to the repository.

## Development

Start the local development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The application will automatically update as changes are made during development.

## Production Build

Create an optimized production build with:

```bash
npm run build
```

Start the production server with:

```bash
npm start
```

## Deployment

The production website is deployed at:

https://www.pawpackpantry.com/

The Next.js application can be deployed through [Vercel](https://vercel.com/) or another platform capable of hosting Next.js applications.

## Database

The repository contains:

```text
supabase-schema.sql
```

This contains the database schema used by the project's Supabase integration.

Database credentials and production secrets should be configured through environment variables rather than stored directly in the repository.

## Mission

Paw Pack Pantry is built around the idea of being **Packed with Purpose**.

Alongside producing homemade pet meals and treats in Mauritius, the brand uses part of the revenue generated through sales to support stray animals and wider animal welfare initiatives through the StreetSmart Campaign.

The website therefore acts as both an online home for the Paw Pack Pantry brand and a platform for communicating and growing its wider social impact.

## Repository

GitHub:

https://github.com/CodeCreatorManMike/PawPackPantry

## Website

https://www.pawpackpantry.com/

---

Paw Pack Pantry — Packed with Purpose.
