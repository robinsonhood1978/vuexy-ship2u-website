FROM node:lts-alpine as build-stage

# Create a folder for our app
RUN mkdir /app

# Set up the working directory
WORKDIR /app

# Copy our package.json file first, then run `npm install`.
# This is an optimization we can make, as this layer will be
# cached, meaning that if we don't change the package.json file,
# this step doesn't need to be performed again
COPY package.json .
COPY yarn.lock .

# Note that we're installing all dependencies, unlike the buildpack
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the Vue.js application. It will output static files
# Into the /dist folder
RUN yarn build

# prod step
FROM nginx:stable-alpine as production-stage

# Copy all build
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Add nginx config
COPY nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf

# Expose
EXPOSE 8080

# Command to run
CMD ["nginx", "-g", "daemon off;"]