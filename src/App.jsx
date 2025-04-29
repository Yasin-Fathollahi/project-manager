import { useState, useEffect } from 'react';
import Menu from './components/Menu.jsx';
import StartPage from './components/StartPage.jsx';
import NewProject from './components/NewProject.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
function App() {
  const [activeTab, setActiveTab] = useState('start');
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem('projects')) || [];
  });
  const [activeDetail, setActiveDetail] = useState(null);
  const [usePersianDate, setUsePersianDate] = useState(() => {
    return JSON.parse(localStorage.getItem('usePersianDateFormat')) || false;
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem(
      'usePersianDateFormat',
      JSON.stringify(usePersianDate)
    );
  }, [projects, usePersianDate]);

  return (
    <>
      <Menu
        onCreateProject={setActiveTab}
        projects={projects}
        onSetActiveDetail={setActiveDetail}
      />
      <main className="w-full">
        {activeTab === 'start' ? (
          <StartPage onCreateProject={setActiveTab} />
        ) : undefined}
        {activeTab === 'new' ? (
          <NewProject
            onAddProject={setProjects}
            onCreateProject={setActiveTab}
            onSetActiveDetail={setActiveDetail}
            projects={projects}
          />
        ) : undefined}
        {activeTab === 'details' ? (
          <ProjectDetails
            project={activeDetail}
            onSetProjects={setProjects}
            setActiveTab={setActiveTab}
            usePersianDate={usePersianDate}
            setUsePersianDate={setUsePersianDate}
          />
        ) : undefined}
      </main>
    </>
  );
}

export default App;
