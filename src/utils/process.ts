export async function spawn<T extends Deno.RunOptions = Deno.RunOptions>(
  options: T
) {
  const process = Deno.run({
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
    ...options,
  });

  await process.status();
}
