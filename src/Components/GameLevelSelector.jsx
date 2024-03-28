import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLevel } from '../features/Game/gameSlice';
import './GameLevelSelector.css';

function GameLevelSelector() {
  const dispatch = useDispatch();
  const selectedLevel = useSelector(state => state.game.selectedLevel);

  const handleChange = (e) => {
    dispatch(setSelectedLevel(e.target.value));
  };

  return (
    <div className="level-selector-container">
      <label htmlFor="level">Select level:</label>
      <select id="level" className="level-selector" value={selectedLevel} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default GameLevelSelector;