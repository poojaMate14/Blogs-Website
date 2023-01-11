import React, { useState, useEffect } from "react";
import './Blog.css'

const BASE_URL = 'http://localhost:8000/'

function Blog({blog}) {
    const [imageUrl, setImageUrl] = useState('')
    
    useEffect(() => {
        setImageUrl(BASE_URL + blog.image)
    }, [])

    const handleDelete = (event) => {
        event?.preventDefault()

        const requestOptions = {
            method: 'DELETE'
        }

        fetch(BASE_URL + 'blogs/' + blog.id, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location.reload()
                }
                throw response
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="blog">
            <img className="blog_image" src={imageUrl}/>
            <div className="blog_content">
                <div className="blog_title">{blog.title}</div>
                <div className="blog_creator"> By {blog.creator_name}</div>
                <div className="blog_text">{blog.content}</div>
                <div className="blog_delete">
                    <button onClick={handleDelete}>Delete Blog</button>
                </div>
            </div>
        </div>
    )

}

export default Blog
