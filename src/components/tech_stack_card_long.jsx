export default function TechStackCard({ image, text1, text2 }) {
  return (
    <div className="tech_stack_card">
      <div className="tech_stack_card_left">
        <img src={image} />
      </div>
      <div className="tech_stack_card_right_long">
        <span>{text1}</span>
        <span>{text2}</span>
      </div>
    </div>
  );
}
