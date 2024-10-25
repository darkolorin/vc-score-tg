# Consumer App Scorer - Telegram Mini App

A Telegram Mini App for evaluating consumer apps against key engagement and retention metrics.

## Setup

1. Host these files on a web server (HTTPS required for Telegram Mini Apps)
2. Create a Telegram bot using BotFather
3. Set up your Mini App in BotFather using:
   ```
   /newapp
   ```
4. Set your hosted URL as the Mini App URL
5. Add the Mini App to your bot using the provided link

## Development

To test locally:
1. Run a local server:
   ```bash
   python -m http.server 8000
   ```
   or
   ```bash
   npx serve
   ```
2. Access via `http://localhost:8000`

## Features

- Score your app across 10 key metrics
- Get instant feedback and benchmarks
- Visual progress indicators
- Responsive design
- Telegram theme support
