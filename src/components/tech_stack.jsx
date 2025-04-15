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
      <div className="tech_stack_grid">
        <TechStackCard image={html} text={'HTML'} />
        <TechStackCard image={css} text={'CSS'} />
        <TechStackCard image={js} text={'JavaScript'} />
        <TechStackCard image={jest} text={'Jest'} />
        <TechStackCard image={react} text={'React'} />
      </div>
      <h4>Backend:</h4>
      <div className="tech_stack_grid">
        <TechStackCard image={node} text={'Node.JS'} />
        <TechStackCard image={express} text={'Express.JS'} />
        <TechStackCard image={python} text={'Python'} />
        <TechStackCard image={csharp} text={'C#'} />
        <TechStackCard image={restapi} text={'Rest API'} />
        <TechStackCard image={unity} text={'Unity'} />
      </div>
      <h4>Databases:</h4>
      <div className="tech_stack_grid">
        <TechStackCard image={sql} text={'SQL'} />
        <TechStackCard image={postgresql} text={'PostgreSQL'} />
        <TechStackCard image={prismaORM} text={'Prisma ORM'} />
      </div>
    </div>
  );
}
