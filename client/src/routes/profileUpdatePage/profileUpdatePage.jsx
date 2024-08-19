import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../contexts/AuthContext";
import apiRequest from "../../lib/apiRequest"
function ProfileUpdatePage() {

  const [error,setError] = useState("") ;

  const {currentUser,updateUser} = useContext(AuthContext) ;

  const handleSubmit =async(e)=>{
    e.preventDefault() ;

    const formdata = new FormData(e.target) ;
    const {username , email,password} = Object.fromEntries(formdata) ;

    try {
      // const res = await apiRequest
    } catch (error) {
      console.log(error) ;
      setError(err.response.data.message) ;
    }
  }



  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar|| "/NoAvatar.jpg"} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
