import React, { useState } from 'react';
import { View } from './types';
import { 
  SIDEBAR_ITEMS, 
  MOCK_STUDENTS, 
  MOCK_MODULES, 
  MOCK_ANNOUNCEMENTS, 
  MOCK_NOTIFICATIONS 
} from './constants';

// A generic placeholder for views that are not implemented yet.
const PlaceholderComponent = ({ view }: { view: View }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4 text-gray-700">{view}</h3>
    <p className="text-gray-500">
      Contenido para la vista <span className="font-semibold">{view}</span> aún no ha sido implementado.
    </p>
  </div>
);

// A simple dashboard component to make the app feel more alive.
const Dashboard = () => (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-gray-500">Estudiantes Activos</h4>
                <p className="text-3xl font-bold">{MOCK_STUDENTS.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-gray-500">Progreso Promedio</h4>
                <p className="text-3xl font-bold">
                    {Math.round(MOCK_STUDENTS.reduce((acc, s) => acc + s.progress, 0) / MOCK_STUDENTS.length)}%
                </p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-gray-500">Módulos</h4>
                <p className="text-3xl font-bold">{MOCK_MODULES.length}</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-gray-500">Anuncios Recientes</h4>
                <p className="text-3xl font-bold">{MOCK_ANNOUNCEMENTS.length}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Últimos Anuncios</h3>
            <ul>
                {MOCK_ANNOUNCEMENTS.slice(0, 3).map(ann => (
                    <li key={ann.id} className="border-b last:border-b-0 py-2">
                        <p className="font-semibold text-blue-600">{ann.title}</p>
                        <p className="text-sm text-gray-600">{ann.content.substring(0, 100)}...</p>
                        <span className="text-xs text-gray-400">{ann.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);

  const renderContent = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard />;
      // Add other specific components here as they are built
      // For now, all others will use the placeholder
      default:
        return <PlaceholderComponent view={currentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center justify-center p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-center">
            <i className="fa-solid fa-drafting-compass mr-2"></i>
            Plataforma CAD
          </h1>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul>
            {SIDEBAR_ITEMS.map(({ view, icon }) => (
              <li key={view} className="mb-1">
                <button
                  onClick={() => setCurrentView(view)}
                  className={`w-full text-left p-3 rounded-lg flex items-center transition-colors duration-200 text-sm ${
                    currentView === view
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <i className={`${icon} w-6 text-center mr-3 text-lg`}></i>
                  <span>{view}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-gray-800">{currentView}</h2>
            <div className="flex items-center space-x-4">
                <button className="relative text-gray-600 hover:text-gray-800">
                    <i className="fa-solid fa-bell text-xl"></i>
                    {MOCK_NOTIFICATIONS.length > 0 && 
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                            {MOCK_NOTIFICATIONS.length}
                        </span>
                    }
                </button>
                <div className="flex items-center space-x-2">
                    <img src="https://picsum.photos/seed/prof/100" alt="Avatar del profesor" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-semibold text-sm">Profesor Titular</p>
                        <p className="text-xs text-gray-500">Profesor</p>
                    </div>
                </div>
            </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
            {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;