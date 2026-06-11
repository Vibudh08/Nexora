# Nexora Digital - AI-Powered Marketing Agency Website

Nexora Digital is a full-stack marketing agency website built to generate qualified leads, communicate measurable business value, sell paid strategy consultations, answer customer questions, and automate follow-up operations.

The project combines a premium conversion-focused website with a MongoDB-backed lead system, Razorpay Test Mode payments, automated email notifications, a hybrid Gemini AI chatbot, a protected admin dashboard, and a complete technical SEO foundation.

It was developed as a practical full-stack implementation for the Clickseon Web Developer Technical Assessment.

## Links

- **Live website:** [nexora-digital-app.vercel.app](https://nexora-digital-app.vercel.app/)
- **GitHub repository:** [github.com/Vibudh08/Nexora](https://github.com/Vibudh08/Nexora)
- **Admin dashboard:** [nexora-digital-app.vercel.app/admin/leads](https://nexora-digital-app.vercel.app/admin/leads)
- **Admin credentials:** - Username - admin, Password- NexoraAdmin

## Submission Deliverables

| Requirement | Deliverable |
| --- | --- |
| Live website link | [nexora-digital-app.vercel.app](https://nexora-digital-app.vercel.app/) |
| GitHub repository | [github.com/Vibudh08/Nexora](https://github.com/Vibudh08/Nexora) |
| Project documentation | This README explains the technology decisions, architecture, API flows, AI, automation, SEO, security, setup, and deployment |
| Automation evidence | Workflow diagrams are available in [docs/automation-workflow.md](docs/automation-workflow.md) |

## Business Goals

The website is designed around four business outcomes:

1. Build trust quickly through premium visual design and clear positioning.
2. Convert visitors into qualified leads through a free marketing audit.
3. Generate paid bookings through a secure INR 499 strategy-session flow.
4. Reduce manual work through AI assistance, database workflows, and email automation.

## Core Features

### Premium Marketing Website

- Responsive dark-mode design for mobile, tablet, and desktop
- Conversion-focused hero, service, process, results, testimonial, consultation, and CTA sections
- Product-style analytics visuals and measurable outcome messaging
- Smooth Framer Motion interactions with reduced-motion support
- Semantic heading structure and accessible navigation

### Lead Capture and Admin Management

- Free marketing audit form with:
  - Full name
  - Email address
  - Phone number
  - Service interest
  - Business goal/message
- Shared client-side and server-side Zod validation
- MongoDB and Mongoose lead storage
- Loading, field-error, server-error, and success states
- Protected admin dashboard for viewing leads and consultation bookings
- Lead pipeline status management: `new`, `contacted`, `qualified`, and `closed`

### Razorpay Consultation Booking

- INR 499 paid strategy-session offer
- Razorpay Test Mode order creation
- Razorpay Checkout integration
- Server-side HMAC signature verification
- MongoDB booking records
- Payment lifecycle tracking: `created`, `paid`, and `failed`
- Failure updates cannot overwrite an already-paid booking

### Hybrid AI Chatbot

- Floating Nexora Growth Assistant widget
- Gemini Developer API for custom business and growth questions
- Rule-based intent engine for predictable service, pricing, timeline, and booking answers
- Automatic deterministic fallback when Gemini is unavailable
- Quick replies and conversion-focused CTA actions
- Short conversation context sent to Gemini
- Persisted chat history using Zustand and local storage
- Server-only Gemini key, Zod validation, output limits, timeout, and rate limiting

### Email and Workflow Automation

- Customer acknowledgement after a lead submission
- Internal notification for new leads
- Customer payment confirmation after a verified consultation payment
- Internal notification for paid consultation bookings
- HTML escaping for user-provided content inserted into email templates
- Notifications scheduled using Next.js `after()` so SMTP does not delay API responses

### Technical SEO and Performance

- Metadata title and description
- Canonical URL
- Open Graph and Twitter metadata
- Dynamically generated Open Graph image
- Professional Service JSON-LD schema
- `robots.txt`
- `sitemap.xml`
- Web app manifest and custom icon
- Semantic sections and heading hierarchy
- Reduced-motion support
- Global response compression and security headers
- Framework signature header disabled

## Technology Stack

| Area | Technology | Reason |
| --- | --- | --- |
| Application | Next.js App Router | Combines frontend, backend routes, metadata, and deployment in one application |
| Language | TypeScript | Provides strict contracts across forms, APIs, services, stores, and database models |
| UI | React, Tailwind CSS, Lucide React | Supports reusable components, responsive design, and a consistent visual system |
| Motion | Framer Motion | Adds subtle product-style interactions with reduced-motion support |
| Forms | React Hook Form, Zod | Provides efficient form state and shared client/server validation |
| Client requests | Axios | Handles browser-side API requests and error responses |
| Client state | Zustand | Manages payment state and persisted chatbot sessions |
| Database | MongoDB, Mongoose | Stores leads and consultation bookings with schema validation |
| Payments | Razorpay Test Mode | Demonstrates a relevant external API and secure payment verification flow |
| AI | Gemini Developer API | Handles flexible customer questions while keeping the API key server-side |
| Email | Nodemailer, Gmail SMTP | Implements custom lead and payment notification automation |
| Deployment target | Vercel | Suitable for the Next.js App Router and server route handlers |

## Technology Decisions

### Why This Stack Was Selected

- **Next.js App Router** provides server-rendered pages, backend route handlers, metadata APIs, and deployment support in one codebase. This reduces deployment complexity without mixing responsibilities inside the code.
- **TypeScript** improves reliability across the complete application by enforcing shared contracts for form values, API responses, payment data, chatbot messages, and database records.
- **Tailwind CSS and reusable components** make it possible to build a custom responsive visual system quickly while keeping styling consistent.
- **React Hook Form and Zod** provide fast form handling and allow the same validation rules to be enforced in the browser and on the server.
- **MongoDB and Mongoose** suit the lead and booking data because the records are document-oriented, the schema is straightforward, and MongoDB Atlas provides a practical managed deployment option.
- **Razorpay Test Mode** is directly relevant to the business goal of selling consultations and demonstrates real external API integration, error handling, and server-side verification.
- **Gemini with a rule-based fallback** adds flexible AI capability without making the core customer-support experience dependent on an external provider.
- **Nodemailer and Next.js `after()`** provide a custom automation workflow while keeping slow SMTP work outside the form response path.
- **Zustand** is used only where shared client state is useful: payment status and persisted chatbot sessions. Local component state remains local.

### Why the Architecture Is Suitable

The application is intentionally implemented as a modular monolith. A separate frontend, backend, authentication service, and automation platform would add unnecessary operational complexity for this project. Next.js keeps the deployment simple, while the internal layers preserve clear ownership boundaries:

- Components handle presentation.
- Hooks handle browser-side workflows.
- Route handlers handle HTTP validation and responses.
- Services contain business logic.
- Integration modules isolate external providers.
- Mongoose models own persistence schemas.
- Shared Zod schemas and TypeScript types protect contracts between layers.

This structure is easy to explain, test, deploy, and extend. Individual providers such as Gemini, Razorpay, Nodemailer, or MongoDB can be replaced without redesigning the complete application.

## Architecture

The project uses a layered structure so UI, business logic, integrations, validation, and persistence remain separate.

```text
app/
  api/             Route handlers for leads, payments, chatbot, and admin APIs
  admin/           Protected lead and booking dashboard
  layout.tsx       Global metadata, viewport, and organization schema
  page.tsx         Marketing homepage composition

components/
  admin/           Admin dashboard UI
  chatbot/         Chat widget and messages
  forms/           Lead and consultation forms
  layout/          Navigation and footer
  sections/        Homepage business sections
  seo/             Structured data
  ui/              Reusable UI components

hooks/             Client-side lead, payment, and admin workflows

lib/
  chatbot/         Rule-based intent engine
  constants/       Shared site and consultation configuration
  db/              MongoDB connection
  env/             Server environment access
  integrations/    Gemini, Nodemailer, and Razorpay clients
  services/        Lead, payment, email, and chatbot business logic
  utils/           API responses, security, rate limiting, and helpers
  validations/     Shared Zod schemas

models/            Mongoose models
store/             Zustand stores
types/             Shared TypeScript contracts
docs/              Assessment mapping and automation documentation
```

### Frontend Structure

The homepage is composed from focused business sections inside `components/sections`. Reusable controls live in `components/ui`, while forms, chatbot UI, admin UI, navigation, and footer each have dedicated folders. Client-side workflows are extracted into hooks instead of being placed inside large page components.

The frontend is mobile-first and uses responsive Tailwind breakpoints, semantic HTML, reusable visual tokens, Framer Motion, loading states, field-level validation feedback, and clear conversion paths.

### Backend Structure

Backend functionality is implemented through Next.js Route Handlers inside `app/api`. Route handlers remain small: they parse requests, apply rate limits, call a service, and return a consistent API response.

Business logic is placed inside `lib/services`. External provider code is isolated in `lib/integrations`, while common security, response, error, rate-limit, and DNS helpers live in `lib/utils`. This prevents provider-specific or database-specific logic from spreading across UI and API files.

### Database Selection

MongoDB Atlas was selected because leads and consultation bookings are naturally represented as independent documents. Mongoose adds schema validation, indexes, timestamps, enums, and typed models.

The database stores:

- Lead contact details, selected service, message, timestamps, and pipeline status
- Consultation customer details, selected service, Razorpay order ID, payment ID, amount, currency, timestamps, and payment status

Database writes remain synchronous when they determine whether an operation succeeded. Email notifications run afterward because they are useful side effects but should not decide whether a lead or verified payment is accepted.

## Main Workflows

### Lead Capture Flow

```mermaid
flowchart LR
  A[Visitor submits free audit form] --> B[React Hook Form and Zod validation]
  B --> C[POST /api/leads]
  C --> D[Server validation and rate limit]
  D --> E[MongoDB lead record]
  E --> F[Immediate success response]
  F --> G[Post-response customer email]
  F --> H[Post-response admin email]
```

The database write remains response-critical so the API only reports success after the lead is safely stored. Email notifications run after the response because SMTP latency should not slow down the form experience.

### Paid Consultation Flow

```mermaid
flowchart LR
  A[Visitor submits consultation form] --> B[POST /api/payments/create-order]
  B --> C[Razorpay order created]
  C --> D[MongoDB booking stored]
  D --> E[Razorpay Checkout]
  E --> F[POST /api/payments/verify]
  F --> G[Server-side HMAC verification]
  G --> H[Booking marked paid]
  H --> I[Immediate success response]
  I --> J[Post-response confirmation emails]
```

Payment success is accepted only after backend signature verification. A failed-payment update only applies to bookings still in the `created` state.

### Hybrid Chatbot Flow

```mermaid
flowchart LR
  A[Visitor asks a question] --> B[Zod validation and rate limit]
  B --> C{Question type}
  C -->|Quick reply| D[Rule-based intent engine]
  C -->|Custom question| E[Gemini Developer API]
  E -->|Available| F[Constrained AI response]
  E -->|Unavailable| D
  D --> G[Relevant conversion CTA]
  F --> G
```

The hybrid approach keeps common business answers fast and deterministic while still supporting flexible AI responses. It also prevents the chatbot from becoming unusable when an external AI service is unavailable.

## AI and Automation

### Chatbot Implementation

The chatbot uses two response paths:

1. Quick replies are answered by a deterministic keyword-based intent engine. These answers cover services, pricing, timelines, results, contact, and consultation booking.
2. Custom questions are sent to the server-side `/api/chat` route and then to Gemini with a constrained Nexora business prompt and short conversation history.

The Gemini API key never reaches the browser. Requests are validated with Zod, rate-limited by IP, restricted to short history and output lengths, and cancelled after a timeout. If Gemini fails or is unavailable, the chatbot automatically returns the closest rule-based response and CTA.

Chat history is persisted in local storage through Zustand so the conversation remains available across page reloads.

### Automation Workflow

The project uses custom backend automation instead of adding an external automation platform:

- A valid lead is stored in MongoDB.
- The API immediately confirms the successful submission.
- Next.js `after()` schedules customer acknowledgement and internal notification emails.
- A verified consultation payment updates the booking to `paid`.
- Next.js `after()` schedules customer confirmation and internal payment emails.

This design keeps user-facing responses fast while preserving reliable database operations. Detailed workflow diagrams are available in [docs/automation-workflow.md](docs/automation-workflow.md).

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/leads` | Validate and store a new lead |
| `POST` | `/api/chat` | Generate a Gemini or rule-based chatbot response |
| `POST` | `/api/payments/create-order` | Create a Razorpay order and booking record |
| `POST` | `/api/payments/verify` | Verify the Razorpay signature and confirm payment |
| `POST` | `/api/payments/failed` | Record a failed payment attempt |
| `GET` | `/api/admin/leads` | Return recent leads for the protected dashboard |
| `PATCH` | `/api/admin/leads/[leadId]` | Update a lead pipeline status |
| `GET` | `/api/admin/bookings` | Internal API used by `/admin/leads` to display recent consultation bookings |

## Security Decisions

- `.env.local` is ignored by Git and secrets remain server-side.
- Gemini requests are proxied through `/api/chat`; the browser never receives the API key.
- Razorpay payments are confirmed only after server-side HMAC signature verification.
- User input is validated on both client and server.
- User-provided email content is HTML-escaped.
- Admin pages and admin APIs are protected through Next.js Proxy and HTTP Basic Authentication.
- Public lead, chatbot, and payment endpoints use basic per-IP rate limiting.
- Payment failure updates cannot replace a paid booking status.
- Global headers include `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`.

For a larger production system, the in-memory rate limiter and Basic Authentication should be replaced with a distributed rate-limit store and a full role-based authentication system.

## Technical SEO Implementation

- One descriptive homepage `h1` followed by structured `h2` and `h3` headings
- Global title, description, canonical URL, Open Graph, and Twitter metadata
- Dynamic social sharing image
- `ProfessionalService` JSON-LD structured data
- Search-engine rules through `robots.txt`
- Production URL discovery through `sitemap.xml`
- Semantic `main`, `section`, `article`, `nav`, `header`, and `footer` elements
- Indexing disabled for admin and API paths through robots rules

Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS URL before the final production build so canonical, sitemap, schema, and social URLs reference the live website.

### SEO Optimization Decisions

- Metadata is generated through the Next.js Metadata API instead of manually duplicating tags.
- The homepage uses one descriptive `h1` with logical `h2` and `h3` descendants.
- `ProfessionalService` structured data communicates the business type, services, URL, and contact details to search engines.
- Canonical, Open Graph, Twitter, sitemap, and robots URLs all use the configured production site URL.
- Admin and API paths are excluded from search-engine crawling.
- The Open Graph image is generated inside the application, avoiding a missing or outdated social image asset.
- The homepage avoids large stock images and uses CSS/SVG product visuals, reducing image-transfer requirements.
- Client-side JavaScript is limited to components that require interaction, including forms, animation, payment checkout, admin updates, and chatbot state.
- Reduced-motion support improves accessibility and prevents unnecessary animation for users who request it.

### Performance Decisions

- Lead and payment emails are scheduled after the response so SMTP latency does not slow down form submissions.
- MongoDB connections and external integration clients are reused between requests.
- Razorpay Checkout is loaded only when a user starts the payment flow.
- Static marketing and SEO routes are prerendered by Next.js.
- Response compression is enabled and unnecessary framework identification headers are disabled.
- Shared components, hooks, schemas, and services reduce duplication and make optimization changes easier to apply consistently.

## Local Setup

### Prerequisites

- Node.js 20 or newer
- MongoDB Atlas database
- Gmail account with an app password
- Razorpay Test Mode keys
- Gemini API key

### Installation

```bash
git clone https://github.com/Vibudh08/Nexora.git
cd Nexora
npm install
```

Create `.env.local` from `.env.example` and configure the values:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexora
DNS_SERVERS=8.8.8.8,1.1.1.1
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-google-app-password
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=use-a-long-random-password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Protected admin dashboard: `http://localhost:3000/admin/leads`

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `DNS_SERVERS` | Optional development DNS override for MongoDB Atlas SRV resolution |
| `EMAIL_USER` | Gmail SMTP sender and admin notification address |
| `EMAIL_PASS` | Gmail app password |
| `RAZORPAY_KEY_ID` | Razorpay Test Mode public key |
| `RAZORPAY_KEY_SECRET` | Razorpay Test Mode server secret |
| `GEMINI_API_KEY` | Server-only Gemini Developer API key |
| `GEMINI_MODEL` | Gemini model used by the chatbot |
| `ADMIN_USERNAME` | Admin dashboard username |
| `ADMIN_PASSWORD` | Admin dashboard password |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used by SEO routes and metadata |

## Validation and Quality Checks

```bash
npm run lint
npm run typecheck
npm run build

# Run all checks
npm run check

# Audit production dependencies
npm audit --omit=dev --audit-level=high
```

Verified during development:

- ESLint passed
- TypeScript strict typecheck passed
- Production build passed
- Production dependency audit reported zero vulnerabilities
- Invalid lead, chatbot, and payment payloads were rejected
- Lead creation, database storage, admin retrieval, and status updates were tested
- Razorpay Test Mode order creation and failed-payment tracking were tested
- Invalid Razorpay signatures were rejected
- Homepage, robots, sitemap, manifest, and Open Graph routes returned successfully
- Protected admin routes rejected unauthenticated requests

See [docs/assessment-readiness.md](docs/assessment-readiness.md) for the requirement mapping and [docs/automation-workflow.md](docs/automation-workflow.md) for workflow diagrams.

## Deployment

The recommended deployment target is Vercel.

1. Import the GitHub repository into Vercel.
2. Add every variable from `.env.example` to the Vercel project settings.
3. Set `NEXT_PUBLIC_SITE_URL` to `https://nexora-digital-app.vercel.app`.
4. Deploy the application.
5. Verify the lead form, email delivery, Gemini response, Razorpay Test Mode flow, and admin dashboard on the live deployment.

## Key Engineering Decisions

- **Single Next.js application:** Keeps UI, APIs, metadata, and deployment together while preserving internal architectural boundaries.
- **Shared Zod schemas:** Prevents client and server validation rules from drifting apart.
- **Layered backend:** Route handlers manage HTTP concerns, services manage business logic, integrations wrap external providers, and models manage persistence.
- **Hybrid chatbot:** Provides AI flexibility without making essential business guidance dependent on one external provider.
- **Post-response email notifications:** Improves form response time while keeping database writes and payment verification reliable.
- **Server-side payment verification:** Prevents the frontend from independently declaring a payment successful.
- **Protected operational dashboard:** Demonstrates that captured data is useful to the business, not only stored.

## Evaluation Criteria Mapping

| Evaluation area | Implementation evidence |
| --- | --- |
| UI/UX Design and Responsiveness - 20 marks | Custom premium responsive interface, mobile navigation, clear hierarchy, conversion CTAs, interactive dashboard visuals, form states, Framer Motion, and reduced-motion support |
| Full Stack Development and Code Quality - 20 marks | Next.js full-stack application, strict TypeScript, layered architecture, reusable components, hooks, services, integrations, validations, models, utilities, and consistent API responses |
| Database and Form Handling - 15 marks | React Hook Form, shared Zod validation, MongoDB/Mongoose persistence, success/error/loading states, protected admin dashboard, and lead status management |
| API Integration - 10 marks | Razorpay Test Mode order creation, lazy-loaded checkout, server-side HMAC verification, failed-payment tracking, and error handling |
| AI Chatbot Implementation - 15 marks | Floating hybrid Gemini chatbot, constrained server prompt, rule-based fallback, quick replies, history persistence, CTA guidance, timeout, validation, and rate limiting |
| Technical SEO and Performance - 15 marks | Metadata, canonical URL, Open Graph, Twitter cards, dynamic OG image, JSON-LD, semantic headings, robots, sitemap, manifest, compression, reduced motion, and post-response emails |
| Documentation and Decision Making - 15 marks | Technology rationale, architecture explanation, frontend/backend/database structure, API flows, security decisions, setup, validation, deployment, and assessment mapping |
| Bonus Automation Workflow - 10 marks | Custom MongoDB-to-email lead workflow and verified-payment-to-confirmation workflow documented with Mermaid diagrams |

## Problem-Solving and Optimization Highlights

- Slow SMTP delivery initially delayed form submissions. Email work was moved to post-response tasks, reducing submission response time while keeping database writes reliable.
- The chatbot was designed with a deterministic fallback so an AI-provider failure does not remove essential customer guidance.
- Payment success is never trusted from the browser alone; it requires backend HMAC verification.
- Failed-payment updates are restricted to `created` bookings so they cannot overwrite a successful payment.
- Shared client/server Zod schemas prevent inconsistent form rules.
- A development DNS override is available for environments where MongoDB Atlas SRV resolution fails locally.

## Assessment Documentation

- [Assessment readiness and requirement mapping](docs/assessment-readiness.md)
- [Automation workflow diagrams](docs/automation-workflow.md)
