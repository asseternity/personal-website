import { useState } from 'react';
import portrait from '/portrait.jpg';
import logo_gh from '/github-svgrepo-com.svg';
import logo_li from '/linkedin-svgrepo-com.svg';
import Project1 from './components/project1';
import Project2 from './components/project2';
import Project3 from './components/project3';
import Project4 from './components/project4';
import PhaserGame from './components/phaser';

export default function App() {
  return (
    <div className="root">
      <PhaserGame />
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
            After 7+ years as a Senior Legal Associate at a top 10 global law
            firm, I transitioned into tech, bringing my analytical mindset,
            problem-solving ability, and project management experience to
            full-stack development.
          </p>
          <a
            href="https://github.com/asseternity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              <img src={logo_gh} />
            </button>
          </a>
          <a
            href="http://linkedin.com/in/asset-nakupov-b705bab7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              <img src={logo_li} />
            </button>
          </a>
        </div>
        <div className="top_right">
          <img src={portrait} />
        </div>
      </div>
      <div className="projects">
        <h3>Projects</h3>
        <div className="projects_cards">
          <div className="projects_card">
            <Project1 />
          </div>
          <div className="projects_card">
            <Project2 />
          </div>
          <div className="projects_card">
            <Project3 />
          </div>
          <div className="projects_card">
            <Project4 />
          </div>
        </div>
      </div>
      <div className="bottom">
        <h3>Let’s Connect</h3>
        <p>nakupovasset@gmail.com</p>
        <p>Tbilisi, Georgia</p>
        <a
          href="https://github.com/asseternity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            <img src={logo_gh} />
          </button>
        </a>
        <a
          href="http://linkedin.com/in/asset-nakupov-b705bab7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            <img src={logo_li} />
          </button>
        </a>
      </div>
    </div>
  );
}
