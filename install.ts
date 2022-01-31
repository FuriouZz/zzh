import { grantPermissions } from "./src/utils/permissions.ts";

await grantPermissions([{ name: "run" }]);

const process = Deno.run({
  cmd: ["deno", "--unstable", "install", "--allow-run", "--allow-read", "--allow-write", "--name", "zzh", "-f", "index.ts"],
});

await process.status();
