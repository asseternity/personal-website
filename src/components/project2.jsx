import screenshot from '/newsletter.png';

export default function ProjectCard2() {
  return (
    <div className="card_container">
      <h2>Blog / Newsletter</h2>
      <div className="card_inner">
        <div
          className="card_screenshot"
          style={{ backgroundImage: `url(${screenshot})` }}
        ></div>
        <div className="card_para">
          <span className="green_highlight">Overview:</span> Full-stack blog and
          newsletter platform featuring separate frontends for public content
          display and admin content management
        </div>
        <div className="card_para">
          <span className="green_highlight">Key Features:</span> User
          authentication, dynamic content management, dual interface (public and
          admin), and database-driven post storage
        </div>
        <div className="card_para">
          <span className="green_highlight">Tech Stack:</span> React,
          Styled-Components, Vite | Node.js, Express, PostgreSQL, Prisma,
          Passport
        </div>
      </div>
      <a
        href="https://asseternity.github.io/c5-personal-react/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Live Demo</button>
      </a>
    </div>
  );
}
