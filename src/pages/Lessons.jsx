// src/pages/Lessons.jsx
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import LessonCard from '../components/Lessons/LessonCard';
import './Lessons.css';

const lessonsData = [
  {
    id: 1,
    title: 'Climate Change Basics',
    description: 'Learn the fundamentals of climate change and its global impact.',
    completed: true,
    duration: '10 min',
    badge: 'climate-basics'
  },
  {
    id: 2,
    title: 'Renewable Energy',
    description: 'Discover how renewable energy sources can replace fossil fuels.',
    completed: false,
    duration: '15 min',
    badge: 'renewable-energy'
  },
  {
    id: 3,
    title: 'Sustainable Agriculture',
    description: 'Explore farming methods that protect the environment.',
    completed: false,
    duration: '12 min',
    badge: 'sustainable-ag'
  }
];

const Lessons = () => {
  const [lessons] = useState(lessonsData);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (

    <div className="lessons-container">
      <h1>Sustainability Lessons</h1>
      <p className="subtitle">Learn about environmental issues and earn rewards</p>
      <div className="lessons-grid">
        {lessons.map(lesson => (
          <LessonCard 
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            completed={lesson.completed}
            duration={lesson.duration}
            badge={lesson.badge}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;