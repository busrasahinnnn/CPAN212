import { useState } from "react";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [message, setMessage] = useState("");
  const [displayDogImage, setDisplayDogImage] = useState("");

  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchMultipleFiles = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      const filePromises = data.map(async (filename) => {
        const fileResponse = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fileResponse.blob();
        return URL.createObjectURL(fileBlob);
      });
      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDogImage = async () => {
    try {
      const fileResponse = await fetch(displayDogImage);
      const blob = await fileResponse.blob();
      const formData = new FormData();
      formData.append("file", blob, "dog-image.jpg");
      await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#007bff',
      color: 'white',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }} onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img src={displayImage} alt="Display" style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit" style={{ backgroundColor: 'white', color: '#007bff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Upload Single File</button>
      </form>
      <button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }} onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />
          </div>
        ))
      ) : (
        <p>No images to display</p>
      )}
      <button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }} onClick={fetchDogImage}>Fetch Dog Image</button>
      {displayDogImage && (
        <div>
          <img src={displayDogImage} style={{ width: '200px', marginTop: '10px', borderRadius: '8px' }} />
          <br />
          <button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }} onClick={saveDogImage}>Save it</button>
        </div>
      )}
    </div>
  );
};

export default App;
