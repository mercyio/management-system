# FROM node:lts-alpine
FROM node:21

# ENV NODE_ENV=production

# create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# install app dependencies
# a wildcard is used to ensure both package.json and package-lock.json are copied
# where available (npm@$+)
 COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# RUN npm install --production --silent && mv node_modules ../

# bundle app source
COPY . .

RUN npm install 
# if you are builing for production
# RUN npm cli --only=production

EXPOSE 7000

# RUN chown -R node /usr/src/app

# USER node

# npm run start:dev
CMD ["npm", "run","start:dev"]

# CMD {"node", "dist/main"}


# FROM baseImage