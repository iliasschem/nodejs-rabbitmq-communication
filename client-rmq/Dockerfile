FROM nginx:stable-alpine

WORKDIR /app/client

COPY ./config/client.conf /etc/nginx/conf.d

COPY ./build /app/client

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]