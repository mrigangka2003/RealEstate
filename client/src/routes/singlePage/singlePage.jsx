import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify"
import { useContext, useState } from "react";
import {AuthContext} from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest"

function SinglePage() {

  const navigate = useNavigate() ;
  const post = useLoaderData() ; 
  const {currentUser} = useContext(AuthContext) ;
  const [saved , setSaved] = useState(post.isSaved) ; 

  const handleSave = async() =>{
    setSaved((prev)=>!prev)
    if(!currentUser){
      navigate("/login")
    }
    try {
      await apiRequest.post('/users/save',{postId:post.id})
    } catch (error) {
      console.log(error) ;
      setSaved((prev)=>!prev)
    }
  }


  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.image} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetails.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {
                  post.postDetails.utilitties === "owner" ? 
                  (<p>Owner is responsible</p>):
                  (<p>Tenant is responsible</p>)
                }
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {
                  post.postDetails.pet === "allowed" ?
                  (<p>pet is allowed</p>):(<p>pet is not allowed</p>)
                }
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Income policy</span>
                <p>
                  {post.postDetails.income}
                </p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetails.size}</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom}</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom}</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetails.school >999 ? post.postDetails.school/1000 + "km " : post.postDetails.school+"m "}away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetails.bus}m way</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetails.restaurants}m way</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor : saved ? "black" : "white" 
            }}>
              <img src="/save.png" alt="" />
              {saved ? "place saved" :"Saved the place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
