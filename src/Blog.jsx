import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './components/post.jsx';
import './blog.css';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // function to fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      const res = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/blog/all',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setBlogPosts(data.blogPosts);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    }
  };

  // function to write a comment
  const writeComment = async (
    postId,
    commentAuthor,
    commentEmail,
    commentContent
  ) => {
    try {
      if (!commentAuthor || !commentEmail || !commentContent) {
        console.error(
          'Author, email, and content are required to create a comment.'
        );
        return;
      }
      const res = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/blog/newcomment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: postId,
            author: commentAuthor,
            email: commentEmail,
            content: commentContent,
          }),
        }
      );
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === data.comment.blogPostId) {
            return {
              ...post,
              comments: [data.comment, ...post.comments],
            };
          }
          return post;
        })
      );
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  return (
    <div className="blog_container">
      <h1>Blog</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="blog_posts">
          {blogPosts.map((post) => (
            <Post
              key={`post_component_${post.id}`}
              post={post}
              writeCommentCallback={writeComment}
            />
          ))}
        </div>
      )}
    </div>
  );
}
