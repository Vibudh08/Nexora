# Automation Workflow

## Lead Notification

```mermaid
flowchart LR
  A[Visitor submits lead form] --> B[Zod validation]
  B --> C[MongoDB lead record]
  C --> D[Admin notification email]
  C --> E[Customer acknowledgement email]
```

## Paid Consultation

```mermaid
flowchart LR
  A[Visitor submits consultation form] --> B[Razorpay order created]
  B --> C[MongoDB booking created]
  C --> D[Razorpay Checkout]
  D --> E[Backend signature verification]
  E --> F[Booking marked paid]
  F --> G[Admin notification email]
  F --> H[Customer confirmation email]
```

## Hybrid AI Chatbot

```mermaid
flowchart LR
  A[Visitor asks a custom question] --> B[Zod validation and IP rate limit]
  B --> C[Server-side Gemini API request]
  C --> D[Constrained Nexora business answer]
  C -. unavailable or unconfigured .-> E[Rule-based intent fallback]
  D --> F[Relevant conversion CTA]
  E --> F
```

These workflows are implemented as custom Next.js backend automation using MongoDB, Razorpay, Nodemailer, and the Gemini Developer API.
