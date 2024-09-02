import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewPostPage() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Append images to FormData
    images.forEach((image) => {
      formData.append("postData[images]", image); // Field name for files
    });

    formData.append("postData[title]", formData.get("title"));
    formData.append("postData[price]", parseInt(formData.get("price")));
    formData.append("postData[address]", formData.get("address"));
    formData.append("postData[city]", formData.get("city"));
    formData.append("postData[bedroom]", parseInt(formData.get("bedroom")));
    formData.append("postData[bathroom]", parseInt(formData.get("bathroom")));
    formData.append("postData[type]", formData.get("type"));
    formData.append("postData[property]", formData.get("property"));
    formData.append("postData[latitude]", formData.get("latitude"));
    formData.append("postData[longitude]", formData.get("longitude"));

    formData.append("postDetail[desc]", value);
    formData.append("postDetail[utilities]", formData.get("utilities"));
    formData.append("postDetail[pet]", formData.get("pet"));
    formData.append("postDetail[income]", formData.get("income"));
    formData.append("postDetail[size]", parseInt(formData.get("size")));
    formData.append("postDetail[school]", parseInt(formData.get("school")));
    formData.append("postDetail[bus]", parseInt(formData.get("bus")));
    formData.append(
      "postDetail[restaurant]",
      parseInt(formData.get("restaurant"))
    );

    try {
      const res = await apiRequest.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      toast.error("something went wrong")
    }
  };

  const handleImageFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length < 3 || selectedFiles.length > 5) {
      setError("You must upload between 3 and 5 images.");
      return;
    }
    setImages(selectedFiles);
    setError("");

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" min={10} name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" value={value} onChange={setValue} />;
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button
              className="sendButton"
              disabled={images.length < 3 || images.length > 5}
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="fileContainer">
          <label htmlFor="images" className="customFileInput">
            upload Images
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageFile}
              accept="image/*"
              className="fileInputHidden"
            />
          </label>
          {error && <p className="error">{error}</p>}
        </div>
        <div className="imagePreviews">
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`preview ${index + 1}`}
              style={{
                width: "150px",
                height: "150px",
                margin: "5px",
              }}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewPostPage;
