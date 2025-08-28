import { useEffect, useState } from 'react';

const style = {
  color: 'var(--accent)',
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
  color: 'var(--accent)',
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
  isPopup,
}) {
  const [projectsShown, setProjectsShown] = useState(
    projects.slice(shownProjectSetIndex * 3, shownProjectSetIndex * 3 + 3)
  );
  const [leftProjects, setLeftProjects] = useState([]);
  const [rightProjects, setRightProjects] = useState([]);

  useEffect(() => {
    const totalProjectSets = Math.ceil(projects.length / 3);
    const lastProjectSetIndex = totalProjectSets - 1;

    // left context set
    const leftProjectSetIndex =
      shownProjectSetIndex === 0
        ? lastProjectSetIndex
        : shownProjectSetIndex - 1;
    const leftStartIndex = leftProjectSetIndex * 3;
    setLeftProjects(projects.slice(leftStartIndex, leftStartIndex + 3));

    // right context set
    const rightProjectSetIndex =
      shownProjectSetIndex === lastProjectSetIndex
        ? 0
        : shownProjectSetIndex + 1;
    const rightStartIndex = rightProjectSetIndex * 3;
    setRightProjects(projects.slice(rightStartIndex, rightStartIndex + 3));

    // current set
    const currentStartIndex = shownProjectSetIndex * 3;
    setProjectsShown(projects.slice(currentStartIndex, currentStartIndex + 3));
  }, [shownProjectSetIndex, projects]);

  const handleArrowButton = (direction) => {
    const totalProjectSets = Math.ceil(projects.length / 3);
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
    const startIndex = newSetIndex * 3;
    setProjectsShown(projects.slice(startIndex, startIndex + 3));
  };

  return (
    <div
      className={
        isPopup
          ? 'preview_projects_content pp_content'
          : 'preview_projects_content'
      }
    >
      <div
        className={
          isPopup
            ? 'preview_projects_buttons pp_buttons'
            : 'preview_projects_buttons'
        }
      >
        <button onClick={() => handleArrowButton('left')}>{'<<'}</button>
        <button onClick={() => handleArrowButton('right')}>{'>>'}</button>
      </div>
      <div
        className={
          isPopup ? 'preview_projects_track pp_track' : 'preview_projects_track'
        }
      >
        <div
          className={
            isPopup
              ? 'preview_projects_cards pp_cards'
              : 'preview_projects_cards'
          }
        >
          {leftProjects.map((project, index) => (
            <div
              key={index}
              className={
                isPopup ? 'preview_project pp_project' : 'preview_project'
              }
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={project.incrementCallback}
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span className="preview_heading" style={style}>
                  {project.title}
                </span>
                <span className="preview_subtitle" style={style2}>
                  {project.subtitle}
                </span>
              </a>
            </div>
          ))}
        </div>
        <div
          className={
            isPopup
              ? 'preview_projects_cards pp_cards'
              : 'preview_projects_cards'
          }
        >
          {projectsShown.map((project, index) => (
            <div
              key={index}
              className={
                isPopup ? 'preview_project pp_project' : 'preview_project'
              }
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={project.incrementCallback}
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={style}>{project.title}</span>
                <span style={style2}>{project.subtitle}</span>{' '}
              </a>
            </div>
          ))}
        </div>
        <div
          className={
            isPopup
              ? 'preview_projects_cards pp_cards'
              : 'preview_projects_cards'
          }
        >
          {rightProjects.map((project, index) => (
            <div
              key={index}
              className={
                isPopup ? 'preview_project pp_project' : 'preview_project'
              }
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={project.incrementCallback}
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <span style={style}>{project.title}</span>
                <span style={style2}>{project.subtitle}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
