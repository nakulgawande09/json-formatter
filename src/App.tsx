import React, { useState } from 'react';
import { Brackets, FileJson, FileCode, GitCompare, Sun, Moon, Code2 } from 'lucide-react';
import JSONXMLFormatter from './components/JSONXMLFormatter';
import JSONXMLParser from './components/JSONXMLParser';
import JSONXMLDiff from './components/JSONXMLDiff';
import InteractiveConsole from './components/InteractiveConsole';
import { useTheme } from './context/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('formatter');
  const { isDarkMode, toggleTheme } = useTheme();

  const tabs = [
    { id: 'formatter', label: 'Formatter', icon: Brackets, color: 'pink' },
    { id: 'parser', label: 'Parser', icon: FileJson, color: 'blue' },
    { id: 'diff', label: 'Diff Tool', icon: GitCompare, color: 'purple' },
    { id: 'console', label: 'Console', icon: FileCode, color: 'green' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-dark-base' : 'bg-pastel-base'
    }`}>
      <header className="bg-pastel-surface0/50 dark:bg-dark-surface0/50 backdrop-blur-sm border-b border-pastel-overlay0/10 dark:border-dark-overlay0/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="text-pastel-blue dark:text-dark-blue" size={28} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pastel-blue to-pastel-lavender dark:from-dark-blue dark:to-dark-lavender bg-clip-text text-transparent">
              JSON/XML Tool
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-pastel-surface1/50 dark:hover:bg-dark-surface1/50 transition-colors"
          >
            {isDarkMode ? 
              <Sun size={24} className="text-dark-yellow" /> : 
              <Moon size={24} className="text-pastel-lavender" />
            }
          </button>
        </div>
      </header>
      
      <nav className="bg-pastel-mantle/50 dark:bg-dark-mantle/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex">
            {tabs.map((tab) => (
              <li key={tab.id} className="flex-1">
                <button
                  className={`w-full flex items-center justify-center px-4 py-3 transition-all ${
                    activeTab === tab.id
                      ? 'bg-pastel-surface0/50 text-pastel-mauve dark:bg-dark-surface0/50 dark:text-dark-mauve'
                      : 'text-pastel-text dark:text-dark-text hover:bg-pastel-surface0/30 dark:hover:bg-dark-surface0/30'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2" size={18} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        <div className="bg-pastel-mantle/50 dark:bg-dark-mantle/50 backdrop-blur-sm rounded-xl shadow-lg p-6">
          {activeTab === 'formatter' && <JSONXMLFormatter />}
          {activeTab === 'parser' && <JSONXMLParser />}
          {activeTab === 'diff' && <JSONXMLDiff />}
          {activeTab === 'console' && <InteractiveConsole />}
        </div>
      </main>

      <footer className="bg-pastel-surface0/50 dark:bg-dark-surface0/50 backdrop-blur-sm border-t border-pastel-overlay0/10 dark:border-dark-overlay0/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-pastel-text dark:text-dark-text">
          &copy; 2024 JSON/XML Tool. Made with 
          <span className="text-pastel-pink dark:text-dark-pink mx-1">♥</span> 
          for developers.
        </div>
      </footer>
    </div>
  );
}

export default App;