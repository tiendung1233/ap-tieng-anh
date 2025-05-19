import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VocabularyList = ({ topic, words }) => {
  const navigate = useNavigate();
  const [isShuffled, setIsShuffled] = useState(false);
  const [displayWords, setDisplayWords] = useState(words);

  const startPractice = () => {
    navigate(`/practice/${encodeURIComponent(topic)}`);
  };

  const startRandomPractice = () => {
    navigate(`/practice/${encodeURIComponent(topic)}?mode=random`);
  };

  const startFlashcardStudy = () => {
    navigate(`/flashcards/${encodeURIComponent(topic)}`);
  };

  const toggleShuffle = () => {
    if (!isShuffled) {
      // Shuffle the words
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setDisplayWords(shuffled);
    } else {
      // Reset to original order
      setDisplayWords(words);
    }
    setIsShuffled(!isShuffled);
  };

  return (
    <div className="vocabulary-list">
      <h2>Danh sách từ vựng: {topic}</h2>
      <div className="action-buttons">
        <button className="practice-button" onClick={startPractice}>
          Bắt đầu luyện tập
        </button>
        <button className="random-practice-button" onClick={startRandomPractice}>
          Luyện tập ngẫu nhiên
        </button>
        <button
          className={`shuffle-button ${isShuffled ? 'active' : ''}`}
          onClick={toggleShuffle}
        >
          {isShuffled ? 'Hiển thị theo thứ tự' : 'Xáo trộn từ vựng'}
        </button>
      </div>
      <div className="words-container">
        {displayWords.map((word, index) => (
          <div key={index} className="word-card">
            <h3>{word.en}</h3>
            <p className="meaning">{word.vi}</p>
            <p className="ipa">{word.ipa}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyList; 