import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import TopicList from './components/TopicList';
import VocabularyList from './components/VocabularyList';
import Practice from './components/Practice';
import FlashcardStudy from './components/FlashcardStudy';
import vocabularyData from './data/vocabulary.json';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Ứng dụng học từ vựng tiếng Anh</h1>
          <p>Design by Dung Nguyen Tien</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TopicList topics={vocabularyData} />} />
            <Route
              path="/topic/:topicName"
              element={<VocabularyListWrapper data={vocabularyData} />}
            />
            <Route
              path="/practice/:topicName"
              element={<PracticeWrapper data={vocabularyData} />}
            />
            <Route
              path="/flashcards/:topicName"
              element={<FlashcardStudyWrapper data={vocabularyData} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Wrapper components to handle route parameters
function VocabularyListWrapper({ data }) {
  const { topicName } = useParams();
  const decodedTopic = decodeURIComponent(topicName);
  const words = data[decodedTopic] || [];

  return <VocabularyList topic={decodedTopic} words={words} />;
}

function PracticeWrapper({ data }) {
  const { topicName } = useParams();
  const decodedTopic = decodeURIComponent(topicName);
  const words = data[decodedTopic] || [];

  return <Practice topic={decodedTopic} words={words} />;
}

function FlashcardStudyWrapper({ data }) {
  const { topicName } = useParams();
  const decodedTopic = decodeURIComponent(topicName);
  const words = data[decodedTopic] || [];

  return <FlashcardStudy words={words} />;
}

export default App;
