const fs = require("fs");
const { env } = require("process");
const { PHASE_PRODUCTION_SERVER } = require("next/constants");
const CONFIG_ENV_VAR_NAME = "RPC_CONFIG";
const CONFIG_JSON = env[CONFIG_ENV_VAR_NAME];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone"
};

module.exports = (phase) => {
  const isProduction = phase === PHASE_PRODUCTION_SERVER;
  const saveConfigFile = isProduction && Boolean(CONFIG_JSON);

  if (saveConfigFile) {
    saveConfig(config);
  }

  return nextConfig;
};

function saveConfig() {
  console.log(
    `Saving config file from '${CONFIG_ENV_VAR_NAME}' env variable value`
  );

  fs.writeFileSync("./data/config.json", CONFIG_JSON);
}
