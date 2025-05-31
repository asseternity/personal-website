import screenshot from '/social_media.png';

export default function ProjectCard1() {
  return (
    <div className="card_container">
      <h2>Full-Stack Social Media Platform</h2>
      <div className="card_inner">
        <div
          className="card_screenshot"
          style={{ backgroundImage: `url(${screenshot})` }}
        ></div>
        <div className="card_para">
          <span className="green_highlight">Overview:</span> Full-stack app
          featuring JWT authentication, messaging, and content management
        </div>
        <div className="card_para">
          <span className="green_highlight">Key Features:</span> User profiles,
          direct/group chats, posts with likes/comments, and notifications
        </div>
        <div className="card_para">
          <span className="green_highlight">Tech Stack:</span> React,
          Styled-Components, Vite | Node.js, Express, PostgreSQL, Prisma,
          Passport, JWT
        </div>
      </div>
      <a
        href="https://asseternity.github.io/messenger-frontend/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Live Demo</button>
      </a>
    </div>
  );
}
