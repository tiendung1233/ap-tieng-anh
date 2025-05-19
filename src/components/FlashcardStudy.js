import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';

const FlashcardStudy = ({ words }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [knownWords, setKnownWords] = useState([]);
  const [unknownWords, setUnknownWords] = useState([]);

  useEffect(() => {
    // Shuffle words when component mounts
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, [words]);

  const handleKnown = () => {
    setKnownWords([...knownWords, shuffledWords[currentIndex]]);
    moveToNext();
  };

  const handleUnknown = () => {
    setUnknownWords([...unknownWords, shuffledWords[currentIndex]]);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setKnownWords([]);
    setUnknownWords([]);
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  };

  if (shuffledWords.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flashcard-study">
      <h2>Học từ vựng bằng Flashcard</h2>
      <div className="progress-info">
        <p>Từ {currentIndex + 1}/{shuffledWords.length}</p>
        <p>Đã thuộc: {knownWords.length}</p>
        <p>Cần ôn lại: {unknownWords.length}</p>
      </div>
      <Flashcard
        word={shuffledWords[currentIndex]}
        onKnown={handleKnown}
        onUnknown={handleUnknown}
      />
      <div className="study-actions">
        <button onClick={restart} className="restart-btn">
          Học lại
        </button>
      </div>
    </div>
  );
};

export default FlashcardStudy; 