import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import archiver from "archiver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const zipFolder = (sourceFolder, outputZip) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(__dirname, outputZip));
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      resolve();
    });

    output.on("end", () => {
      console.log("Data has been drained");
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.log(err);
      } else {
        reject(err);
      }
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
  });
};

const sourceFolder = path.join(__dirname, "../dist");
const outputZip = "./release.zip";

zipFolder(sourceFolder, outputZip)
  .then(() => {
    console.log("Zip file created");
  })
  .catch((err) => {
    console.error(err);
  });
