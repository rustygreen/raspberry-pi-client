const fs = require("fs");
const { env } = require("process");
const { PHASE_PRODUCTION_SERVER } = require("next/constants");
const CONFIG_ENV_VAR_NAME = "RPC_CONFIG";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone"
};

module.exports = (phase) => {
  const isProduction = phase === PHASE_PRODUCTION_SERVER;
  const configJson = env[CONFIG_ENV_VAR_NAME];
  const hasConfig = Boolean(configJson);
  const saveConfigFile = isProduction && hasConfig;

  const mode = isProduction ? "production" : "development";
  const configInfo = hasConfig
    ? `Config env variable '${CONFIG_ENV_VAR_NAME}' exists.`
    : `No value found for config env variable '${CONFIG_ENV_VAR_NAME}'. Skipping writing config file.`;

  console.log(`Initializing app in '${mode}' mode. ${configInfo}`);
  if (saveConfigFile) {
    saveConfig(config);
  }

  return nextConfig;
};

function saveConfig() {
  console.log(
    `Saving config file from '${CONFIG_ENV_VAR_NAME}' env variable value`
  );

  const configJson = env[CONFIG_ENV_VAR_NAME];
  fs.writeFileSync("./data/config.json", configJson);
}
