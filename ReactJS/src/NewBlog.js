import React, { useState } from "react";
import './NewBlog.css'

const BASE_URL = 'http://localhost:8000/'

function NewBlog() {
    
    const[image, setImage] = useState(null)
    const[creator, setCreator] = useState('')
    const[title, setTitle] = useState('')
    const[text, setText] = useState('')

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleCreate = (e) => {
        e?.preventDefault()

        const formData = new FormData()
        formData.append('image', image)

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        fetch(BASE_URL + 'blogs/image', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                createPost(data.image_url)
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setImage(null)
                document.getElementById('fileInput').value = null
            })
    }

    const createPost = ( imageUrl ) => {
        const json_string = JSON.stringify({
            'title': title,
            'content': text,
            'creator_name': creator,
            'image_url': imageUrl
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: json_string
        }

        fetch(BASE_URL + 'blogs', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then(data => {
                window.location.reload()
                window.scrollTo(0, 0)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="newblog_content">
            <div className="newblog_image">
                <input type="file" id="fileInput" onChange={handleImageUpload} />
            </div>
            <div className="newblog_creator">
                <input className="newblog_creator" type="text" id="creator_input"
                placeholder="Creator" onChange={(event) => setCreator(event.target.value)}
                value={creator} />
            </div>
            <div className="newblog_title">
                <input className="newblog_title" type="text" id="title_input"
                placeholder="Title" onChange={(event) => setTitle(event.target.value)}
                value={title} />
            </div>
            <div className="newblog_text">
                <textarea className="newblog_text" rows="10" id="text_input"
                placeholder="Content" onChange={(event) => setText(event.target.value)}
                value={text} />
            </div>
            <div>
                <button className="create_button" onClick={handleCreate}>Create</button>
            </div>
        </div>
    )

}

export default NewBlog
