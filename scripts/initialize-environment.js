const fs = require("fs");
const { env } = require("process");
const { version } = require("../package.json");
const configEnvName = "RPC_CONFIG";
const configJson = env[configEnvName];
const nodeEnv = env["NODE_ENV"];
const configFilePath = "./data/config.json";

function initializeConfig() {
  const hasConfig = Boolean(configJson);
  const message = hasConfig
    ? `Config env variable '${configEnvName}' exists. File will be written to disk.`
    : `No value found for config env variable '${configEnvName}'. Skipping writing config file.`;

  console.log(message);
  if (hasConfig) {
    saveConfig();
  }
}

function saveConfig() {
  fs.writeFileSync(configFilePath, configJson);
  console.log(`Config file written to '${configFilePath}'`);
}

function initialize() {
  console.log(`Initializing app version '${version}' in '${nodeEnv}' mode.`);
  initializeConfig();
}

try {
  initialize();
} catch (error) {
  console.error(`Failed to initialize environment`);
  console.error(error);
}
