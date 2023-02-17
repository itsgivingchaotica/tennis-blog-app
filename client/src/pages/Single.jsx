import React, {useEffect,useState,useContext} from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import Me from "../imgs/me.png"
import Edit from "../imgs/edit.png"
import Delete from "../imgs/delete.png"
import Menu from "../components/Menu"
import axios from "axios"
import moment from "moment"
import { AuthContext } from "../context/authContext.js"

const Single = () => {
    const [post,setPost] = useState({});
    //send category for url to route 
    const location = useLocation();
    const navigate = useNavigate();
    //index 2 is the id number
    console.log(location.pathname);
    const postId = location.pathname.split('/')[2];
    console.log(postId);

    const {currentUser} = useContext(AuthContext);
    //whenever change category, set post
    useEffect(() =>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [postId]);

    const handleDelete = async () => {
         try{
                await axios.delete(`/posts/${postId}`);
                navigate("/");
            }catch(err){
                console.log(err)
            }
    }

    const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

    return (
        <div className='single'>
            <div className="content">
                <img src={`../upload/${post?.img}`} alt=""/>
            <div className="user">
                {post.userImg && <img src={post.userImg} alt=""/>}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
                <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt=""/>
            </Link>
                <img onClick={handleDelete} src={Delete} alt=""/>
            </div>)}
            </div>
            <h1>{post.title}
            </h1>
                {getText(post.desc)}
            </div>
            <div className="menu">
            <Menu cat={post.cat}/>
            </div>
        </div>
    )
}

export default Single