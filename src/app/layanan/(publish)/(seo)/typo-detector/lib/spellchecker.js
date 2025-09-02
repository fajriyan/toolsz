import fs from "fs";
import path from "path";
import nspell from "nspell";

function loadDictionary(lang) {
  const basePath = path.join(process.cwd(), "public", "assets", "dictionaries");

  let aff, dic;

  if (lang === "id") {
    aff = fs.readFileSync(path.join(basePath, "indonesia.aff"));
    dic = fs.readFileSync(path.join(basePath, "indonesia.dic"));
  } else if (lang === "en") {
    aff = fs.readFileSync(path.join(basePath, "en_US.aff"));
    dic = fs.readFileSync(path.join(basePath, "en_US.dic"));
  } else {
    throw new Error("Unsupported language");
  }

  return nspell(aff, dic);
}

export default loadDictionary;
