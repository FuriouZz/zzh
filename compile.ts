import { grantPermissions } from "./src/utils/permissions.ts";

await grantPermissions([{ name: "run" }]);

const process = Deno.run({
  cmd: ["deno", "--unstable", "compile", "index.ts"],
});

await process.status();
