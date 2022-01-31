import { spawn } from "./utils/process.ts";
import type { Config } from "./config.ts";

export async function syncDirectory(
  { server }: Config,
  from: string,
  to: string,
  exclude: string[]
) {
  const excludeFile = "tmp/excludes.txt";

  await Deno.writeFile(
    excludeFile,
    new TextEncoder().encode(exclude.join("\n"))
  );

  await spawn({
    cmd: [
      "rsync",
      // "--dry-run",
      "-azhP",
      "--delete",
      `--exclude-from=${excludeFile}`,
      from,
      `${server.user}@${server.address}:${server.root}${to}`,
    ],
  }).catch((e) => {
    console.log(e);
    throw new Error("Synchronization failed");
  });

  await Deno.remove(excludeFile);
}

export async function uploadFile({ server }: Config, from: string, to: string) {
  return spawn({
    cmd: ["scp", from, `${server.user}@${server.address}:${server.root}${to}`],
  }).catch((e) => {
    console.log(e);
    throw new Error("Upload failed");
  });
}

export async function runCommand({ server }: Config, command: string) {
  return spawn({
    cmd: ["ssh", `${server.user}@${server.address}`, "-C", command],
  }).catch((e) => {
    console.log(e);
    throw new Error("Command failed");
  });
}

export async function tunnel({ server }: Config) {
  console.log('Create a tunnel', server.tunnel);
  return spawn({
    cmd: ["ssh", "-N", "-L", server.tunnel, `${server.user}@${server.address}`],
  }).catch((e) => {
    console.log(e);
    throw new Error("Command failed");
  });
}

export async function connect({ server }: Config) {
  console.log('Connect to ', server.address);
  return spawn({
    cmd: ["ssh", `${server.user}@${server.address}`],
  }).catch((e) => {
    console.log(e);
    throw new Error("Command failed");
  });
}
