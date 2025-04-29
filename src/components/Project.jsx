export default function Project({
  children,
  onCreateProject,
  onSetActiveDetail,
  projects,
}) {
  function handleActiveTab() {
    onCreateProject('details');
    onSetActiveDetail(() => {
      return projects.find((project) => {
        return project.title === children;
      });
    });
  }
  return (
    <li className=" px-4 py-2 hover:bg-stone-800 text-stone-500 font-medium rounded-md">
      <button className="w-full text-left" onClick={handleActiveTab}>
        {children}
      </button>
    </li>
  );
}
