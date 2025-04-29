import Project from './Project.jsx';
export default function Menu({ onCreateProject, projects, onSetActiveDetail }) {
  return (
    <menu className="bg-stone-950 py-12 px-8 h-full min-w-64 flex flex-col rounded-tr-3xl w-1/4">
      <h1 className="uppercase text-stone-300 text-2xl  mb-4 font-bold">
        your projects
      </h1>
      <button
        onClick={onCreateProject.bind(null, 'new')}
        className="self-start mb-4 px-4 py-2 bg-stone-700 text-stone-400 hover:text-stone-200 hover:bg-stone-500 rounded-lg"
      >
        + Add Project
      </button>
      <ol className="text-stone-300 grow flex flex-col">
        {projects.map((project, projectIndex) => {
          return (
            <Project
              onCreateProject={onCreateProject}
              key={projectIndex}
              onSetActiveDetail={onSetActiveDetail}
              projects={projects}
            >
              {project.title}
            </Project>
          );
        })}
      </ol>
    </menu>
  );
}
