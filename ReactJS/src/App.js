import './App.css';
import React, { useEffect, useState } from 'react';
import Blog from './Blog'
import NewBlog from './NewBlog';

const BASE_URL = 'http://localhost:8000/'

function App() {

  const[blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch(BASE_URL + 'blogs')
      .then(response => {
        const response_json = response.json()
        console.log(response_json);
        if (response.ok) {
          return response_json
        }
        throw response
      })
      .then(data => {
        return data.reverse()
      })
      .then(data => {
        setBlogs(data)
      })
      .catch(error => {
        console.log(error);
        alert(error)
      })
  }, [])

  return (
    <div className="App">
      <div className="site_title">Blogs Website</div>
      <div className="site_blogs">
        {
          blogs.map(blog => (
            <Blog blog={blog}/>
          ))
        }
      </div>
      <div className='new_blog'>
        <NewBlog />
      </div>
    </div>
  );
}

export default App;
