FROM node:boron

ENV OTEL_SERVICE_NAME=clodter_pacman
ENV OTEL_RESOURCE_ATTRIBUTES='deployment.environment=clodter_dev,service.version=1.0.0'

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Clone game source code
RUN git clone https://github.com/colinlodter/pacman.git .

# Install app dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Run container
CMD ["npm", "start"]
