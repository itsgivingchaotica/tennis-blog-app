import axios from 'axios';
import React, {useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
//text editor
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.title || "");
    const [title, setTitle] = useState(state?.desc || "");
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const navigate = useNavigate();

    const upload = async() => {
        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err)
        {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try{
            state ? await axios.put(`/posts/${state.id}`, {
                title,desc:value,cat,img:file ? imgUrl : "",
            }) : await axios.post(`/posts/`, {
                title,desc:value,cat,img:file,date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
            navigate("/")
        } catch(err)
        {
            console.log(err);
        }
    };

    return (
        <div className='add'>
            <div className="content">
                <input type="text" value={title}placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />;
                </div>
            </div>
            <div className="menu">
                <div className="item">
                <h1>Publish</h1>
                <span>
                    <b>Status: </b> Draft
                </span>
                 <span>
                    <b>Visibility: </b> Public
                </span>
                <input style={{display:"none"}} type="file" id="file" name="" onChange={(e)=>setFile(e.target.files[0])}/>
                <label className="file" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>Save as a  draft</button>
                    <button onClick={handleClick}>Publish</button>
                </div>
                </div>
                <div className="item">
                    <h1>Category</h1>

                    <div className="cat">
                    <input type="radio" checked={cat === "grandSlams"} name="cat" value="grandSlams" id="grandSlams" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="grandSlams">GRAND SLAMS</label>
                    </div>
                    
                    <div className="cat">
                    <input type="radio" checked={cat === "thousand"} name="cat" value="thousand" id="thousand" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="thousand">1000 LEVEL</label>
                    </div>

                    <div className="cat">
                    <input type="radio" checked={cat === "fiveHundred"} name="cat" value="fiveHundred" id="fiveHundred" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="fiveHundred">500 LEVEL</label>
                    </div>

                    <div className="cat">
                    <input type="radio" checked={cat === "twoFifty"} name="cat" value="twoFifty" id="twoFifty" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="grandSlams">250 LEVEL</label>
                    </div>

                    <div className="cat">
                    <input type="radio" checked={cat === "challengers"} name="cat" value="challengers" id="challengers" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="challengers">CHALLENGERS</label>
                    </div>

                    <div className="cat">
                    <input type="radio" checked={cat === "itf"} name="cat" value="itf" id="itf" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="itf">ITF TOURNAMENTS</label>
                    </div>

                    <div className="cat">
                    <input type="radio" checked={cat === "juniors"} name="cat" value="juniors" id="juniors" onChange={(e)=>setCat(e.target.value)}/>
                    <label htmlFor="juniors">JUNIORS</label>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Write