import { useRef } from 'react';

export default function NewProject({
  onAddProject,
  onCreateProject,
  projects,
  onSetActiveDetail,
}) {
  const title = useRef();
  const description = useRef();
  const due = useRef();

  function handleAddProject(e) {
    e.preventDefault();
    onCreateProject('details');

    onAddProject((prevProjects) => {
      const projects = [
        ...prevProjects.map((project) => {
          return { ...project };
        }),
      ];
      const dueArray = due.current.value.split('-');
      const newProject = {
        title: title.current.value,
        description: description.current.value,
        due: {
          year: dueArray[0],
          month: dueArray[1],
          day: dueArray[2],
        },
        tasks: [],
      };

      onSetActiveDetail(() => newProject);

      return [...projects, newProject];
    });
  }

  function handleCancel(e) {
    // e.preventDefault();
    onCreateProject('start');
  }

  if (title.current) {
    title.current.value = description.current.value = due.current.value = '';
  }

  return (
    <section className="flex px-12 pt-12">
      <form onSubmit={handleAddProject} className="flex flex-col gap-6 grow">
        <div className="h-8 flex justify-end items-center">
          <button type="reset" onClick={handleCancel} className="py-2 px-8">
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-8 bg-stone-950 hover:bg-stone-800 text-stone-200 rounded-lg"
          >
            Save
          </button>
        </div>
        <div>
          <label
            className="font-semibold text-stone-700 mb-2 uppercase"
            htmlFor="title"
          >
            title
          </label>
          <input
            ref={title}
            className="w-full bg-stone-300 py-2 px-1 rounded-md"
            type="text"
            id="title"
            required
          />
        </div>
        <div>
          <label
            className=" font-semibold text-stone-700 mb-2 uppercase "
            htmlFor="description"
          >
            description (optional)
          </label>
          <textarea
            ref={description}
            className="w-full bg-stone-300 py-2 px-1 rounded-md h-24"
            name=""
            id="description"
          ></textarea>
        </div>
        <div>
          <label
            className="font-semibold text-stone-700 mb-2 uppercase"
            htmlFor="due-data"
          >
            due date (optional)
          </label>
          <input
            ref={due}
            className="w-full bg-stone-300 py-2 px-1 rounded-md"
            type="date"
            id="due-data"
            placeholder="dd.mm.yyyy"
          />
        </div>
      </form>
      <div className="w-1/5 h-full"></div>
    </section>
  );
}
