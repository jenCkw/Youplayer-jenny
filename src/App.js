import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Video from './components/Video';
import { 
  youtube_seach, 
  clientId, 
  API 
} from './youtube'
import { Routes, Route } from 'react-router-dom';
import PlayVideo from './components/PlayVideo';
import Auth from './components/Auth';
import { gapi } from 'gapi-script';

const token = localStorage.getItem('user');

function App() {
  const [videos, setVideos] = useState([])
  // onsearch function
  const search = async (keywork) => {
    const response = await youtube_seach.get('/search',{
      params:{
        q: keywork
      }
    });
    setVideos(response.data.items)
  }

  console.log(token)
  // get subscription data
  const subscription = async () => {
    fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&maxResults=50&key=${API}&access_token=${token}`)
    .then(response=>response.json())
    .then(data=>{setVideos(data.items)})
  }

  const onSuccess = (res) =>{
      console.log("LOGIN SUCCESS! Current user", res.profileObj);
      localStorage.setItem("user",res.accessToken)
  }

  const onFailure = (res) =>{
      console.log("LOGIN SUCCESS! Current user", res.profileObj);
  }

  const start = () =>{
    gapi.client.init({
      apiKey: API,
      clientId,
      scope:'https://www.googleapis.com/auth/youtube.force-ssl',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    })
  }

  useEffect(()=>{
    subscription()
    gapi.load("client:auth2", start)
  },[])

  return (
    <div>
      <NavBar search={search}/>
      <Routes>
        <Route path='/' element={<Video videos={videos}/>}/>
        <Route path=':videoId' element={<PlayVideo videos={videos}/>}/>
        <Route path='/login' element={<Auth onSuccess={onSuccess} onFailure={onFailure}/>}/>
      </Routes>
    </div>
  );
}

export default App;
