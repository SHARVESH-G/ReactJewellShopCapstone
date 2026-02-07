import React, { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const searchImages = async (e) => {
    e.preventDefault();
    if (!query) return;

    setResults([]);
    setStatus("🔎 Searching...");

    const res = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    if (!data.images?.length) {
      setStatus("No matches found 😢");
      return;
    }

    setResults(data.images);
    setStatus("");
  };

  const searchByImage = async () => {
    if (!imageFile) return;

    setResults([]);
    setStatus("🔎 Extracting text...");

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("http://127.0.0.1:8000/search/image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setStatus(`OCR detected: "${data.query}"`);
    setResults(data.images || []);
  };

  return (
    <div className="container">
      <h1 className="title">Luxury Jewelry Finder</h1>
      <p className="subtitle">Search jewelry by text or image</p>

      <form className="search-bar" onSubmit={searchImages}>
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <label>Search Jewelry</label>
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="image-search">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button onClick={searchByImage}>Search by Image</button>
      </div>

      <p className="status">{status}</p>

      <div className="results-grid">
        {results.map((src, i) => (
          <img key={i} src={`http://127.0.0.1:8000${src}`} className="result-img" />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
