import { assert } from "https://deno.land/std/testing/asserts.ts";

export async function grantPermissions(descs: Deno.PermissionDescriptor[]) {
  for (const desc of descs) {
    const permission = await Deno.permissions.request(desc);
    assert(permission.state === "granted", `Permission "${desc.name}" cannot be granted.`)
  }
}

export async function revokePermissions(descs: Deno.PermissionDescriptor[]) {
  for (const desc of descs) {
    const permission = await Deno.permissions.revoke(desc);
    assert(permission.state !== "granted", `Permission "${desc.name}" cannot be revoked.`)
  }
}
