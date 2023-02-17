import React, {useEffect,useState} from 'react'
import axios from 'axios'
import bouzkovaandreescu from '../imgs/bouzkova_andreescu.png'
import gauffsiniakova from '../imgs/gauff_siniakova.png'
import anisimovakostyuk from '../imgs/anisimova_kostyuk.png'
import keninazarenka from '../imgs/kenin_azarenka.png'
import collinskalinskaya from '../imgs/collins_kalinskaya.png'

const Menu = ({cat}) => {
    const [posts,setPosts] = useState([]);
    //send category for url to route
    //whenever change category, set post
    useEffect(() =>{
        const fetchData = async ()=> {
            try{
                const res = await axios.get(`/posts/?cat=${cat}`);
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
    return (
        <div className='menu'>
        <h1>Related posts</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
            <img src={`../upload/${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
            </div>
        ))}
        </div>
    );
};

export default Menu;