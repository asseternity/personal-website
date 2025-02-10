import { useState } from 'react';
import portrait from '/portrait.jpg';
import ProjectCard from './components/template_project';

export default function App() {
  const [someState, setSomeState] = useState('');
  return (
    <div className="root">
      <div className="top">
        <div className="top_left">
          <h1>Hi, I'm Asset</h1>
          <p>
            I’m a self-taught full-stack developer with expertise in front-end
            (React, JavaScript, Jest, HTML/CSS), back-end (Node.js, Express.js,
            Python, C#), and database technologies (SQL, PostgreSQL, Prisma
            ORM). IELTS 8.5.
          </p>
          <p>
            After a successful 7+ year career as a Senior Legal Associate at a
            top 10 global law firm, I transitioned into tech, applying my
            analytical, project management, and problem-solving skills to
            full-stack development.
          </p>
          <button>Github</button>
          <button>Linkedin</button>
        </div>
        <div className="top_right">
          <img src={portrait} />
        </div>
      </div>
      <div className="projects">
        <h3>Projects</h3>
        <div className="projects_cards">
          <div className="projects_card">
            <ProjectCard />
          </div>
          <div className="projects_card">
            <ProjectCard />
          </div>
          <div className="projects_card">
            <ProjectCard />
          </div>
          <div className="projects_card">
            <ProjectCard />
          </div>
          <div className="projects_card">
            <ProjectCard />
          </div>
          <div className="projects_card">
            <ProjectCard />
          </div>
        </div>
      </div>
      <div className="bottom">
        <h3>Get in touch</h3>
        <p>email</p>
        <p>location</p>
        <button>Github</button>
        <button>Linkedin</button>
      </div>
    </div>
  );
}
