import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import archiver from "archiver";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_MEMORY_THRESHOLD = 512 * 1024 * 1024; // 512MB
const DEFAULT_MEMORY_CHECK_INTERVAL = 1000; // 1 second

const zipFolder = (sourceFolder, outputZip) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(sourceFolder)) {
      return reject(new Error(`Source folder ${sourceFolder} does not exist`));
    }

    const output = fs.createWriteStream(path.join(__dirname, outputZip));
    const archive = archiver("zip", { zlib: { level: 9 } });
    let hasError = false;

    output.on("close", () => {
      if (!hasError) {
        console.log(`${archive.pointer()} total bytes`);
        resolve();
      }
    });

    output.on("end", () => {
      console.log("Data has been drained");
    });

    archive.on("warning", (err) => {
      if (err.code === "ENOENT") {
        console.log(err);
      } else {
        hasError = true;
        output.end();
        reject(err);
      }
    });

    archive.on("error", (err) => {
      hasError = true;
      output.end();
      reject(err);
    });

    const memoryCheck = setInterval(() => {
      const memoryUsage = process.memoryUsage();
      if (memoryUsage.heapUsed > DEFAULT_MEMORY_THRESHOLD) {
        hasError = true;
        output.end();
        reject(new Error("Memory usage exceeded threshold"));
      }
    }, DEFAULT_MEMORY_CHECK_INTERVAL);

    output.on("close", () => clearInterval(memoryCheck));

    archive.pipe(output);
    archive.directory(sourceFolder, false);
    archive.finalize();
  });
};

const sourceFolder = process.argv[2] || path.join(__dirname, "../dist");
const outputZip = process.argv[3] || "./release.zip";

zipFolder(sourceFolder, outputZip)
  .then(() => {
    console.log(
      `Successfully created zip file at ${outputZip} from ${sourceFolder}`
    );
  })
  .catch((err) => {
    console.error("Failed to create zip file:", err.message);
    process.exit(1);
  });
