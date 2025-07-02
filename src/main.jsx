import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);

// [v] project templates
// [v] layout
// [v] projects
// [v] drawing blocks buttons
// [v] drawing on image drags the image
// [v] interactivity - some WHOA moving thing
// [v] idea - on a transparent BG div that's fixed to the top of the screen make an autorunning platformer game that signifies my journey!
// [v] rig the buttons
// [v] favicon
// [v] make the platformer
// [v] favicon to be the player character in the game!
// [v] start game button, no auto start
// [v] score text grey and centered
// [v] slightly faster obstacles, cloud size variation, smaller player model
// [v] responsive - make sure that it works on mobile
// [v] bug: invisible clouds
// [v] score not updating for obstacle 1
// [v] not annoying fail screen, restart button
// [v] bug: if you scroll down, touch controls no longer work
// [v] bug: drop score to 0 on restart
// [v] tool tips
// [v] bug: bird doesn't move at all on mobile
// [v] tagline
// [v] timeline graphic
// [v] tech stack section with icons
// [v] top 10 -> top 5
// [v] timeline: in transition, write: 'after a successful 7+ year career in law, did this and that in order to create'
// [v] start timeline at the end
// [v] move unity to the next row
// [v] add to the tagline, above the hint: "passionate to create and learn" blah blah to hook in
// [v] have the clouds spawn by default before game starts, but not kill the bird for visual interest
// [v] fix mobile pointers in phaser
// [v] backend for the game!
// [v] high score frontend
// [v] same bug again - start game scrolled up then scroll down bug
// [v] change the obstacle sprite to lightning bolts
// [v] change the obstacle color based on stage
// [v] send metrics
// [v] add screenshots of the projects
// [v] tons of scrolling errors
// [v] push personal website
// [v] "add your score" should follow a line break
// [v] add two buttons, up and down, on the left, over the dragon that fade in when "game start" is clicked
// [v] fix github readme for PW frontend

// improve portfolio website:
// [v] track how many times each project is clicked - migrate railway db
// [v] track how many times each project is clicked - set up backend routes
// [v] track how many times each project is clicked - hook up frontend routes
// [v] test in npm run dev and publish
// [v] add the shop project to portfolio
// [v] custom domain
// [v] add a blog feature
// [v] comments don't automatically update
// [v] show dates of posts and comments
// [v] animate expand posts
// [v] figure out how to write a new post without exposing it to the frontend
// [v] line breaks in blog posts
// [v] animation bug: when expanding a post, preview and full are overlapping for a second
// [_] navigation to and back from the blog section
// [_] your own ErrorBoundary or errorElement prop on your route

// projects:
// [_] add a "loading" for the tagging game
// [_] browser tab title for what makes you live
// [_] finish game studio website
