import { useEffect, useState } from 'react';

const style = {
  fontSize: '18px',
  color: '#ffa940',
  fontWeight: 900,
  padding: '0.2em 0.5em',
  borderRadius: '0.5em',
  textShadow: `
    -1px -1px 0 black,
     1px -1px 0 black,
    -1px  1px 0 black,
     1px  1px 0 black,
    0    -1px 0 black,
    -1px  0   0 black,
     1px  0   0 black,
    0     1px 0 black
  `,
};

const style2 = {
  fontSize: '12px',
  color: '#ffa940',
  fontWeight: 900,
  padding: '0.2em 0.5em',
  borderRadius: '0.5em',
  textShadow: `
    -1px -1px 0 black,
     1px -1px 0 black,
    -1px  1px 0 black,
     1px  1px 0 black,
    0    -1px 0 black,
    -1px  0   0 black,
     1px  0   0 black,
    0     1px 0 black
  `,
};

export default function PreviewProjects({
  projects,
  shownProjectSetIndex,
  setShownProjectSetIndex,
}) {
  const [projectsShown, setProjectsShown] = useState(
    projects.slice(shownProjectSetIndex * 2, shownProjectSetIndex * 2 + 2)
  );
  const [leftProjects, setLeftProjects] = useState([]);
  const [rightProjects, setRightProjects] = useState([]);

  useEffect(() => {
    const totalProjectSets = Math.ceil(projects.length / 2);
    const lastProjectSetIndex = totalProjectSets - 1;
    // is there a project set to the left of current?
    // if not, set it to the last one
    let leftProjectSetIndex =
      shownProjectSetIndex === 0
        ? lastProjectSetIndex
        : shownProjectSetIndex - 1;
    const leftStartIndex = leftProjectSetIndex * 2;
    const leftProjectsArray = projects.slice(
      leftStartIndex,
      leftStartIndex + 2
    );
    setLeftProjects(leftProjectsArray);
    // is there a project set to the right of current?
    // if not, set it to the first one
    let rightProjectSetIndex =
      shownProjectSetIndex === lastProjectSetIndex
        ? 0
        : shownProjectSetIndex + 1;
    const rightStartIndex = rightProjectSetIndex * 2;
    const rightProjectsArray = projects.slice(
      rightStartIndex,
      rightStartIndex + 2
    );
    setRightProjects(rightProjectsArray);
    const startIndex = shownProjectSetIndex * 2;
    setProjectsShown(projects.slice(startIndex, startIndex + 2));
  }, [shownProjectSetIndex, projects]);

  const handleArrowButton = (direction) => {
    const totalProjectSets = Math.ceil(projects.length / 2);
    const lastProjectSetIndex = totalProjectSets - 1;
    let newSetIndex = shownProjectSetIndex;
    if (direction === 'left') {
      newSetIndex =
        shownProjectSetIndex === 0
          ? lastProjectSetIndex
          : shownProjectSetIndex - 1;
    } else {
      newSetIndex =
        shownProjectSetIndex === lastProjectSetIndex
          ? 0
          : shownProjectSetIndex + 1;
    }

    setShownProjectSetIndex(newSetIndex);

    const startIndex = newSetIndex * 2;
    const newProjectsArray = projects.slice(startIndex, startIndex + 2);
    setProjectsShown(newProjectsArray);
  };

  return (
    <div className="preview_projects_content">
      <div className="preview_projects_track">
        <div className="preview_projects_cards">
          {leftProjects.map((projectObject, index) => (
            <div
              key={index}
              className="preview_project"
              style={{ backgroundImage: `url(${projectObject.image})` }}
            >
              <span style={style}>{projectObject.title}</span>
              <span style={style2}>{projectObject.subtitle}</span>
            </div>
          ))}
        </div>
        <div className="preview_projects_cards">
          {projectsShown.map((projectObject, index) => (
            <div
              key={index}
              className="preview_project"
              style={{ backgroundImage: `url(${projectObject.image})` }}
            >
              <span style={style}>{projectObject.title}</span>
              <span style={style2}>{projectObject.subtitle}</span>
            </div>
          ))}
        </div>
        <div className="preview_projects_cards">
          {rightProjects.map((projectObject, index) => (
            <div
              key={index}
              className="preview_project"
              style={{ backgroundImage: `url(${projectObject.image})` }}
            >
              <span style={style}>{projectObject.title}</span>
              <span style={style2}>{projectObject.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="preview_projects_buttons">
        <button onClick={() => handleArrowButton('left')}>{'<<'}</button>
        <button onClick={() => handleArrowButton('right')}>{'>>'}</button>
      </div>
    </div>
  );
}
