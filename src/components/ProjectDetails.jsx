import { isEqual } from 'lodash';
import Tasks from './Tasks.jsx';
import moment from 'moment-jalaali';
export default function ProjectDetails({
  project,
  onSetProjects,
  setActiveTab,
  usePersianDate,
  setUsePersianDate,
}) {
  const monthFormatter = Intl.DateTimeFormat('en-US', { month: 'short' });
  const persianDate = moment(
    `${project.due.year}/${project.due.month}/${project.due.day}`,
    'YYYY/MM/DD'
  ).format('jYYYY/jMM/jDD');
  let displayedDate = '';
  if (project.due.day) {
    displayedDate = usePersianDate ? (
      persianDate
    ) : (
      <>
        <span>{monthFormatter.format(project.due.month)}</span>{' '}
        <span>{project.due.day}</span>, <span>{project.due.year}</span>
      </>
    );
  }
  function handleDelete() {
    onSetProjects((prevProjects) => {
      const projects = [
        ...prevProjects.map((project) => {
          return { ...project };
        }),
      ];
      const projectIndex = projects.findIndex((p) => {
        return isEqual(p, project);
      });
      projects.splice(projectIndex, 1);
      return projects;
    });

    setActiveTab('start');
  }

  function toggleDateFormat() {
    setUsePersianDate((prevFormat) => !prevFormat);
  }

  return (
    <div className="flex px-12 pt-12">
      <div className="flex flex-col grow ">
        <section className="pb-4 border-b-2 border-stone-500">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-4xl font-bold text-stone-700">
              {project.title}
            </h2>
            <button onClick={handleDelete} className="text-xl text-stone-700">
              Delete
            </button>
          </div>
          {project.due.day ? (
            <button
              onClick={toggleDateFormat}
              className="text-stone-400 font-medium mb-4"
            >
              {displayedDate}
            </button>
          ) : (
            ''
          )}
          <textarea
            readOnly
            className="bg-stone-50 py-2 px-1 w-full h-fit focus:outline-none max-h-32"
            value={project.description}
          ></textarea>
        </section>

        <Tasks onSetProjects={onSetProjects} activeProject={project} />
      </div>

      <div className="w-2/6"></div>
    </div>
  );
}
