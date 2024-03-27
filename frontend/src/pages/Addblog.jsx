import React, { useState } from 'react';

function Addblog() {
  // State variables to store form data
  const [author, setAuthor] = useState('');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');

  // Function to handle form submission
  const collectData = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch('http://localhost:3000/addBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ author, snippet, content }),
      });
      const response = await result.json();
      // Assuming the response contains the saved blog data, you can handle it here
      console.log('Blog saved:', response);
      // Optionally, you can store the response in localStorage
      localStorage.setItem('blog', JSON.stringify(response));
      if(response.ok){
        setAuthor({author : ''})
        setSnippet({snippet : ''})
        setContent({content : ''})
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-r from-green-950 to to-green-700 text-white flex justify-center items-center'>
      <div className='flex flex-col '>
        <form onSubmit={collectData} className='flex flex-col space-y-4'>
          <label htmlFor='author'>Author:</label>
          <input type='text' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} className='text-black' />
          <label htmlFor='snippet'>Snippet:</label>
          <input type='text' id='snippet' value={snippet} onChange={(e) => setSnippet(e.target.value)} className='text-black' />
          <label htmlFor='content'>Content:</label>
          <textarea type='text' id='content' value={content} onChange={(e) => setContent(e.target.value)} className='text-black h-28 max-w-96' />
          <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-950 dark:hover:bg-green-700 dark:focus:ring-green-800'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Addblog;