import screenshot from '/shop.png';

export default function ProjectCard5({ onClickCallback }) {
  return (
    <div className="card_container">
      <h2>Online Store</h2>
      <div className="card_inner">
        <div
          className="card_screenshot"
          style={{ backgroundImage: `url(${screenshot})` }}
        ></div>
        <div className="card_para">
          <span className="green_highlight">Overview:</span>Mock of a shopping
          website where users can browse the home page, products, add them to
          the cart which calculates the number of products and the total price.
        </div>
        <div className="card_para">
          <span className="green_highlight">Key Features:</span> Uses React,
          styled-components, Vite, and deployed through Netlify. It fetches data
          from an API and adds the data to the shopping cart with the press of a
          button.
        </div>
        <div className="card_para">
          <span className="green_highlight">Tech Stack:</span> React, HTML, CSS,
          JavaScript, styled-components, fake store api fetch
        </div>
      </div>
      <a
        href="https://asseternity-shop.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button onClick={onClickCallback}>Live Demo</button>
      </a>
    </div>
  );
}
