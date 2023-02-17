import React, {useEffect,useState} from 'react'
import {Link,useLocation} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [posts,setPosts] = useState([]);
    //send category for url to route 
    const cat = useLocation().search
    //whenever change category, set post
    useEffect(() =>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`/posts${cat}`);
                setPosts(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchData();
    }, [cat]);
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam similique sunt, molestiae error commodi, possimus maiores fugiat architecto, voluptatem quia hic recusandae esse ipsam?",
    //         img: bouzkovaandreescu
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam similique sunt, molestiae error commodi, possimus maiores fugiat architecto, voluptatem quia hic recusandae esse ipsam?",
    //         img: gauffsiniakova
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam similique sunt, molestiae error commodi, possimus maiores fugiat architecto, voluptatem quia hic recusandae esse ipsam?",
    //         img: keninazarenka
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam similique sunt, molestiae error commodi, possimus maiores fugiat architecto, voluptatem quia hic recusandae esse ipsam?",
    //         img: anisimovakostyuk
    //     },
    //     {
    //         id: 5,
    //         title: "Lorem ipsum dolor sit amet",
    //         desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quibusdam similique sunt, molestiae error commodi, possimus maiores fugiat architecto, voluptatem quia hic recusandae esse ipsam?",
    //         img: collinskalinskaya
    //     },

    // ];

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    }
    return (
        <div className='home'>
            <div className = "posts">
                {posts.map((post)=>(
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="image" />
                        </div>
                        <div className="content">
                                <Link className="link" to={`/posts/${post.id}`}>
                                <h1>{post.title}</h1>
                                </Link>
                                <p>{getText(post.desc)}</p>
                                <button>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home