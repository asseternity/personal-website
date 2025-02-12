export default function ProjectCard2() {
  return (
    <div className="card_container">
      <h2>Blog / Newsletter</h2>
      <div className="card_inner">
        <div className="card_para">
          Overview: Full-stack blog and newsletter platform featuring separate
          frontends for public content display and admin content management
        </div>
        <div className="card_para">
          Key Features: User authentication, dynamic content management, dual
          interface (public and admin), and database-driven post storage
        </div>
        <div className="card_para">
          Tech Stack: React, Styled-Components, Vite | Node.js, Express,
          PostgreSQL, Prisma, Passport
        </div>
      </div>
      <button>Live Demo</button>
    </div>
  );
}
