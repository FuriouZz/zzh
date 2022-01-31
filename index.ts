import { grantPermissions } from "./src/utils/permissions.ts";
import { deploy } from "./src/deploy.ts";
import { connect, tunnel } from "./src/ssh.ts";
import { readConfig } from "./src/config.ts";

await grantPermissions([{ name: "read" }, { name: "write" }, { name: "run" }]);

const config = await readConfig();

if (Deno.args.includes("ssh")) {
  await connect(config);
} else if (Deno.args.includes("tunnel")) {
  await tunnel(config);
} else {
  await deploy(config);
}
