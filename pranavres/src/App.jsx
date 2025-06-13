import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Writing from './Writing';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactMarkdown from 'react-markdown';
import Home from './Home';
import Research from './Research';
import Projects from './Projects';
import Resume from './Resume';
import Roadmap from './Roadmap';

function App() {
  // Format date to display in a readable format
  const formatDisplayDate = (date) => {
    // Original verbose format
    // return new Intl.DateTimeFormat('en-US', {
    //   weekday: 'long',
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric'
    // }).format(date);
    
    // New concise numerical format: YYYY/MM/DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Format date for comparison (YYYY-MM-DD)
  const formatDateKey = (date) => {
    // Fix timezone issue by using local date components instead of toISOString()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Parse a YYYY-MM-DD string as a local date
  function parseDateString(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // Sample blog entries with dates as keys (Markdown supported)
  const blogEntries = {
    [formatDateKey(new Date())]: {
      content: `Today I worked on improving my React skills by building a date-based journal application.

Here is a sample image in the entry:

![Sample Cat](https://pbs.twimg.com/media/GrNZj1kWQAAFTr3?format=png&name=900x900)

And some more text after the image.`
    },
    "2024-05-01": {
      content: `Started learning about React Router and how to implement it in my applications.

Here is a cool image:

![A cat](https://d2zp5xs5cp8zlg.cloudfront.net/image-86754-800.jpg)

And then I wrote some more.`
    },
    "2023-05-21": {
      content: `update:

	(12:09am) found new resources to check out for AI/ML.

fastAI
cs231 & cs224 from stanford

	current priority should be finishing up this fastAI course (pt1 & 2). it seems to have every concept you need to progress further in AI/ML.

oh man

	it's quickly becoming a habit

	this marks, what, four days of doing nearly nothing? i must be going insane`

    },
    "2024-04-25": {
      content: "Worked on styling my application with CSS. Focused on creating a clean sidebar layout."
    },
    "2024-04-20": {
      content: "Began planning my personal blog project. I want to create something that's both functional and aesthetically pleasing."
    },
    "2024-04-15": {
      content: "Learned about state management in React and how to effectively use the useState and useEffect hooks."
    },
    "2024-04-10": {
      content: "Started my journey into web development. Excited about the possibilities!"
    }
  };

  // Find the most recent entry date
  const findMostRecentEntry = () => {
    const today = formatDateKey(new Date());
    if (blogEntries[today]) return today;
    const dates = Object.keys(blogEntries).sort().reverse();
    return dates.length > 0 ? dates[0] : today;
  };

  // State for selected date (store as string key)
  const [selectedDate, setSelectedDate] = useState(findMostRecentEntry());
  
  // Handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(formatDateKey(date));
  };

  // Get entries for display
  const getEntriesToDisplay = () => {
    return Object.entries(blogEntries)
      .map(([dateStr, entry]) => ({
        date: dateStr,
        content: entry.content
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date string (newest first)
  };

  // Filter entries based on selected date
  const getSelectedEntry = () => {
    return blogEntries[selectedDate]
      ? { date: selectedDate, content: blogEntries[selectedDate].content }
      : null;
  };

  // Highlight dates with entries in the calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = formatDateKey(date);
      return blogEntries[dateKey] ? 'has-entry' : null;
    }
  };

  function HomePage() {
    const selectedEntry = getSelectedEntry();
    const entries = getEntriesToDisplay();

    return (
      <div className="blog-content">
        {selectedEntry ? (
          <div className="selected-entry">
            <h2>{formatDisplayDate(parseDateString(selectedEntry.date))}</h2>
            <ReactMarkdown>{selectedEntry.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="no-entry">
            <h2>{formatDisplayDate(parseDateString(selectedDate))}</h2>
            <p className="empty-message">No entry for this date.</p>
          </div>
        )}
        
        <div className="entry-divider">
          <hr />
          <span>previous entries</span>
          <hr />
        </div>
        
        <div className="blog-posts">
          {entries.map((entry, index) => {
            const isActive = selectedDate === entry.date;
            // Remove Markdown for preview, just show plain text
            const plainText = entry.content.replace(/!\[.*?\]\(.*?\)/g, '') // remove images
                                           .replace(/[#>*_`~\-]/g, '')      // remove markdown symbols
                                           .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // remove links, keep text
            const previewText =
              plainText.length > 100
                ? plainText.slice(0, 100) + "..."
                : plainText;

            return (
              <div
                key={entry.date}
                className={`blog-post ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedDate(entry.date)}
              >
                <h3>{formatDisplayDate(parseDateString(entry.date))}</h3>
                {isActive ? (
                  <ReactMarkdown>{entry.content}</ReactMarkdown>
                ) : (
                  <div className="blog-post-preview">{previewText}</div>
                )}
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <nav className="sidebar">
            <div className="sidebar-header">
              <h1>
                <NavLink to="/home" style={{ color: "inherit", textDecoration: "none" }}>
                  pranav patnaik
                </NavLink>
              </h1>
            </div>
            <div className="sidebar-links">
              <ul>
                <li><NavLink to="/research" end>research</NavLink></li>
                <li><NavLink to="/projects">projects</NavLink></li>
                <li><NavLink to="/essays">essays</NavLink></li>
                <li><NavLink to="/resume">resume</NavLink></li>
              </ul>
            </div>
            
            <div className="sidebar-calendar">
              <h3>calendar</h3>
              <Calendar 
                onChange={handleDateChange} 
                value={parseDateString(selectedDate)}
                className="react-calendar"
                view="month"
                tileClassName={tileClassName}
                maxDate={new Date(2026, 11, 31)}
                onViewChange={({ view }) => {
                  if (view !== 'month') {
                    return false;
                  }
                }}
                onClickMonth={() => false}
                onDrillUp={() => false}
              />
            </div>
            
            <div className="social-links">
              <a href="https://instagram.com/pranavpatnaik_" target="_blank" rel="noopener noreferrer">instagram</a>
              <a href="https://twitter.com/pranavpatnaik_" target="_blank" rel="noopener noreferrer">twitter</a>
              <a href="https://github.com/pranavpatnaik1" target="_blank" rel="noopener noreferrer">github</a>
            </div>
          </nav>
          <main className="content">
            <Routes>
              <Route path="/research" element={<Research />} />
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/essays/*" element={<Writing />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/ml-roadmap" element={<Roadmap />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;