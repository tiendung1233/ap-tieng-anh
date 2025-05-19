import React, { useState } from 'react';

const Flashcard = ({ word }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isKnown, setIsKnown] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    setIsKnown(true);
  };

  const handleUnknown = () => {
    setIsKnown(false);
  };

  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''} ${isKnown ? 'known' : ''}`}>
      <div className="flashcard-inner" onClick={handleFlip}>
        <div className="flashcard-front">
          <h3>{word.en}</h3>
          <p className="ipa">{word.ipa}</p>
        </div>
        <div className="flashcard-back">
          <h3>{word.vi}</h3>
          <div className="flashcard-actions">
            <button onClick={handleKnown} className="known-btn">
              Đã thuộc
            </button>
            <button onClick={handleUnknown} className="unknown-btn">
              Cần ôn lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard; 