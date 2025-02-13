import { useState } from 'react';
import portrait from '/portrait.jpg';
import logo_gh from '/github-svgrepo-com.svg';
import logo_li from '/linkedin-svgrepo-com.svg';
import Project1 from './components/project1';
import Project2 from './components/project2';
import Project3 from './components/project3';
import Project4 from './components/project4';

export default function App() {
  const [flameDivs, setFlameDivs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    // Optionally, record the starting position
    addFlame(event);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      addFlame(event);
    }
  };

  const addFlame = (e) => {
    const div = e.target;
    // get the bounding box of the map
    const rect = div.getBoundingClientRect();
    // calculate coords
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFlame = (
      <div
        key={Date.now()}
        className="flame"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          height: '2px',
          width: '2px',
          backgroundColor: 'red',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    );

    setFlameDivs((prevFlames) => [...prevFlames, newFlame]);
  };
  return (
    <div
      className="root"
      onMouseDownCapture={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div
        className="parent_flames"
        style={{
          position: 'fixed', // Keeps the div fixed on the screen
          top: 0,
          left: 0,
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          zIndex: 9999, // Keeps it on top
          background: 'transparent', // Invisible background
          pointerEvents: 'auto', // Makes it clickable
        }}
      >
        {flameDivs}
      </div>
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
          <button>
            <img src={logo_gh} />
          </button>
          <button>
            <img src={logo_li} />
          </button>
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
        <button>
          <img src={logo_gh} />
        </button>
        <button>
          <img src={logo_li} />
        </button>
      </div>
    </div>
  );
}
