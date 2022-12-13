#Base Image node:12.18.4-alpine
FROM node:16.18.1-alpine

#Set working directory to /app
WORKDIR /app
#Set PATH /app/node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH
#Copy package.json in the image
COPY package.json ./

#Install Packages
RUN npm install express --save
RUN npm install store --save

#Copy the app
COPY . ./
#Expose application port
EXPOSE 3000

#Start the app
ENTRYPOINT ["node", "index.cjs"]