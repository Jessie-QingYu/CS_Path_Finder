import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import RoadmapsPage from './pages/RoadmapsPage';
import ResourcesPage from './pages/ResourcesPage';
import ProjectsPage from './pages/ProjectsPage';
import CustomPathPage from './pages/CustomPathPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './contexts/AuthContext';
import { PathProvider } from './contexts/PathContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PathProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/roadmaps" element={<RoadmapsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/custom-path" element={<CustomPathPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </PathProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;