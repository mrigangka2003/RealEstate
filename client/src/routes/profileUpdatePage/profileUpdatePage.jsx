import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../contexts/AuthContext";
import apiRequest from "../../lib/apiRequest"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileUpdatePage() {
  const [error,setError] = useState("") ;
  const {currentUser,updateUser} = useContext(AuthContext) ;

  const handleSubmit =async(e)=>{
    e.preventDefault() ;

    const formdata = new FormData(e.target) ;
    const {username , email,password} = Object.fromEntries(formdata) ;
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password
      })
      updateUser(res.data) ;
      toast.success("User Data has been updated!");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred"); 
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
          <ToastContainer/>
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar|| "/NoAvatar.jpg"} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
