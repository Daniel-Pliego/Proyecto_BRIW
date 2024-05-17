FROM node:20.8-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY .env.example /app/.env
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]