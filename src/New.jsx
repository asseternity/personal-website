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
          <p>I create stuff & and get the shit done</p>
          <p>
            Developer & data engineer, fully self-taught and practice oriented
          </p>
          <p>Former big 5 law Senior Associate</p>
        </div>
        <div className="new new_left_main">
          <p>I WANT TO TRANSITION INTO DATA:</p>
          <ul>
            <li>
              Python & Pandas: analyzing, presenting and parsing data through
              Python: 5 core skills, . Example: analysis of transitions from law
              to tech, 10k entries and what does it mean (facts and data)
            </li>
            <li>
              SQL & PostgreSQL: incorporated relational data bases, performed
              data migrations on hosted websites: 5 core skills and what it
              resulted in
            </li>
            <li>PrismaQRM</li>
          </ul>
          <p>
            Design principles you know: Agile, team organization, apps you know
            -- RELEVANT TO DATA
          </p>
          <button>Link to project</button>
        </div>
        <div className="new new_left_secondary">
          <h2>BUT I AM ALSO GOOD IN BACKEND:</h2>
          <p>
            Back-end with deep knowledge of front-end - highlight backend stuff
            with understanding of principles
          </p>
          <p>ACHIEVEMENTS AND PROJECTS</p>
          <p>Additional stuff: 1-2 lines - Odin project</p>
        </div>
        <div className="new new_left_lawyer">
          <h2>
            Hotshot lawyer stuff and soft skills: - здесь хайлайт факты и KPI
          </h2>
          <p>I did this: </p>
          <p>3 accomplishments in law</p>
          <p>
            What it taught me: soft skills -- worked with international clients,
            understand the management and team work, get the shit done, can
            grind for many hours and fully self-sufficient
          </p>
          <h3>BUT</h3>
          <p>
            I wanted to create stuff, so I transitioned to IT and self-taught
            myself: github, organized learning and etc. One key insight from
            that
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

// [_] make link to project reference the main project
// [_] show 3 projects in carousel side by side
// [_] stretch the left part to the right where the right ends
