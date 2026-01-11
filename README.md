# Real-Time Patient Form Monitor

A real-time patient registration system with live synchronization between the patient form and staff dashboard using Next.js and Pusher.

## Overview

This application consists of two main parts:
- **Patient Form** - Patients fill out their information
- **Staff Dashboard** - Staff monitor form submissions in real-time

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_secret
```

### 3. Run Development Server

```bash
pnpm dev
```

---

## Project Structure

```
realtime-form-monitor/
├── app/
│   ├── page.tsx              # Patient form page
│   ├── staff/page.tsx        # Staff dashboard page
│   └── api/patient-update/   # API for real-time sync
├── components/
│   └── PatientForm.tsx       # Form component
├── types/
│   └── patient.ts            # TypeScript types
└── lib/
    └── utils.ts              # Helper functions
```

---

## Design Decisions

### Responsive Design

**Mobile (Phone)**
- Single column layout
- Larger buttons for easy tapping
- Full-width form fields

**Tablet**
- Two column layout for forms
- Side-by-side stats cards

**Desktop**
- Three column grid for patient cards
- Maximum form width for better readability
- More spacing between elements

---

## Real-Time Synchronization Flow

### How It Works (Simple Explanation)

```
1. Patient Types → Form sends update
2. API receives it → Triggers Pusher
3. Pusher broadcasts → All dashboards receive
4. Dashboard updates → Shows new data
```

### Step by Step

**Step 1:** Patient fills the form
- Every time they type, the form updates

**Step 2:** Data sent to server
- Reduces server requests

**Step 3:** Server triggers Pusher
- Pusher is like a messaging service
- Sends data to everyone listening

**Step 4:** Staff dashboard receives update
- Checks if patient exists
- Updates existing patient OR adds new one
- Saves to localStorage if submitted

### Key Terms

- **Channel** = Like a chat room (`hospital-system`)
- **Event** = Type of message (`patient-input`)
- **Subscribe** = Join the room to listen
- **Bind** = Listen for specific messages
- **Trigger** = Send a message


## Testing

1. Open Patient Form: `http://localhost:3000`
2. Open Staff Dashboard: `http://localhost:3000/staff`
---

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling
- **Pusher** - Real-time messaging
---

## Build for Production

```bash
pnpm build
pnpm start
```

---

