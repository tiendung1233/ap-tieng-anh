import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Practice = ({ topic, words }) => {
  const location = useLocation();
  const isRandomMode = new URLSearchParams(location.search).get('mode') === 'random';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practiceWords, setPracticeWords] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  useEffect(() => {
    // Initialize practice words
    if (isRandomMode) {
      // Shuffle words for random practice
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setPracticeWords(shuffled);
    } else {
      setPracticeWords(words);
    }
  }, [words, isRandomMode]);

  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slower speed for better pronunciation
      window.speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    const currentWord = practiceWords[currentIndex];
    const isAnswerCorrect = userInput.toLowerCase() === currentWord.en.toLowerCase();

    if (isAnswerCorrect) {
      setFeedback('Chính xác!');
      setIsCorrect(true);
      setScore(score + 1);
      setWrongAttempts(0);
      // Speak the word when correct
      speakWord(currentWord.en);
      // Automatically move to next word after a short delay
      setTimeout(() => {
        if (currentIndex < practiceWords.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setUserInput('');
          setFeedback('');
          setIsCorrect(null);
        }
      }, 2000); // Increased delay to allow pronunciation to complete
    } else {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);

      if (newWrongAttempts >= 3) {
        setFeedback(`Bạn đã nhập sai 3 lần. Từ cần nhập là: ${currentWord.en}`);
        // Speak the word after 3 wrong attempts
        speakWord(currentWord.en);
      } else {
        setFeedback(`Bạn đã nhập sai ${newWrongAttempts} lần. Hãy thử lại!`);
      }
      setIsCorrect(false);
    }
  };

  const nextWord = () => {
    if (currentIndex < practiceWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setFeedback('');
      setIsCorrect(null);
      setWrongAttempts(0);
    }
  };

  const restart = () => {
    if (isRandomMode) {
      // Reshuffle words for random practice
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setPracticeWords(shuffled);
    }
    setCurrentIndex(0);
    setUserInput('');
    setFeedback('');
    setIsCorrect(null);
    setScore(0);
    setWrongAttempts(0);
  };

  if (practiceWords.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = practiceWords[currentIndex];
  const progress = ((currentIndex + 1) / practiceWords.length) * 100;

  return (
    <div className="practice-container">
      <h2>Luyện tập: {topic}</h2>
      <div className="progress-info">
        <p>Tiến độ: {currentIndex + 1}/{practiceWords.length}</p>
        <p>Điểm số: {score}</p>
      </div>
      <div className="practice-card">
        <h3>Nghĩa tiếng Việt:</h3>
        <p>{currentWord.vi}</p>
        <p className="ipa">Phiên âm: {currentWord.ipa}</p>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập từ tiếng Anh"
            onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          />
          <button onClick={checkAnswer}>Kiểm tra</button>
        </div>
        {feedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
        )}
        {feedback && !isCorrect && (
          <button onClick={nextWord} disabled={currentIndex === practiceWords.length - 1}>
            Từ tiếp theo
          </button>
        )}
      </div>
      <div className="practice-actions">
        <button onClick={restart} className="restart-btn">
          Học lại
        </button>
      </div>
    </div>
  );
};

export default Practice; 