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
import solid from '/tech stack icons/solid.svg';
import agile from '/tech stack icons/agile.svg';
import oop from '/tech stack icons/oop.svg';
import auth from '/new svgs/auth-face-svgrepo-com.svg';
import cdci from '/new svgs/ci-cd-svgrepo-com.svg';
import git from '/new svgs/github-svgrepo-com.svg';
import token from '/new svgs/gift-2-svgrepo-com.svg';
import netlify from '/new svgs/netlify-svgrepo-com.svg';
import tdd from '/new svgs/test-tube-svgrepo-com.svg';
import pandas from '/new svgs/pandas-svgrepo-com.svg';
import TechStackCard from './tech_stack_card';
import TechStackCardLong from './tech_stack_card_long';

export default function TechStack() {
  return (
    <div>
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
        <TechStackCard image={token} text={'JWT'} />
        <TechStackCardLong
          image={netlify}
          text1={'Netlify'}
          text2={'Railway'}
        />
        <TechStackCard image={python} text={'Python'} />
        <TechStackCard image={pandas} text={'Pandas'} />
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
      <h4>Design Principles:</h4>
      <div className="tech_stack_grid">
        <TechStackCard image={git} text={'Git'} />
        <TechStackCard image={tdd} text={'TDD'} />
        <TechStackCard image={solid} text={'SOLID'} />
        <TechStackCard image={auth} text={'Auth Flows'} />
        <TechStackCard image={cdci} text={'CI/CD'} />
        <TechStackCard image={agile} text={'Agile'} />
        <TechStackCard image={oop} text={'OOP'} />
      </div>
    </div>
  );
}
