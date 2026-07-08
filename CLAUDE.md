# CLAUDE.md

# ⚔️ DevDungeon - AI Development Guide

## Project Overview

DevDungeon is a full-stack web application built with Next.js that turns coding practice into an RPG-style experience.

Users improve their programming skills by:

- Solving AI-generated coding challenges
- Defeating coding bosses
- Earning XP and rewards
- Unlocking new challenges
- Competing in real-time PvP coding battles
- Climbing leaderboards

The goal is to create an engaging coding platform that combines competitive programming with game mechanics.

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- JavaScript (ES6+)
- Tailwind CSS

## Backend

- Next.js API Routes
- Server Actions
- Database services

## Real-Time Features

- WebSockets / Socket.IO
- Live PvP matches
- Real-time game state updates

## AI

- AI-generated coding problems
- AI-generated boss challenges
- Difficulty adjustment

---

# Application Architecture

The project follows a full-stack Next.js architecture.

## Frontend Responsibilities

Frontend code handles:

- User interfaces
- Pages
- Components
- Animations
- User interactions
- Client-side state

Frontend code should NOT contain:

- Database logic
- Secret keys
- Server-only operations

---

## Backend Responsibilities

Backend code handles:

- Authentication
- Database operations
- API routes
- User validation
- Game logic
- AI communication
- Match results

Business logic should be separated from UI components.

---

# Project Structure

Use this structure:

```
src/
│
├── app/
│   ├── pages and routes
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dungeon/
│   ├── boss/
│   ├── pvp/
│   └── leaderboard/
│
├── services/
│   ├── api services
│   ├── AI services
│   └── game services
│
├── hooks/
│
├── lib/
│   ├── database
│   ├── authentication
│   └── utilities
│
├── utils/
│
└── styles/
```

---

# Coding Standards

## General Rules

- Write clean and readable code.
- Prefer simple solutions.
- Avoid unnecessary complexity.
- Avoid duplicate code.
- Reuse existing components.
- Keep functions small and focused.

---

# React Rules

- Use functional components only.
- Use React hooks correctly.
- Keep components reusable.
- Separate UI from business logic.
- Avoid unnecessary state.

Example:

Good:

```javascript
function BossHealthBar({ health }) {
    return (
        <div>{health}</div>
    );
}
```

Avoid:

- Large components with multiple responsibilities.
- Repeated UI code.

---

# JavaScript Rules

Use:

```javascript
const
let
async/await
```

Avoid:

```javascript
var
```

Use meaningful names.

Good:

```javascript
const generateBossChallenge = async () => {}
```

Bad:

```javascript
const create = async () => {}
```

---

# Styling Rules

Use:

- Tailwind CSS

Avoid:

- Inline styles
- Duplicate CSS

The design should match the DevDungeon theme:

- Dark fantasy style
- Developer-focused UI
- Dungeon/RPG atmosphere
- Modern web experience

---

# AI System Rules

AI is a core part of DevDungeon.

AI-generated coding challenges must include:

- Title
- Description
- Difficulty
- Constraints
- Input format
- Output format
- Examples
- Hidden test cases

---

# PvP AI Rules

For PvP matches:

1. Generate ONE coding problem.
2. Store the problem on the server.
3. Send the same problem to both players.
4. Validate submissions server-side.
5. Determine the winner.

Never generate separate questions for players in the same match.

---

# Boss Battle Rules

Boss challenges should support:

- Different difficulties
- Different rewards
- Player progression
- XP calculation

Boss logic should be separated from UI.

Example:

Bad:

```
BossComponent.jsx
- UI
- Database calls
- AI generation
- Game calculations
```

Good:

```
BossComponent.jsx
BossService.js
AIService.js
Database.js
```

---

# Real-Time System Rules

PvP uses real-time communication.

The server is the source of truth.

Never trust the client.

The server controls:

- Match results
- Timers
- Scores
- Winners
- Rewards

Handle:

- Disconnects
- Reconnection
- Invalid submissions
- Match cancellation

---

# Database Rules

Database code must:

- Be separated from components.
- Validate incoming data.
- Handle errors.
- Protect sensitive information.

Never expose:

- Database credentials
- API keys
- Secrets

---

# Security Rules

Never commit:

- API keys
- Passwords
- Database URLs
- Private tokens

Store secrets in:

```
.env.local
```

Only commit:

```
.env.example
```

---

# Code Submission Rules

Users submit code solutions.

Never trust submitted code.

Always:

- Validate submissions server-side.
- Use secure execution methods.
- Prevent cheating.
- Protect hidden test cases.

---

# Git Workflow

Never commit directly to:

```
main
```

All work must happen in feature branches.

Examples:

```
feature/auth

feature/dungeon

feature/boss-system

feature/pvp

feature/ai-generation

feature/leaderboard
```

Workflow:

1. Pull latest develop branch.
2. Create feature branch.
3. Make changes.
4. Commit changes.
5. Push branch.
6. Open Pull Request.
7. Get review.
8. Merge into develop.

---

# Commit Messages

Use clear commit messages.

Format:

```
type: description
```

Examples:

```
feat: add login page

feat: create dungeon selection UI

fix: resolve matchmaking bug

refactor: improve AI service

docs: update README
```

---

# Pull Request Rules

Every Pull Request should:

- Have a clear purpose.
- Include a description.
- Only contain related changes.
- Pass lint checks.
- Be reviewed before merging.

---

# Team Development Rules

The team should:

- Communicate before changing major architecture.
- Avoid modifying another person's feature branch.
- Keep commits small.
- Update documentation when adding major features.

---

# Developer Responsibilities

## Developer 1 - Frontend Core

Responsible for:

- Landing page
- Navigation
- UI components
- Dashboard


## Developer 2 - Dungeon & Boss Systems

Responsible for:

- Dungeon pages
- Boss battles
- Game UI


## Developer 3 - PvP & Real-Time

Responsible for:

- Matchmaking
- WebSockets
- PvP logic


## Developer 4 - Backend & AI

Responsible for:

- APIs
- Database
- AI question generation


## Developer 5 - User Experience

Responsible for:

- Authentication UI
- Profiles
- Leaderboards
- Testing
- Documentation

---

# Definition of Done

A feature is complete when:

- The feature works correctly.
- Code follows project standards.
- UI works on mobile and desktop.
- No lint errors exist.
- Security rules are followed.
- Documentation is updated.
- Pull Request is reviewed.

---

# Development Goal

Build DevDungeon into a scalable coding competition platform where learning programming feels like progressing through an RPG adventure.