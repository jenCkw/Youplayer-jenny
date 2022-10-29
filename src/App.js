import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Video from "./components/Video";
import { youtube_seach, clientId, API } from "./youtube";
import { Routes, Route, Navigate } from "react-router-dom";
import PlayVideo from "./components/PlayVideo";
import Auth from "./components/Auth";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("user");

function App() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);

  const [isConnected, setIsConnected] = useState(false);

  // onsearch function
  const search = async (keywork) => {
    const response = await youtube_seach.get("/search", {
      params: {
        q: keywork,
      },
    });
    setVideos(response.data.items);
  };

  console.log(token);
  // get subscription data
  const subscription = async () => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=50&key=${API}&access_token=${token}`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideos(data.items);
      });
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user", res.profileObj);
    localStorage.setItem("user", res.accessToken);
    setIsConnected(true);
    navigate("/");
  };

  const onFailure = (res) => {
    console.log("LOGIN SUCCESS! Current user", res.profileObj);
  };

  const start = () => {
    gapi.client
      .init({
        apiKey: API,
        clientId,
        scope: "https://www.googleapis.com/auth/youtube",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
        ],
      })
      .then(() => {
        var auth2 = gapi.auth2.getAuthInstance();

        const user = auth2.currentUser?.get();
        if (user) setIsConnected(auth2.isSignedIn.get());
      });
  };

  useEffect(() => {
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    subscription();
  }, [isConnected]);

  return (
    <div>
      <NavBar
        search={search}
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      <Routes>
        <Route
          path="/"
          element={
            isConnected ? <Video videos={videos} /> : <Navigate to="/login" />
          }
        />
        <Route path=":videoId" element={<PlayVideo videos={videos} />} />
        <Route
          path="/login"
          element={<Auth onSuccess={onSuccess} onFailure={onFailure} />}
        />
      </Routes>
    </div>
  );
}

export default App;
