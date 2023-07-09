import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getUserImagesThunk } from "../../store/image";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './Photostream.css'


export default function PhotostreamPage({ userImagesArr }) {
  const sessionUser = useSelector((state) => state.session.user);

  const currDate = new Date();
  // console.log("currDate in photostream: ", currDate)

  if (userImagesArr.length < 1) return null;



  return (
    <>
      {/* <div className="photo-stream-title">Photostream</div> */}
      <ul className="photo-stream-container">
        {userImagesArr[0].map((image) => (
          <div key={image.id}>
            {/* {console.log("image in user images page", image[0])} */}
            <div className="photo-stream-user-date-container">
            <h4 className="photo-stream-user-name">
              {image.User.first_name} {image.User.last_name}
            </h4>
            {/* <p>{currDate - image.uploadedAt}d ago</p> */}
            <div className="photo-stream-date">
            {(() => {
                const uploadedOn = new Date(image.uploaded_on);
                const timeDiff = Math.round((currDate - uploadedOn) / (1000 * 60 * 60 * 24));
                if (timeDiff > 1) {
                    return <p>{timeDiff}ds ago</p>
                }
                return <p>{timeDiff}d ago</p>
            })()}
            </div>
            </div>
            <Link key={image.id} to={`/photos/${image.id}`}>
              <img className="photo-stream-image" src={image.img} alt={image.title} />
              <p className="photo-stream-image-title">{image.title}</p>
            </Link>
              <p className="photo-stream-image-description">{image.description}</p>
            <div>
              <div>
                {image.view_count > 1000
                  ? parseFloat(image.view_count) / 1000 + "K"
                  : image.view_count}{" "}
                views
              </div>
              <div className="photo-stream-icons">
                <i className="fa-regular fa-star"></i>
                <Link to={`/photos/${image.id}`}><i className="fa-regular fa-comment"></i></Link>
                <i className="fa-light fa-album-circle-plus"></i>
                {/* <i className="fa-solid fa-tree"></i> */}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
}
