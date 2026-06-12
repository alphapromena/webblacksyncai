import { createReadStream, createWriteStream, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import { deflateRawSync, crc32 } from "node:zlib";
import { readFileSync } from "node:fs";

const ROOT = process.cwd();
const OUT = "blacksync-source.zip";
const EXCLUDE = new Set([
  "node_modules", "dist", ".git", ".cache", ".local", ".upm",
  ".config", ".replit_cache", ".breakpoints",
]);

function isExcludedPath(rel) {
  // Keep imported logos, drop the rest of attached_assets (screenshots, etc.)
  if (rel.startsWith("attached_assets/") && !rel.startsWith("attached_assets/logos/")) {
    return true;
  }
  return false;
}

async function collect(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (EXCLUDE.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await collect(full, acc);
    else if (entry.isFile()) {
      const rel = relative(ROOT, full);
      if (rel === OUT || rel.endsWith(".log") || isExcludedPath(rel)) continue;
      acc.push(rel);
    }
  }
  return acc;
}

function toDosTime(d) {
  const time = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() / 2)) & 0xffff;
  const date = (((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xffff;
  return { time, date };
}

const files = await collect(ROOT);
const chunks = [];
const central = [];
let offset = 0;

for (const rel of files) {
  const data = readFileSync(join(ROOT, rel));
  const comp = deflateRawSync(data);
  const crc = crc32(data) >>> 0;
  const nameBuf = Buffer.from(rel, "utf8");
  const { time, date } = toDosTime(statSync(join(ROOT, rel)).mtime);

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0);
  local.writeUInt16LE(20, 4);
  local.writeUInt16LE(0x0800, 6);
  local.writeUInt16LE(8, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(comp.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);
  local.writeUInt16LE(0, 28);

  chunks.push(local, nameBuf, comp);

  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0);
  cen.writeUInt16LE(20, 4);
  cen.writeUInt16LE(20, 6);
  cen.writeUInt16LE(0x0800, 8);
  cen.writeUInt16LE(8, 10);
  cen.writeUInt16LE(time, 12);
  cen.writeUInt16LE(date, 14);
  cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(comp.length, 20);
  cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(nameBuf.length, 28);
  cen.writeUInt32LE(offset, 42);
  central.push(Buffer.concat([cen, nameBuf]));

  offset += local.length + nameBuf.length + comp.length;
}

const centralBuf = Buffer.concat(central);
const end = Buffer.alloc(22);
end.writeUInt32LE(0x06054b50, 0);
end.writeUInt16LE(files.length, 8);
end.writeUInt16LE(files.length, 10);
end.writeUInt32LE(centralBuf.length, 12);
end.writeUInt32LE(offset, 16);

const ws = createWriteStream(OUT);
for (const c of chunks) ws.write(c);
ws.write(centralBuf);
ws.write(end);
ws.end(() => console.log(`Wrote ${OUT} with ${files.length} files`));
