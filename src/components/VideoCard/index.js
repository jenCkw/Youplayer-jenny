import React from "react";
import "./Videocard.css";
import { Link } from "react-router-dom";

function Videocard({ thumnail, title, author, auther_img, videoId }) {
  console.log(videoId);
  return (
    <Link to={`/${videoId}`} className="video__card">
      <div className="video__thumnail">
        <img className="thumnail__img" src={thumnail} alt="thumnail" />
      </div>
      <div className="video__description">
        {/* <img className='author__img' src={auther_img} alt="author" /> */}
        <div className="video__detail">
          <h5>{title}</h5>
          <div>
            <p className="author__name">{author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Videocard;
