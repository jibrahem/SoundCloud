import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllImageThunk } from "../../store/image";
import { Link } from "react-router-dom";
import "./Home.css";

export default function UserHome() {
  const sessionUser = useSelector((state) => state.session.user);
  const imagesStore = useSelector((state) => state.images.allImages);
  const imagesArr = Object.values(imagesStore);
  const currDate = new Date();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImageThunk());
  }, []);

  if (imagesArr.length < 1) return null;

  return (
    <>
      <div className="user-home-wrapper">
        <div className="user-home-banner">
          <div>
            <p>All Activity</p>
            <p>What's new?</p>
          </div>
          <div>
            <p>layout 1</p>
            <p>layout 2</p>
            <p>layout 3</p>
          </div>
        </div>
        <div className="image-list-div">
          <ul>
            {imagesArr.map((image) => (
              <li key={image.id} className="image-card">
                <h4>
                  {image.User.first_name} {image.User.last_name}
                </h4>
                <p>{currDate - image.uploadedAt}d ago</p>
                <Link key={image.id} to={`/photos/${image.id}`}>
                  <img src={image.img} alt={image.title} />
                  <p>{image.title}</p>
                </Link>
                <p>{image.description}</p>
                <div>
                  <div>
                    {image.view_count > 1000
                      ? parseFloat(image.view_count) / 1000 + "K"
                      : image.view_count}{" "}
                    views
                  </div>
                  <div>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-light fa-album-circle-plus"></i>
                    <i className="fa-solid fa-tree"></i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
