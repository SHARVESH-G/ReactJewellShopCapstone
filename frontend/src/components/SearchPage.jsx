import React, { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Text search
  const searchImages = async (e) => {
    e.preventDefault();
    if (!query) return;
    setResults([]);
    setStatus("🔎 Searching...");
    try {
      const res = await fetch("http://127.0.0.1:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!data.images || data.images.length === 0) {
        setStatus("No matches found 😢");
        return;
      }
      setResults(data.images);
      setStatus("");
    } catch (err) {
      setStatus("Something went wrong. Try again.");
      console.error(err);
    }
  };

  // OCR image search
  const searchByImage = async () => {
    if (!imageFile) return alert("Select an image first!");
    setResults([]);
    setStatus("🔎 Extracting text from image...");
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const res = await fetch("http://127.0.0.1:8000/search/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(`OCR detected: "${data.query}"`);
      if (!data.images || data.images.length === 0) {
        setStatus((prev) => prev + " — No matches found 😢");
        return;
      }
      setResults(data.images);
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong during OCR search.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Luxury Jewelry Finder</h2>
      <p className="subtitle">Search jewelry by text or image</p>

      {/* TEXT SEARCH */}
      <form className="search-bar" onSubmit={searchImages}>
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gold ring with diamond..."
          />
          <label>Search Jewelry</label>
        </div>
        <button type="submit">Search</button>
      </form>

      {/* IMAGE SEARCH */}
      <div className="image-search">
        <div className="input-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </div>
        <button onClick={searchByImage}>Search by Image (OCR)</button>
      </div>

      <p id="status" className="status">{status}</p>
      <div className="results-grid">
        {results.map((src, idx) => (
          <img key={idx} src={`http://127.0.0.1:8000${src}`} className="result-img" />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
