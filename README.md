# Real-Time Patient Form Monitor

A real-time patient registration system with live synchronization between the patient form and staff dashboard using Next.js and Pusher.

## Overview

This application consists of two main parts:
- **Patient Form** - Patients fill out their information -> /
- **Staff Dashboard** - Staff monitor form submissions in real-time -> /staff

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Get these from https://dashboard.pusher.com
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_secret
```

### 3. Run Development Server

```bash
pnpm dev
```