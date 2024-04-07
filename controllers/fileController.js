const express = require("express");
const multer = require("multer");
const File = require("../models/File.js");
const path = require("path");
const fs = require("fs/promises");
const { exit } = require("process");

//multer configuration for filename and destination

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },

  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage }).single("file");

const uploadSingleFile = async (req, res) => {
  try {
    upload(req, res, async (error) => {
      const { filename } = req.file;
      console.log(filename);
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while uploading file" });
      }

      const newFileData = await File.create({
        filename,
      });

      return res
        .status(201)
        .json({ message: "File Uploaded successfully!!", file: newFileData });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server Error!!" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const fileData = await File.findOne({ where: { id: fileId } });

    if (!fileData) {
      return res.status(404).json({ message: "File not found !!!!" });
    }

    //delete file from local storage
    const filepath = path.join("./assets", fileData.filename);
    await fs.unlink(filepath);

    //delete file data from database
    await fileData.destroy();
    return res.status(201).json({ message: "file deleted successfully!!!" });
  } catch (error) {
    console.error(error);
    if (error.code === "ENOENT") {
      return res.status(404).json({ message: "File not found" });
    }
    return res.status(500).json({ message: "Internal Server error!!" });
  }
};

module.exports = { uploadSingleFile, deleteFile };
