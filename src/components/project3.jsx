import screenshot from '/what_makes_you_live.png';

export default function ProjectCard3({ onClickCallback }) {
  return (
    <div className="card_container">
      <h2>WHAT MAKES YOU LIVE?</h2>
      <div className="card_inner">
        <div
          className="card_screenshot"
          style={{ backgroundImage: `url(${screenshot})` }}
        ></div>
        <div className="card_para">
          <span className="green_highlight">Overview:</span> Browser-based text
          RPG set in a Victorian-era fantasy realm, offering immersive narrative
          choices and interactive gameplay
        </div>
        <div className="card_para">
          <span className="green_highlight">Key Features:</span> Branching
          storylines with choices and consequences, dialogue-driven
          interactions, reputation system, turn-based combat, and exploration
          mechanics
        </div>
        <div className="card_para">
          <span className="green_highlight">Tech Stack:</span> HTML, CSS,
          JavaScript
        </div>
      </div>
      <a
        href="https://asseternity.github.io/browser-text-rpg-wp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button onClick={onClickCallback}>Live Demo</button>
      </a>
    </div>
  );
}
