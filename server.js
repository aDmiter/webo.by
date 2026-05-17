/**
 * Beget + Apache Passenger: Next.js standalone
 * @see https://beget.com/ru/kb/how-to/web-apps/node-js
 * @see https://www.phusionpassenger.com/docs/advanced_guides/in_depth/nodejs/
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
require("dotenv").config({ path: path.join(root, ".env") });

process.env.NODE_ENV = "production";
process.env.HOSTNAME = "127.0.0.1";

const standaloneDir = path.join(root, ".next", "standalone");
const entry = path.join(standaloneDir, "server.js");

if (!fs.existsSync(entry)) {
  console.error("[webo] Не найдена сборка:", entry);
  process.exit(1);
}

const isPassenger = typeof PhusionPassenger !== "undefined";
if (isPassenger) {
  PhusionPassenger.configure({ autoInstall: false });
}

const originalListen = http.Server.prototype.listen;
http.Server.prototype.listen = function patchedListen(...args) {
  const callback = typeof args[args.length - 1] === "function" ? args.pop() : undefined;

  if (isPassenger) {
    return originalListen.call(this, "passenger", callback);
  }

  const port = process.env.PORT || 3001;
  return originalListen.call(this, port, "127.0.0.1", callback);
};

process.chdir(standaloneDir);
require(entry);
