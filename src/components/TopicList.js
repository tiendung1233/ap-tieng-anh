import React from 'react';
import { Link } from 'react-router-dom';

const TopicList = ({ topics }) => {
  // Calculate total words across all topics
  const totalWords = Object.values(topics).reduce((total, words) => total + words.length, 0);

  return (
    <div className="topic-list">
      <h2>Chọn chủ đề từ vựng</h2>
      <p className="total-words">Tổng số từ: {totalWords}</p>
      <div className="topics-grid">
        {Object.keys(topics).map((topic) => (
          <Link to={`/topic/${encodeURIComponent(topic)}`} key={topic} className="topic-card">
            <h3>{topic}</h3>
            <p>{topics[topic].length} từ vựng</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicList; 