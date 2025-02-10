export default function ProjectCard() {
  return (
    <div>
      <h2>Social Media Platform</h2>
      <p>
        A full-stack web application with authentication, messaging, and content
        management.
      </p>
      <h4>Features:</h4>
      <ul>
        <li>JWT-based authentication and user management</li>
        <li>Profile pages with bios and images</li>
        <li>Direct messaging and group chats</li>
        <li>Posts with likes, comments, and notifications</li>
      </ul>
      <h4>Tech Stack:</h4>
      <ul>
        <li>Frontend: React, Styled-Components, Vite</li>
        <li>
          Backend: Node.js, Express, PostgreSQL, Prisma ORM, Passport, JWT
        </li>
      </ul>
      <a
        href="https://asseternity.github.io/messenger-frontend/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Live Demo
      </a>
    </div>
  );
}
