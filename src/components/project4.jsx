import screenshot from '/map_quiz.png';

export default function ProjectCard4() {
  return (
    <div className="card_container">
      <h2>Map Quiz</h2>
      <div className="card_inner">
        <div
          className="card_screenshot"
          style={{ backgroundImage: `url(${screenshot})` }}
        ></div>
        <div className="card_para">
          <span className="green_highlight">Overview:</span> Full-stack
          interactive map quiz game where players explore the fantasy continent
          of Leordis to locate hidden spots based on given tasks
        </div>
        <div className="card_para">
          <span className="green_highlight">Key Features:</span> Engaging task
          prompts, interactive map exploration, location-based selection with
          confirmation, and high score tracking
        </div>
        <div className="card_para">
          <span className="green_highlight">Tech Stack:</span> React, HTML, CSS,
          JavaScript (Frontend) | Node.js, Express, PostgreSQL, Prisma,
          Passport, JWT, Bcrypt (Backend)
        </div>
      </div>
      <a
        href="https://asseternity.github.io/tagging-game/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Live Demo</button>
      </a>
    </div>
  );
}
