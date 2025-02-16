export default function ProjectCard1() {
  return (
    <div className="card_container">
      <h2>Full-Stack Social Media Platform</h2>
      <div className="card_inner">
        <div className="card_para">
          Overview: Full-stack app featuring JWT authentication, messaging, and
          content management
        </div>
        <div className="card_para">
          Key Features: User profiles, direct/group chats, posts with
          likes/comments, and notifications
        </div>
        <div className="card_para">
          Tech Stack: React, Styled-Components, Vite | Node.js, Express,
          PostgreSQL, Prisma, Passport, JWT
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
