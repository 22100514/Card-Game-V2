import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedLevel } from '../features/Game/gameSlice';
import './GameLevelSelector.css';

const GameLevelSelector = () => {
  const dispatch = useDispatch();

  const handleLevelChange = (e) => {
    dispatch(setSelectedLevel(e.target.value));
  };

  return (
    <div className="level-selector">
      <label>Select Level:</label>
      <select onChange={handleLevelChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default GameLevelSelector;
