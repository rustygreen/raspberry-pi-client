const fs = require("fs");
const { env } = require("process");
const { version } = require("../package.json");
const configEnvName = "RPC_CONFIG";
const configJson = env[configEnvName];
const nodeEnv = env["NODE_ENV"];
const configFilePath = "../data/config.json";

function initializeConfig() {
  const hasConfig = Boolean(configJson);
  const message = hasConfig
    ? `Config env variable '${CONFIG_ENV_VAR_NAME}' exists. File will be written to disk.`
    : `No value found for config env variable '${CONFIG_ENV_VAR_NAME}'. Skipping writing config file.`;

  console.log(message);
  if (hasConfig) {
    saveConfig(config);
  }
}

function saveConfig() {
  const configJson = env[CONFIG_ENV_VAR_NAME];
  fs.writeFileSync(configFilePath, configJson);
  console.log(`Config file written to '${configFilePath}'`);
}

function initialize() {
  console.log(`Initializing app version '${version}' in '${nodeEnv}' mode.`);
  initializeConfig();
}

initialize();
