#!/bin/bash

# Navigate to the client folder
cd client

# Install dependencies for the React app
npm install

# Build the React app for production
npm run build

# Return to the root folder (back to KubraMarket)
cd ..

# Install dependencies for the backend (server)
npm install

# You can add additional build steps if needed (e.g., compiling server-side code)
# e.g., if you are using typescript for server-side code: tsc --build

echo "Build process completed successfully."
