import './new.css';
import portrait from '/portrait.jpg';
import Carousel from './components/carousel';
import screenshot1 from '/social_media.png';
import screenshot2 from '/newsletter.png';
import screenshot3 from '/what_makes_you_live.png';
import screenshot4 from '/map_quiz.png';
import screenshot5 from '/shop.png';

const slides = [
  {
    title: 'Full-Stack Social Media Platform',
    subtitle: '123',
    image: screenshot1,
  },
  { title: 'Blog / Newsletter', subtitle: '123', image: screenshot2 },
  { title: 'WHAT MAKES YOU LIVE?', subtitle: '123', image: screenshot3 },
  { title: 'Map Quiz', subtitle: '123', image: screenshot4 },
  { title: 'Online Store', subtitle: '123', image: screenshot5 },
];

export default function New() {
  return (
    <div className="new_container">
      <div className="new_left">
        <div className="new new_left_intro">
          <h1>Hi, I'm Asset</h1>
          <p>
            <span className="new_top">
              I create end-to-end apps: fast and with structured thinking.
            </span>
          </p>
          <p>
            <span className="new_top">
              Node.JS fullstack developer, fully self-taught, self-motivated,
              learning and practice-oriented
            </span>
          </p>
          <p>
            <span className="new_top">
              Former Senior Associate at a Top 5 Global Law Firm
            </span>
          </p>
        </div>
        <div className="new new_left_main">
          <h2>Competence is Node.js Backend Development</h2>
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
              followed TDD practices with Jest, achieving maintainability across
              full-stack Node.js applications.
            </li>
            <li>
              <span className="new_key">Design principles:</span> Committed to
              SOLID principles, Object-Oriented Programming (OOP), and Agile
              methodologies, ensuring codebases are modular, extendable and
              readable.
            </li>
          </ul>
        </div>
        <div className="new new_left_additional_competence">
          <h2>Additional competence in Frontend Development & Data Science</h2>
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
              Represented Compass Group PLC on acquisitions and labor law
              matters.
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
        <div className="new new_left_but">
          <h2>BUT</h2>
          <p>
            Law taught me to navigate complexity. But I craved building things
            from zero — software lets me create and launch ideas globally. I
            self-taught full-stack development and data engineering, applied my
            legal precision to debugging and architecture, and built a growing
            suite of production-grade apps. Law, business, code, architecture —
            they all demand the same thing: a mind that brings order to
            complexity. Pair that with an instinct to create, and you get what
            drives me every day.
          </p>
        </div>
        <div className="new new_left_tech_stack">
          <h2>Tech Stack & Skills</h2>
          <p>
            Tech: Node.js, Express, PostgreSQL (Prisma), React
            (Styled-Components, Vite), Python (Pandas, matplotlib), JWT, Jest,
            CI/CD, Git, Railway, Netlify
          </p>
          <p>Practices: REST API design, auth flows, TDD, SOLID, OOP, Agile</p>
          <p>Bonus: Unity, Blender | Data engineering & viz | IELTS 8.5</p>
          <p>Connect: nakupovasset@protonmail.com | assetn.dev</p>
          <p>
            Based in Tbilisi, Georgia | Open to relocation, remote & hybrid
            roles globally
          </p>
        </div>
        <div className="new_left_carousel">
          <Carousel slides={slides} />
        </div>
      </div>
      <div className="new_right">
        <div className="new new_right_pic">
          <img src={portrait} />
        </div>
        <div className="new new_right_links">Links</div>
        <div className="new new_right_email">Email me</div>
        <div className="new new_right_principles">
          <h4>
            Your principles in IT and learning it -- how your skills and
            analytical thinking helped transition into IT:
          </h4>
        </div>
        <div className="new new_right_additional_accomplishments">
          Additional accomplishments
        </div>
      </div>
    </div>
  );
}

// [V] feed chatgpt with data from 10 nodejs postings
// [v] rewrite for nodejs
// [v] css
// [v] bold or highlight key words
// [_] add highlights to tech stack and but
// [_] add links, email me, principles, additional accomplishments
// [_] left part stretch to the right where the right ends
// [_] carousel buttons
// [_] carousel 3 projects side by side
// [_] cute button to start the dragon game
// [_] main project link in "main competence"
// [_] responsive
// [_] same for cv
// [_] same for linkedin
