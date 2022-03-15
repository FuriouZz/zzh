import { grantPermissions } from "./src/utils/permissions.ts";

await grantPermissions([{ name: "run" }]);

const compile = async (target: string) => {
  const process = Deno.run({
    cmd: [
      "deno",
      "--unstable",
      "compile",
      "--allow-read",
      "--allow-write",
      "--allow-run",
      "--target",
      target,
      "--output",
      `platforms/${target}/zzh`,
      "index.ts",
    ],
  });

  await process.status();
};

await compile("x86_64-unknown-linux-gnu");
await compile("x86_64-pc-windows-msvc");
await compile("x86_64-apple-darwin");
await compile("aarch64-apple-darwin");
