/**
 * Flatten object to one level
 */
export function flat<T extends object, U = Record<string, any>>(obj: T): U {
  const xprt: Record<string, any> = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const children = flat(obj[key] as unknown as object);
      for (const k in children) {
        xprt[key + "." + k] = children[k];
      }
    } else {
      xprt[key] = obj[key];
    }
  }

  return xprt as U;
}

/**
 * Transform a flatten object to a deflatten object
 */
export function deflat<T extends object>(obj: Record<string, any>): T {
  const xprt: any = {};

  Object.keys(obj).forEach((id) => {
    const keys = id.split(".");
    let current = xprt;

    keys.forEach((key, i) => {
      if (i == keys.length - 1) {
        current[key] = obj[id];
      } else {
        current[key] = current[key] || {};
      }

      current = current[key];
    });
  });

  return xprt as T;
}
