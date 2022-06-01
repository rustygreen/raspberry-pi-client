#!/usr/bin/env sh
set -eu

echo "########### Creating runtime configuration ###########"

if [ -n "${RPC_CONFIG:+x}" ]; then
  echo "Writing config from environment"
  echo "${RPC_CONFIG}" > /usr/share/nginx/html/assets/config.json
elif [ -n "${RPC_SERVER:+x}" ]; then
  echo "Writing config with single server URL"
  title="${RPC_SERVER_TITLE:-'RPi Server'}"
  url="${RPC_SERVER}"
  config='{"servers":[{"title":"'"$title"'","url":"'"$url"'"}]}'

  echo "${config}" > /usr/share/nginx/html/assets/config.json
else
  echo "No configuration options passed. Not modifying config file."
fi

echo "######################################################"
echo ""

exec "$@"