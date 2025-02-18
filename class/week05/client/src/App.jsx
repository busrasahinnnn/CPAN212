import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file,setFile] = useState(null);

  // Fetch function to get data
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/data");
      const data = await response.json();
      setMessage(JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Login form submission handler
  const loginForm = async (e) => {
    e.preventDefault(); // Fixed typo
    
    const submission = { email, password };
    
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const data = await response.json();
      setMessage(JSON.stringify(data));
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

const fileUpload = async (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:8000/fileform`, {
      method: "POST",
      body: formData
    })
    const data = await response.json();
    setMessage(JSON.stringify(data))
  }catch (error) {
    console.log(error)
  }
}

  return (
    <div>
      <p>{message}</p>
      <button onClick={fetchData}>Click me for Data</button>
      <form onSubmit={loginForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={fileUpload}>
        <input
        type="file"
        multiple
        onChange={(e)=>{setFile(e.target.value)}}

        />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default App;
