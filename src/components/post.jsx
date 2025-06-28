import { useEffect, useRef, useState } from 'react';

export default function Post({ post, writeCommentCallback }) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  return (
    <div className="blog_post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post_comments">
        <p className="leave_comment">Leave a comment</p>
        {post.comments.map((comment) => (
          <div key={`comment_${comment.id}`} className="comment">
            <h3>{comment.author}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <div className="writing_comment">
        <form>
          <div className="writing_comment_divider">
            <input type="hidden" value={post.id} />
            <input
              className="comment_author"
              placeholder="Username"
              type="text"
              required
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
            />
            <input
              className="comment_email"
              placeholder="Email"
              type="email"
              required
              value={commentEmail}
              onChange={(e) => setCommentEmail(e.target.value)}
            />
          </div>
          <div className="writing_comment_divider">
            <input
              placeholder="Comment"
              className="comment_content"
              type="text"
              required
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
              className="comment_submit"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                writeCommentCallback(
                  post.id,
                  commentAuthor,
                  commentEmail,
                  commentContent
                );
                setCommentAuthor('');
                setCommentEmail('');
                setCommentContent('');
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
