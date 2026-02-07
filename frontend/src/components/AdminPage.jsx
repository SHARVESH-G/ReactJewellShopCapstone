import React, { useState } from "react";

const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    if (!file) return setMsg("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);
    setMsg("Uploading...");
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMsg(`✅ Uploaded to ${data.metal} folder`);
      setFile(null);
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed. Try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Admin Panel</h1>
      <p className="subtitle">Upload premium jewelry images</p>


      <div className="upload-section">
        <div className="input-wrapper">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label>Select Image</label>
        </div>
        <button type="button" onClick={upload}>Upload</button>
      </div>

      <p id="msg">{msg}</p>
    </div>
  );
};

export default AdminPage;
