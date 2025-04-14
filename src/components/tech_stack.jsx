import html from '/tech stack icons/html5-01-svgrepo-com.svg';
import TechStackCard from './tech_stack_card';

export default function TechStack() {
  return (
    <div>
      <h1>Tech Stack</h1>
      <h4>Frontend:</h4>
      <ul>
        <TechStackCard image={html} text={'HTML'} />
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Jest</li>
        <li>React</li>
      </ul>
      <h4>Backend:</h4>
      <ul>
        <li>Node.JS</li>
        <li>Express.JS</li>
        <li>Python</li>
        <li>C#</li>
        <li>Rest API</li>
        <li>Unity</li>
      </ul>
      <h4>Databases:</h4>
      <ul>
        <li>SQL</li>
        <li>PostgreSQL</li>
        <li>Prisma ORM</li>
      </ul>
    </div>
  );
}
