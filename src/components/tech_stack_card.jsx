export default function TechStackCard({ image, text }) {
  return (
    <div className="tech_stack_card">
      <div className="tech_stack_card_left">
        <img src={image} />
      </div>
      <div className="tech_stack_card_right">{text}</div>
    </div>
  );
}
