import './new.css';
import { useState, useRef } from 'react';
import PhaserGame from './components/phaser';
import PreviewProjects from './components/preview_projects';
import TechStack from './components/tech_stack';
import portrait from '/portrait-compressed.jpg';
import screenshot1 from '/social_media.png';
import screenshot2 from '/newsletter.png';
import screenshot3 from '/what_makes_you_live.png';
import screenshot4 from '/map_quiz.png';
import screenshot5 from '/shop.png';
import icon from '/dragon-svgrepo-com.svg';
import logo_gh from '/github-svgrepo-com.svg';
import logo_li from '/linkedin-svgrepo-com.svg';
import logo_cv from '/cv-file-interface-symbol-svgrepo-com.svg';

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

const slides = [
  {
    title: 'Full-Stack Social Media Platform',
    subtitle:
      'Full-stack app featuring JWT authentication, messaging, and content management',
    image: screenshot1,
    url: 'https://asseternity.github.io/messenger-frontend/',
    incrementCallback: LoungeIncrement,
  },
  {
    title: 'Blog / Newsletter',
    subtitle:
      'Full-stack blog and newsletter platform featuring separate frontends for public content display and admin content management',
    image: screenshot2,
    url: 'https://asseternity.github.io/c5-personal-react/',
    incrementCallback: VivaIncrement,
  },
  {
    title: 'WHAT MAKES YOU LIVE?',
    subtitle:
      'Browser-based text RPG with immersive narrative choices and turn-based combat',
    image: screenshot3,
    url: 'https://asseternity.github.io/browser-text-rpg-wp/',
    incrementCallback: TextRPGIncrement,
  },
  {
    title: 'Map Quiz',
    subtitle:
      'Full-stack interactive map quiz game where players explore the fantasy continent of Leordis to locate hidden spots based on given tasks',
    image: screenshot4,
    url: 'https://asseternity.github.io/tagging-game/',
    incrementCallback: MapQuizIncrement,
  },
  {
    title: 'Online Store',
    subtitle:
      'Users can browse the home page, products, add them to the cart which calculates the number of products and the total price.',
    image: screenshot5,
    url: 'https://asseternity-shop.netlify.app/',
    incrementCallback: ShopIncrement,
  },
];

export default function New() {
  const [showGame, setShowGame] = useState(false);
  const [showCVFormats, setShowCVFormats] = useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);
  const [shownProjectSetIndex, setShownProjectSetIndex] = useState(1);
  const projectRef = useRef(null);

  const scrollToProjects = () => {
    if (projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setShownProjectSetIndex(1); // Ensure it shows the first slide (Social Media App)
  };

  const openProjectsPopup = () => {
    if (!showCVFormats) {
      setShowProjectsPopup(true);
    }
  };
  const closeProjectsPopup = () => setShowProjectsPopup(false);
  const openCVFormats = () => {
    if (!showProjectsPopup) {
      setShowCVFormats(true);
    }
  };
  const closeCVFormats = () => setShowCVFormats(false);

  return (
    <div className="new_container">
      {showProjectsPopup && (
        <div className="cv_formats_popup">
          <div className="projects_popup_inner">
            <h2>Portfolio Projects</h2>
            <div className="projects_popup_close_div">
              <button onClick={closeProjectsPopup}>X</button>
            </div>
            <PreviewProjects
              projects={slides}
              shownProjectSetIndex={shownProjectSetIndex}
              setShownProjectSetIndex={setShownProjectSetIndex}
              isPopup={true}
            />
          </div>
        </div>
      )}
      {showCVFormats && (
        <div className="cv_formats_popup">
          <div className="cv_formats_close_div">
            <button onClick={closeCVFormats}>X</button>
          </div>
          <h2>Download CV in:</h2>
          <div className="cv_formats_popup_buttons">
            <a href="/[CV] - Asset Nakupov - ENG.pdf" download>
              <button onClick={CVincrement}>PDF</button>
            </a>
            <a href="/[CV] - Asset Nakupov - ENG.docx" download>
              <button onClick={CVincrement}>WORD</button>
            </a>
          </div>
        </div>
      )}
      <div className="new_left">
        <div className="top_left_container">
          <div className="new new_left_game">
            <div
              className="start-game-button"
              onClick={() => setShowGame(true)}
            >
              <img src={icon} alt="Start Game" />
            </div>
            <div className="new_left_game_text">
              <p className="hint_game">
                Play a game while you’re here! I store the top 5 scores. Click
                the green icon!
              </p>
            </div>
            {showGame && <PhaserGame onHideGame={() => setShowGame(false)} />}
          </div>
          <div className="new new_left_intro">
            <h1>Hi, I'm Asset</h1>
            <p>
              <span className="new_top">
                I create end-to-end apps fast and with structured thinking
              </span>
            </p>
            <p>
              <span className="new_top">
                Fullstack JavaScript developer, fully self-taught,
                self-motivated, learning and practice-oriented
              </span>
            </p>
            <p>
              <span className="new_top">
                Former Senior Associate at a Top 5 Global Law Firm
              </span>
            </p>
            <div className="scroll_to_projects_wrapper">
              <button
                className="scroll_to_projects_btn"
                onClick={openProjectsPopup}
              >
                View Portfolio Projects
              </button>
            </div>
          </div>
        </div>
        <div className="new new_left_main">
          <h2>Main: Node.js Full-Stack Development</h2>
          <ul>
            <li>
              <span className="new_key">Scalable REST APIs:</span> Developed
              robust RESTful APIs with Node.js and Express, enabling seamless
              content delivery for real-time-like front-end updates in social
              and blog platforms.
            </li>
            <li>
              <span className="new_key">Database Optimization:</span>{' '}
              Architected and optimized PostgreSQL schemas with Prisma ORM,
              managing complex data structures (posts, comments, user
              interactions).
            </li>
            <li>
              <span className="new_key">Authentication & Security:</span> Built
              secure authentication workflows leveraging JWT, Passport.js, and
              bcrypt.
            </li>
            <li>
              <span className="new_key">CI/CD and Testing (TDD):</span>{' '}
              Engineered automated deployment pipelines through Netlify and
              Railway, followed TDD practices with Jest, achieving
              maintainability across full-stack Node.js applications.
            </li>
            <li>
              <span className="new_key">Design principles:</span> Committed to
              SOLID principles, Object-Oriented Programming (OOP), and Agile
              methodologies, ensuring codebases are modular, extendable and
              readable.
            </li>
          </ul>
          <p>
            I built several robust full-stack applications, including a
            full-stack social media platform featuring JWT authentication, user
            profiles, direct/group chats, posts with likes/comments, and
            notifications. Check it out{' '}
            <span
              className="new_key main_project_link"
              style={{ cursor: 'pointer' }}
              onClick={scrollToProjects}
            >
              <a
                href="https://asseternity.github.io/messenger-frontend/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={LoungeIncrement}
              >
                here
              </a>
            </span>
            .
          </p>
        </div>
        <div className="new new_left_additional_competence">
          <h2>
            Additional competence in Frontend Development & Data Engineering
          </h2>
          <ul>
            <li>
              <span className="new_key">Odin Project Graduate:</span> Completed
              the intensive Full-Stack JavaScript Path, mastering end-to-end app
              development, structured problem-solving, and modern
              frontend/backend best practices.
            </li>
            <li>
              <span className="new_key">Advanced React UX/UI:</span> Built
              dynamic feed, chat, and profile systems in React
              (Styled-Components, Vite), with intuitive multi-mode inputs
              (text/image), editable posts/comments, pagination, and live UI
              state syncing.
            </li>
            <li>
              <span className="new_key">Python and Data Engineering:</span>{' '}
              Designed data pipelines and insights using Python, Pandas,
              pandasql, and matplotlib—cleaning multi-table datasets, executing
              custom SQL analysis, and building visuals showing distributions
              and breakdowns.
            </li>
          </ul>
        </div>
        <div className="new new_left_professional_track_record">
          <h2>Proven Professional Track Record in Law</h2>
          <ul>
            <li>
              <span className="new_key">$100M+ Deal Experience:</span> Managed
              high-stakes M&A, joint ventures, and multi-property real estate
              deals across Kazakhstan’s energy, transport, and finance sectors.
              Represented international clients such as Compass Group PLC on
              acquisitions and labor law matters.
            </li>
            <li>
              <span className="new_key">Complex Dispute Resolution:</span> Led a
              non-commercial organization to victory in 7 court cases, defeating
              attempts to seize a land plot and securing government construction
              permits.
            </li>
            <li>
              <span className="new_key">Global Strategic Transactions:</span>{' '}
              Issued legal opinions on aircraft leases for Air Astana with
              Western lessors. Helped establish a subsidiary of a major
              international bank in Kazakhstan.
            </li>
            <li>
              <span className="new_key">
                Clients Consistently Recognize. Legal 500 EMEA:
              </span>{' '}
              "Asset provided excellent product and legal service and practical
              advice; his vast knowledge of current legislation and considerable
              experience deserve special mention."
            </li>
          </ul>
        </div>
        <div className="new new_left_tech_stack">
          <h2>Tech Stack & Skills</h2>
          <TechStack />
          <p>
            Bonus: <span className="new_top">Unity</span>,{' '}
            <span className="new_top">Blender</span> |{' '}
            <span className="new_top">Data engineering & viz</span> |{' '}
            <span className="new_top">IELTS 8.5</span>
          </p>
          <p className="connect_details">
            Connect: <span className="new_key">asset_n@proton.me</span> |{' '}
            <span className="new_key">assetn.dev</span>
          </p>
          <p>
            Based in Tbilisi, Georgia | Open to relocation, remote & hybrid
            roles globally
          </p>
        </div>
      </div>
      <div className="new_right">
        <div className="new new_right_pic">
          <img src={portrait} />
        </div>
        <div className="new new_right_links">
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
          <a>
            <button onClick={openCVFormats}>
              <img src={logo_cv} />
            </button>
          </a>
        </div>
        <div className="new new_right_email">
          <p>Email me:</p>
          <span className="new_key">asset_n@proton.me</span>
        </div>
        <div className="new new_right_principles">
          <p>
            Law taught me to navigate{' '}
            <span className="new_top">complexity</span>. But I craved{' '}
            <span className="new_top">building things from zero</span>. I
            self-taught full-stack development and data engineering, applied my
            legal precision to debugging and architecture, and built a growing
            suite of production-grade apps because software lets me create and
            launch ideas globally. Law, business, code, architecture — they all
            demand the same thing:{' '}
            <span className="new_top">structured thinking</span>.
          </p>
        </div>
        <div className="new new_right_additional_accomplishments">
          <h2>Additional accomplishments</h2>
          <ul>
            <li className="new_key">
              Game developer with Articy, Unity, Blender
            </li>
            <li className="new_key">
              Creator, self-motivated, organized thinker
            </li>
            <li className="new_key">
              Won a historic land dispute litigation campaign
            </li>
            <li className="new_key">Top of the class GPA graduate</li>
            <li className="new_key">100% university scholarship winner</li>
          </ul>
        </div>
        <div ref={projectRef} className="new_right_carousel">
          <h1>Portfolio Projects</h1>
          <p className="hint_text">
            Scroll through projects with the buttons below or click on a project
            for a live demo!
          </p>
          <PreviewProjects
            projects={slides}
            shownProjectSetIndex={shownProjectSetIndex}
            setShownProjectSetIndex={setShownProjectSetIndex}
            isPopup={false}
          />
        </div>
      </div>
    </div>
  );
}

// [v] feed chatgpt with data from 10 nodejs postings
// [v] rewrite for nodejs
// [v] css
// [v] bold or highlight key words
// [v] add highlights to tech stack and but
// [v] git
// [v] CI/CD
// [v] Railway/Netlify
// [v] JWT
// [v] auth flows
// [v] TDD
// [v] Pandas
// [v] add links, email me, principles, additional accomplishments
// [v] css again
// [v] carousel buttons
// [v] link buttons
// [v] left part stretch to the right where the right ends
// [v] carousel 3 projects side by side
// [v] cute button to start the dragon game
// [v] main project link in "main competence"
// [v] link main project link to a demo
// [v] hook up the increments to project clicks
// [v] glow for preview project
// [v] ensure links work
// [v] responsive
// [v] a bit of a background for the game
// [v] bottom email
// [v] popup for multiple formats cv
// [v] same for cv
// [v] hook up new cvs
// [v] same for linkedin
// [v] compress photo for faster loading
// [v] make game easier, dragon smaller and move faster
// [v] change icon to green
// [v] new_left_game smaller, no BG
// [v] opacity of the projects screenshots for text readability
// [x] photo to EQUAL height of the hi, I'm Asset
// [v] button to scroll to projects in hi, I'm Asset
// [v] change the "view portfolio projects" button to open a popup window
// [v] fix projects popup mobile height
