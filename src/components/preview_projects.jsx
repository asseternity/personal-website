import { useEffect, useState } from 'react';

export default function PreviewProjects({ projects }) {
  const [shownProjectSetIndex, setShownProjectSetIndex] = useState(0);
  const [projectsShown, setProjectsShown] = useState([
    projects[0],
    projects[1],
  ]);
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
  }, [shownProjectSetIndex, projectsShown, projects]);

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
      <h2>Projects</h2>
      <div className="preview_projects_track">
        <div className="preview_projects_cards">
          {leftProjects.map((projectObject, index) => (
            <div
              key={index}
              className="preview_project"
              style={{ backgroundImage: `url(${projectObject.image})` }}
            >
              {projectObject.title}
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
              {projectObject.title}
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
              {projectObject.title}
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
