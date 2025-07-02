import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../post_dates.css';

export default function Post({ post, writeCommentCallback }) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [expanded, setExpanded] = useState(false);

  const paragraphCut = () => {
    const paragraphs = post.content.split('\n');
    return paragraphs;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="blog_post">
      <div className="post_date">
        <p className="post_date_text">{formatDate(post.createdAt)}</p>
      </div>
      <h2>{post.title}</h2>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            {paragraphCut().map((paragraph, index) => (
              <p key={`paragraph_${index}`}>{paragraph}</p>
            ))}
            <div className="post_comments">
              <p className="leave_comment">Leave a comment</p>
              {post.comments.map((comment) => (
                <div key={`comment_${comment.id}`} className="comment">
                  <h3>{comment.author.toUpperCase()}</h3>
                  <p>{comment.content}</p>
                  <div className="comment_date">
                    <p className="comment_date_text">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
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
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="toggle_post_button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide post' : 'Expand post'}
      </button>
    </div>
  );
}
