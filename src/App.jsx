import portrait from '/portrait.jpg';
import logo_gh from '/github-svgrepo-com.svg';
import logo_li from '/linkedin-svgrepo-com.svg';
import logo_cv from '/cv-file-interface-symbol-svgrepo-com.svg';
import Project1 from './components/project1';
import Project2 from './components/project2';
import Project3 from './components/project3';
import Project4 from './components/project4';
import Project5 from './components/project5';
import PhaserGame from './components/phaser';
import Timeline from './components/timeline';
import TechStack from './components/tech_stack';
import { Time } from 'phaser';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const LIincrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/li',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const GHincrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/gh',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const CVincrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/cv',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const LoungeIncrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/lounge',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const VivaIncrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/viva',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const TextRPGIncrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/textRPG',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const MapQuizIncrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/mapQuiz',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  const ShopIncrement = async () => {
    const res = await fetch(
      'https://personal-website-backend-production-c5a6.up.railway.app/api/metrics/shop',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
  };

  return (
    <div className="root">
      <PhaserGame />
      <div className="tagline">
        <h1 className="tagline_header">Asset Nakupov</h1>
        <h3 className="tagline_title coding_text">Full-stack developer</h3>
        <h3 className="tagline_title legal_text">
          Former Senior Associate at a Top 5 Global Law Firm
        </h3>
        <p className="tagline_hook">
          I moved from law to development with a simple goal: to create, to keep
          learning, and to work with people who care about what they build. If
          any of this resonates, I’d love to hear from you.
        </p>
        <a href="#top" className="tagline_hint">
          Contact me
        </a>
      </div>
      <div className="top" id="top">
        <div className="top_left">
          <h1>Hi, I'm Asset</h1>
          <p>
            I’m a self-taught full-stack developer with expertise in front-end
            (React, JavaScript, Jest, HTML/CSS), back-end (Node.js, Express.js,
            Python, C#), and database technologies (SQL, PostgreSQL, Prisma
            ORM). IELTS 8.5.
          </p>
          <p>
            After 7+ years as a Senior Legal Associate at a top 5 global law
            firm, I transitioned into tech, bringing my analytical mindset,
            problem-solving ability, and project management experience to
            full-stack development.
          </p>
          <p style={{ textAlign: 'left' }}>
            Contact me at:{' '}
            <span className="green_highlight">nakupovasset@protonmail.com</span>
          </p>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
            }}
          >
            <a
              href="https://github.com/asseternity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button onClick={GHincrement}>
                <img src={logo_gh} />
              </button>
            </a>
            <a
              href="http://linkedin.com/in/asset-nakupov-b705bab7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button onClick={LIincrement}>
                <img src={logo_li} />
              </button>
            </a>
            <a
              href="/personal-website/[CV 2025] - Asset Nakupov - ENG.pdf"
              download
            >
              <button onClick={CVincrement}>
                <img src={logo_cv} />
              </button>
            </a>
          </div>
        </div>
        <div className="top_right">
          <img src={portrait} />
        </div>
      </div>
      <TechStack />
      <div className="projects">
        <h3>Projects</h3>
        <div className="projects_cards">
          <div className="projects_card">
            <Project1 onClickCallback={LoungeIncrement} />
          </div>
          <div className="projects_card">
            <Project2 onClickCallback={VivaIncrement} />
          </div>
          <div className="projects_card">
            <Project3 onClickCallback={TextRPGIncrement} />
          </div>
          <div className="projects_card">
            <Project4 onClickCallback={MapQuizIncrement} />
          </div>
          <div className="projects_card">
            <Project5 onClickCallback={ShopIncrement} />
          </div>
        </div>
      </div>
      <Timeline />
      <div className="bottom">
        <h3>Let’s Connect</h3>
        <p>nakupovasset@protonmail.com</p>
        <p>Tbilisi, Georgia</p>
        <a
          href="https://github.com/asseternity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={GHincrement}>
            <img src={logo_gh} />
          </button>
        </a>
        <a
          href="http://linkedin.com/in/asset-nakupov-b705bab7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={LIincrement}>
            <img src={logo_li} />
          </button>
        </a>
        <a
          href="/personal-website/[CV 2025] - Asset Nakupov - ENG.pdf"
          download
        >
          <button onClick={CVincrement}>
            <img src={logo_cv} />
          </button>
        </a>
      </div>
    </div>
  );
}
