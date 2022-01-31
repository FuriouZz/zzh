# ZZH

Just some commands to deploy things on a server via SSH

```sh
zzh [--config zzh.json]
zzh connect [--config zzh.json]
zzh tunnel [--config zzh.json]
zzh sync [--config zzh.json]
```

```bash
# Install locally
git clone git@github.com:FuriouZz/zzh.git && cd zzh && deno run install.ts

# Install remotely
deno --unstable install [--allow-run] [--allow-read] [--allow-write] --name zzh https://raw.githubusercontent.com/FuriouZz/zzh/main/index.ts
```

`zzh.json` example with Bedrock's wordpress deploy to a Lightsail instance

```json
{
  "server.address": "0.0.0.0",
  "server.root": "/opt/bitnami",
  "server.user": "bitnami",
  "sync.directories": [
    {
      "from": "./",
      "to": "/wordpress",
      "exclude": [
        ".DS_Store",
        "web/app/upgrade",
        "web/app/uploads",
        "*.log",
        ".env",
        ".env.*",
        ".env.example",
        ".lightsail",
        ".git",
        "tmp",
      ]
    }
  ],
  "copy.files": {
    "/nginx/conf/server_blocks/https-server-block.conf": ".lightsail/nginx/conf/server_blocks/staging-https-server-block.conf",
    "/nginx/conf/server_blocks/server-block.conf": ".lightsail/nginx/conf/server_blocks/staging-server-block.conf",
    "/nginx/conf/.htpasswd": ".lightsail/nginx/conf/.htpasswd",
    "/wordpress/.env": ".env.staging"
  },
  "commands.after": ["sudo /opt/bitnami/ctlscript.sh restart nginx"]
}
```
