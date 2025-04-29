import imgNoProjects from '../assets/no-projects.png';
export default function StartPage({ onCreateProject }) {
  return (
    <div className=" grow flex items-center justify-center h-full">
      <div className="w-96 flex flex-col items-center gap-8">
        <img src={imgNoProjects} alt="a projects list" className="w-28" />
        <p className="capitalize text-2xl font-bold text-stone-800">
          No Project Selected
        </p>
        <p className=" text-stone-500">
          Select a project or get started with a new one
        </p>
        <button
          onClick={onCreateProject.bind(null, 'new')}
          className="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg"
        >
          Create new project
        </button>
      </div>
    </div>
  );
}
