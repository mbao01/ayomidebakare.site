# Base image
FROM node:10.15.0

# Create and set the work directory
WORKDIR /ayomidebakare.site

# Copy app to WORKDIR
COPY . /ayomidebakare.site

# Globally install dependencies we may need manually to run from the cli
RUN npm i -g gatsby-cli@2.4.17

# Install dependencies
RUN npm i

# Mount the node_modules directory as a volume to bind it at run time
VOLUME ["/ayomidebakare.site"]

EXPOSE 5553

# Specify the command(s) to be run (at runtime :))
CMD bash
