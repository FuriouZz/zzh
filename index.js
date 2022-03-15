#!/usr/bin/env node

const os = require("os");
const { spawnSync } = require("child_process");

const PLATFORMS = {
  "darwin-arm64": "aarch64-apple-darwin",
  "darwin-x64": "x86_64-apple-darwin",
  "linux-arm": undefined,
  "linux-arm64": undefined,
  "linux-ia32": undefined,
  "linux-x64": "x86_64-unknown-linux-gnu",
  "win32-ia32": undefined,
  "win32-x64": "x86_64-pc-windows-msvc",
};

const platform = os.platform() + "-" + os.arch();
const denoTarget = PLATFORMS[platform];
const packageName = "@zzh/" + denoTarget;

if (!require("./package.json").optionalDependencies[packageName]) {
  throw "Unsupported platform/architecture: " + platform;
}

const CLI = `${__dirname}/platforms/${denoTarget}/zzh`;
spawnSync(CLI, ["--unstable", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
});
