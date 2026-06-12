const fs = require("fs");
const path = require("path");

const UPLOADS_DIR = path.join(
    __dirname,
    "..",
    "uploads"
);

const MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

function cleanupUploads() {
    fs.readdir(
        UPLOADS_DIR,
        (err, files) => {
            if (err) {
                console.error(
                    "Cleanup Error:",
                    err
                );
                return;
            }

            files.forEach((file) => {
                const filePath = path.join(
                    UPLOADS_DIR,
                    file
                );

                fs.stat(
                    filePath,
                    (err, stats) => {
                        if (err) return;

                        const age =
                            Date.now() -
                            stats.mtimeMs;

                        if (
                            age > MAX_AGE_MS
                        ) {
                            fs.unlink(
                                filePath,
                                (err) => {
                                    if (err) return;

                                    console.log(
                                        "Deleted:",
                                        file
                                    );
                                }
                            );
                        }
                    }
                );
            });
        }
    );
}

module.exports = cleanupUploads;