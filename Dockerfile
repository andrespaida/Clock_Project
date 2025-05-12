# Use an Nginx base image
FROM nginx:alpine

# Copy the project files to the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80