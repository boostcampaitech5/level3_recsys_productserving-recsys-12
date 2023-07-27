FROM node:18.16.0

RUN mkdir /workspace
COPY . /workspace

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm install
RUN npm install axios
RUN npm install react-youtube

CMD ["npm", "run", "dev"]