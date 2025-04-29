import { useRef } from 'react';
import { isEqual } from 'lodash';
export default function Tasks({ onSetProjects, activeProject }) {
  const taskInput = useRef();

  function handleAddTask(e) {
    e.preventDefault();
    const inputValue = taskInput.current.value;
    if (inputValue.length) {
      onSetProjects((prevProjects) => {
        const projects = [
          ...prevProjects.map((project) => {
            return { ...project };
          }),
        ];

        const currentProjectIndex = projects.findIndex((project) => {
          return isEqual(project, activeProject);
        });

        projects[currentProjectIndex].tasks.push(inputValue);
        return projects;
      });
    }
    taskInput.current.value = '';
  }

  function handleClearTask(taskIndex) {
    onSetProjects((prevProjects) => {
      const projects = [
        ...prevProjects.map((project) => {
          return { ...project };
        }),
      ];

      const currentProjectIndex = projects.findIndex((project) => {
        return isEqual(project, activeProject);
      });

      projects[currentProjectIndex].tasks.splice(taskIndex, 1);
      return projects;
    });
    // onSetTasks((prevTasks) => {
    //   const tasks = [...prevTasks];
    //   tasks.splice(taskIndex, 1);
    //   return tasks;
    // });
  }

  return (
    <section className="mt-4 flex flex-col gap-8 ">
      <h2 className="text-4xl font-bold text-stone-700">Tasks</h2>
      <form onSubmit={handleAddTask} id="new-task" className="flex gap-8">
        <input
          ref={taskInput}
          className="w-1/2 bg-stone-300 py-2 px-1 rounded-md"
          type="text"
        />
        <button className="text-md text-stone-700">Add Task</button>
      </form>
      <div className="flex flex-col gap-4 max-h-64 overflow-y-scroll">
        {activeProject.tasks.length === 0 ? (
          <p>This project does not have any tasks yet.</p>
        ) : (
          activeProject.tasks.map((task, taskIndex) => {
            return (
              <div
                key={taskIndex}
                className="flex justify-between bg-stone-200 px-4 py-6 rounded-lg"
              >
                <p>
                  <span>{taskIndex + 1 + '.'}</span> {task}
                </p>
                <button onClick={handleClearTask.bind(null, taskIndex)}>
                  Clear
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
