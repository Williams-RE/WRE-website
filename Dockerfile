# Stage 1: Build the React app using Node.js v20 (LTS)
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=prod

# Install Webpack and its plugins temporarily for the build process
RUN npm install webpack webpack-cli mini-css-extract-plugin terser-webpack-plugin \
        babel-loader @babel/core @babel/preset-env @babel/preset-react \
        html-webpack-plugin webpack-bundle-analyzer

# Copy the rest of the application files
COPY . .

# Set NODE_ENV to production for the build process
ENV NODE_ENV=production

# Run Webpack to build the production bundle
RUN npx webpack --mode production

# Clean up unnecessary dev dependencies (Webpack and related tools)
RUN npm uninstall webpack webpack-cli mini-css-extract-plugin terser-webpack-plugin \
        babel-loader @babel/core @babel/preset-env @babel/preset-react \
        html-webpack-plugin webpack-bundle-analyzer

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
