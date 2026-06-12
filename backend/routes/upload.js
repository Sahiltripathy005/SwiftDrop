const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    },
});

const upload = multer({ storage });

router.post(
    "/",
    upload.single("file"),
    (req, res) => {
        res.json({
            filename: req.file.filename,
            originalName: req.file.originalname,
        });
    }
);

module.exports = router;
