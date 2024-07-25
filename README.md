# Marketplce Extension

## Overview

Marketplce is a Chrome extension that allows users to compare prices across multiple marketplaces seamlessly.

## Features

- Supports Amazon, eBay, Walmart, Alibaba, and more.
- Fetches product prices using SerpApi.

## marktplce.co

## Final project blog article

https://medium.com/@folayanayodeji/the-marketplce-solution-e354cbc2fa32

## Author's Linkedin

www.linkedin.com/in/ayodeji-folayan

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top right.
4. Click "Load unpacked" and select the downloaded directory.

## Usage

1. Open the extension by clicking on the icon in the Chrome toolbar.
2. Enter a product name in the search bar and click "Search".
3. View and compare prices from various marketplaces.

## Development

### Prerequisites

- Node.js and npm installed.

### Setting up the Development Environment

1. Navigate to the extension directory.
2. Install dependencies: `npm install`

### Running the CORS Anywhere Proxy Locally

If you need to run the CORS proxy locally:

1. Navigate to the `cors-anywhere` directory.
2. Install dependencies: `npm install`
3. Start the proxy server: `node server.js`
4. Update the `PROXY_URL` in `background.js` to `http://localhost:8080/`

### Deployment

To deploy the CORS proxy to Heroku:

1. Follow the [Heroku CLI installation guide](https://devcenter.heroku.com/articles/heroku-cli).
2. Log in to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create`
4. Deploy the app: `git push heroku master`

## License

This project is licensed under the MIT License.
