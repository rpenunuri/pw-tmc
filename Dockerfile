# Use the Playwright image as the base
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set the working directory
WORKDIR /app

# Copy your application files into the Docker image
COPY . .

# Install the dependencies
RUN npm install

# Ensure the scripts are executable
RUN chmod +x ./scripts/entry-point-e2e.sh

# Run your tests when the Docker container is started
ENTRYPOINT ["./scripts/entry-point-e2e.sh"]
