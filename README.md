# Authentication Dashboard App

A beautiful and professional authentication flow with dashboard built using Next.js, TypeScript, and SCSS Modules.

## Features

- Authentication page with Iranian phone number validation
- Comprehensive dashboard displaying user information
- Beautiful, responsive UI with professional design
- Mobile-first responsive design
- Context-based state management
- TypeScript for type safety
- Schema-based validation with Zod
- Reusable components with forwardRef

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **Validation**: Zod
- **State Management**: React Context API
- **Data Source**: Local API.json file

## Quick Start

### Option 1: One-Click Setup (Windows - Recommended)
1. Download or clone this repository
2. Double-click `install.bat` 
3. Everything will be set up automatically:
   - Checks for Node.js installation
   - Installs dependencies if needed
   - Starts the development server
   - Opens the application in your browser

### Option 2: Manual Setup (All Platforms)
1. Ensure Node.js is installed
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Requirements

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Modern web browser

## Project Structure

```
src/
├── app/
│   ├── auth/           # Authentication page
│   ├── dashboard/      # Dashboard page
│   ├── globals.scss    # Global styles
│   └── layout.tsx      # Root layout
├── components/
│   └── UI/
│       ├── Button/     # Reusable button component
│       └── Input/      # Reusable input component
├── contexts/
│   └── AuthContext.tsx # Authentication context
├── types/
│   └── user.ts         # User type definitions
└── utils/
    └── validation.ts   # Zod validation schemas
```

## Routes

- `/` - Root route (redirects to auth or dashboard)
- `/auth` - Authentication page
- `/dashboard` - User dashboard (protected route)

## Features

### Authentication Page
- Iranian mobile number validation (11 digits starting with 09)
- Beautiful gradient design with professional UI
- Form validation with real-time error messages
- Modern, clean interface

### Dashboard Page
- Comprehensive user information display
- Responsive card-based layout
- Professional styling with hover effects
- Protected route with automatic redirect

### Reusable Components
- **Input Component**: Configurable input with validation support
- **Button Component**: Multiple variants with loading states
- **ForwardRef**: Proper ref forwarding for form controls

## Validation

The app uses Zod for schema-based validation:
- Phone number must be exactly 11 digits
- Must start with "09" (Iranian mobile format)
- Real-time validation feedback

## Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Flexible grid layouts
- Touch-friendly interface

## Build & Deploy

### Local Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy automatically

### Deploy to Netlify
1. Run `npm run build`
2. Upload the `out` folder to Netlify

## GitHub Repository Setup

This project is ready for GitHub:
- `install.bat` provides one-click setup for Windows users
- `.gitignore` excludes unnecessary files
- Complete documentation included
- No environment variables required
