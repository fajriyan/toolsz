const toUrlSafe = (b64) =>
  b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromUrlSafe = (input) => {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const rest = b64.length % 4;
  return rest ? b64 + "=".repeat(4 - rest) : b64;
};

const stripDataUri = (input) => input.replace(/^data:[^,]*;base64,/i, "");

// atob bisa melempar DOMException yang tidak informatif, diseragamkan di sini
const atobSafe = (raw) => {
  try {
    return atob(raw);
  } catch {
    throw new Error(" karakter Base64 tidak valid");
  }
};

export function encodeBase64(text, { urlSafe = false } = {}) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  // dipecah per 32KB supaya tidak blew stack pada input besar
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  const b64 = btoa(binary);
  return urlSafe ? toUrlSafe(b64) : b64;
}

export function decodeBase64(
  input,
  { urlSafe = false, dataUri = true } = {},
) {
  let raw = input.trim().replace(/\s+/g, "");
  if (dataUri) raw = stripDataUri(raw);
  if (urlSafe) raw = fromUrlSafe(raw);
  if (raw === "") return "";
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(raw)) {
    throw new Error(" karakter Base64 tidak valid");
  }

  const binary = atobSafe(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(" hasil bukan teks UTF-8 yang valid");
  }
}
