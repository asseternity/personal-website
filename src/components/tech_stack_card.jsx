export default function TechStackCard({ image, text }) {
  return (
    <div className="tech_stack_card">
      <img src={image} />
      {text}
    </div>
  );
}
