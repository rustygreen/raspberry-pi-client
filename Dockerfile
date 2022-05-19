FROM nginx:alpine

COPY /dist/raspberry-pi-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
