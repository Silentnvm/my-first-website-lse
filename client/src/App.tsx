import { useEffect, useState } from "react";
import { BackendClass } from "@genezio-sdk/genezio-project" 
import "./App.css";

type LocationApiResponse = {
  country?: string;
  regionName?: string;
  city?: string;
};

export default function App() {
  const [location, setLocation] = useState<LocationApiResponse>({});
  const [catUrl, setCatUrl] = useState("");
  const [bgColor, setBgColor] = useState("white");

  const colorsArray = ["green", "blue", "pink", "yellow", "red", "orange", "purple", "brown"];

  async function CallLocationApi() {
    try {
      const res = await BackendClass.handleCall();
      console.log('Location API response:', res);  // Debug log
      setLocation(res);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }

  const fetchCatImage = async () => {
    try {
      const res = await fetch('https://api.thecatapi.com/v1/images/search?api_key=live_d7zNjuYMnUUxog47EOd1lNwM8Dpf9Z4ZU5M9RHjJs6uSwQzVy8AceZf2OZYQiKLA');
      const data = await res.json();
      if (data.length > 0) {
        setCatUrl(data[0].url);
      }
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []);

  const changeBgColorToGreen = () => {
    const newColor = bgColor === "green" ? "white" : "green";
    setBgColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  const changeBgColorFromArray = () => {
    const randomIndex = Math.floor(Math.random() * colorsArray.length);
    const selectedColor = colorsArray[randomIndex];
    setBgColor(selectedColor);
    document.body.style.backgroundColor = selectedColor;
  };

  const changeBgColorRandom = () => {
    const currentColor = bgColor;
    let newColor = currentColor;
    while (newColor === currentColor) {
      newColor = colorsArray[Math.floor(Math.random() * colorsArray.length)];
    }
    setBgColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  const changeCatPhoto = () => {
    fetchCatImage();
  };

  return (
    <div>
      <h1 style={{ marginBottom: "4rem" }}>Nitu Tiberiu-Florian Project</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <button onClick={changeBgColorToGreen}>
          Change background to green
        </button>
        <button onClick={changeBgColorFromArray}>
          Change background from array
        </button>
        <button onClick={changeBgColorRandom}>
          Change background randomly from array
        </button>
      </div>

      {catUrl && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img width={250} height={250} src={catUrl} alt="Random Cat" />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <button onClick={changeCatPhoto}>Change cat photo</button>
      </div>
      <div className="card">
        <button onClick={() => CallLocationApi()}>Call location api</button>
        <p>Country: {location.country || "no call"}</p>
        <p>Region: {location.regionName || "no call"}</p>
        <p>City: {location.city || "no call"}</p>
      </div>
    </div>
  );
}
