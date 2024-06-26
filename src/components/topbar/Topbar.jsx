import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./topbar.css";
import { logOut } from "../../redux/userRedux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Topbar = () => {
  const [searchText , setSearch] = useState("");
  const user = useSelector((state)=>(state.user.currentUser));
  console.log( "LINE AT 12" ,searchText);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = ()=>{
    try {
      dispatch(logOut());
      <Navigate to="login"/>
    } catch (error) {
      console.log(error);
    }
    
  };


  const handleProfile = async()=>{
    navigate(`/profile/${user._id}`);
   
  };

  const [users, setUsers] = useState([]);
  const searchedUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/find/users?q=${searchText}`
      );
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchText && searchedUser();
  }, [searchText]);

  const handleSearch = () => {
    searchedUser();
  };
console.log(users);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        
        <Link to="/" className="logo"><span>Social-media</span></Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
        <SearchIcon className="searchIcon" onClick={handleSearch}/>
          <input type="text" placeholder="Search people or post..." className="searchInput" onChange={((e)=>setSearch(e.target.value))} />
          {(searchText && users) &&<div className="searchedUserBox">
            {
              users.map((item , index)=>(
                <div className="searchedUser" onClick={()=> navigate(`/profile/${item._id}`)} key={index}>
                  <img src="http://localhost:3000/assets/1.jpg" alt="img" className="searchedUserImg"/>
                  <div>
                  <p>{item?.name}</p>
                  <p>{item?.city}</p>
                  </div>
                </div>
              ))
            }
          </div>}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <span className="topbarLink">HomePage</span>
            <span className="topbarLink">TimeLine</span>
        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <PersonIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <ChatIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <NotificationsIcon/>
                <span className="topbarIconBadge">1</span>
            </div>
        </div>
        <div className="profile">
          <img src="../../assets/1.jpg" alt="" className="topbarImg" onClick={handleProfile}/>
          <span className ="logout" onClick={handleClick}>Logout</span>  
        </div>
      </div>
    </div>
  );
};

export default Topbar;
