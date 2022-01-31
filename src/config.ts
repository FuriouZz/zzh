import { deflat } from "./utils/object.ts";

export interface Config {
  server: {
    address: string;
    user: string;
    root: string;
    tunnel: string;
  };
  copy: {
    files: Record<string, string>;
  };
  sync: {
    directories: {
      from: string;
      to: string;
      exclude: string[];
    }[];
  };
  commands: {
    before: string[];
    after: string[];
    "before:copy": string[];
    "after:copy": string[];
    "before:sync": string[];
    "after:sync": string[];
  };
}

const CONFIG_REGEX = new RegExp("--config");
const EQUAL_REGEX = new RegExp("=");

export async function readConfig(): Promise<Config> {
  let configFile = "zzh.json";

  const index = Deno.args.findIndex((arg) => CONFIG_REGEX.test(arg));
  if (index > -1) {
    if (EQUAL_REGEX.test(Deno.args[index])) {
      configFile = Deno.args[index].split("=")[1];
    } else {
      configFile = Deno.args[index + 1];
    }
  }

  await Deno.stat(configFile).catch(() => {
    throw `Config file "${configFile}" not found`;
  });

  const file = await Deno.readTextFile(configFile);

  const defaultConfig: Config = {
    server: {
      address: "",
      user: "root",
      root: "/",
      tunnel: "8888:127.0.0.1:80",
    },
    copy: {
      files: {},
    },
    sync: {
      directories: [],
    },
    commands: {
      before: [],
      after: [],
      "before:copy": [],
      "after:copy": [],
      "before:sync": [],
      "after:sync": [],
    },
  };

  const userConfig: Config = deflat(JSON.parse(file));

  return {
    server: {
      ...defaultConfig.server,
      ...userConfig.server,
    },
    copy: {
      ...defaultConfig.copy,
      ...userConfig.copy,
    },
    sync: {
      ...defaultConfig.sync,
      ...userConfig.sync,
    },
    commands: {
      ...defaultConfig.commands,
      ...userConfig.commands,
    },
  };
}
