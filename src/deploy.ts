import type { Config } from "./config.ts";
import { runCommand, uploadFile, syncDirectory } from "./ssh.ts";

async function copyFiles(config: Config) {
  for (const to in config.copy.files) {
    const from = config.copy.files[to];
    console.log("[copy]", from);
    await uploadFile(config, from, to);
  }
}

async function syncDirectories(config: Config) {
  const { sync } = config;

  for (const { from, to, exclude } of sync.directories) {
    console.log("[sync]", from);
    await syncDirectory(config, from, to, exclude);
  }
}

async function runCommands(config: Config, list: keyof Config["commands"]) {
  const commandList = config.commands[list];
  if (commandList.length === 0) return;
  for (const command of commandList) {
    await runCommand(config, command);
  }
}

export async function deploy(config: Config) {
  await runCommands(config, "before");

  await runCommands(config, "before:copy");
  await copyFiles(config);
  await runCommands(config, "after:copy");

  await runCommands(config, "before:sync");
  await syncDirectories(config);
  await runCommands(config, "after:sync");

  await runCommands(config, "after");
}
