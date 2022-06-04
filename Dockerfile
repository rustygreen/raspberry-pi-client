FROM nginx:alpine

RUN apk update

COPY ./dist/raspberry-pi-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./scripts/entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]