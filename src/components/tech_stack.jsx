import html from '/tech stack icons/html5-01-svgrepo-com.svg';
import css from '/tech stack icons/css3-01-svgrepo-com.svg';
import js from '/tech stack icons/javascript-16-svgrepo-com.svg';
import jest from '/tech stack icons/testing-flask-svgrepo-com.svg';
import react from '/tech stack icons/react-16-svgrepo-com.svg';
import node from '/tech stack icons/node-js-svgrepo-com.svg';
import express from '/tech stack icons/express-svgrepo-com.svg';
import python from '/tech stack icons/python-svgrepo-com.svg';
import csharp from '/tech stack icons/csharp-svgrepo-com.svg';
import restapi from '/tech stack icons/api-svgrepo-com.svg';
import unity from '/tech stack icons/unity-svgrepo-com.svg';
import sql from '/tech stack icons/database-svgrepo-com.svg';
import postgresql from '/tech stack icons/postgresql-svgrepo-com.svg';
import prismaORM from '/tech stack icons/db-file-format-symbol-svgrepo-com.svg';
import TechStackCard from './tech_stack_card';

export default function TechStack() {
  return (
    <div>
      <h1>Tech Stack</h1>
      <h4>Frontend:</h4>
      <ul>
        <TechStackCard image={html} text={'HTML'} />
        <TechStackCard image={css} text={'CSS'} />
        <TechStackCard image={js} text={'JavaScript'} />
        <TechStackCard image={jest} text={'Jest'} />
        <TechStackCard image={react} text={'React'} />
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
