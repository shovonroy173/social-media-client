import React, { useEffect, useState } from "react";
import "./modal.css";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
const Modal = ({setOpen , userId , postId}) => {
  console.log(userId , postId);
  const [comments , setComments] = useState([]);
  useEffect(()=>{
    const getComments = async()=>{
      const res = await axios.get(`http://localhost:5000/api/comment/getComments/${postId}`);
      setComments(res.data);
    };
    getComments();
  } , [postId]);
  console.log(comments);
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <div>
          {comments.map((item , index)=>(
            <p className="" key={index}>{item?.comment}</p>
          ))}
        </div>
      <CloseIcon onClick={()=>setOpen(false)} style={{"color":"black"}}/>

      </div>

    </div>
  );
};

export default Modal;
