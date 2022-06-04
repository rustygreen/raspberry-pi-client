FROM nginx:alpine

RUN apk update

COPY ./dist/raspberry-pi-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./scripts/entrypoint.sh /
RUN chmod +x /entrypoint.sh

EXPOSE 80

ARG RPC_CONFIG
ARG RPC_SERVER
ARG RPC_SERVER_TITLE

ENV RPC_CONFIG="$RPC_CONFIG"
ENV RPC_SERVER="$RPC_SERVER"
ENV RPC_SERVER_TITLE="$RPC_SERVER_TITLE"

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]