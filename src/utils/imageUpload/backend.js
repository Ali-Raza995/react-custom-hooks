/* eslint-disable no-undef */
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Configure AWS S3 client
const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Endpoint to upload files
app.post('/upload', async (req, res) => {
  try {
    const file = req.files.file; // Assuming you're using express-fileupload middleware
    const fileStream = fs.createReadStream(file.tempFilePath);

    const uploadParams = {
      Bucket: process.env.S3_BUCKET,
      Key: file.name, // Use the original file name
      Body: fileStream,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});