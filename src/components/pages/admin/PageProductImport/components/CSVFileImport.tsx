import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { Buffer } from "buffer";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File | null>();
  const credentials = `${localStorage.getItem(
    "USERNAME"
  )}:${localStorage.getItem("PASSWORD")}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
    try {
      const response = await axios.get(url, {
        params: { name: encodeURIComponent(file?.name || "") },
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      const result = await fetch(response.data, {
        method: "PUT",
        body: file,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      console.log("Upload successful");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
