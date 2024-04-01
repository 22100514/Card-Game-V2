import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeGame, flipCard, checkForMatch, resetGame, startTimer, stopTimer, resetTimer, incrementTime, incrementMove, resetMove, startGame, endGame, setSelectedLevel } from '../features/Game/gameSlice';
import { generateSymbols } from '../utils/generateSymbols';
import './GameBoard.css';
import GameLevelSelector from './GameLevelSelector';

function GameBoard() {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.game.cards);
  const isGameWon = useSelector(state => state.game.isGameWon);
  const timerStarted = useSelector(state => state.game.timerStarted);
  const leftTime = useSelector(state => state.game.leftTime);
  const moveCount = useSelector(state => state.game.moveCount);
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  const selectedLevel = useSelector(state => state.game.selectedLevel);

  const [showGame, setShowGame] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    dispatch(initializeGame(generateSymbols(getCardCountForLevel(selectedLevel))));
    dispatch(resetTimer());
  }, [dispatch, selectedLevel]);

  useEffect(() => {
    let timer;
    if (timerStarted && !isGameWon) {
      timer = setInterval(() => {
        dispatch(incrementTime());
        if (leftTime >= getTimeLimitForLevel(selectedLevel) && !isGameWon) {
          dispatch(stopTimer());
          clearInterval(timer);
          setShowMessage(true);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerStarted, isGameWon, leftTime, dispatch, selectedLevel]);


  const handleCardClick = (cardId) => {
    const flippedCards = cards.filter(card => card.flipped && !card.matched);
    if (!timerStarted && flippedCards.length === 0) {
      dispatch(startTimer());
    }

    const card = cards.find(card => card.id === cardId);
    if (!card.flipped && cards.filter(card => card.flipped && !card.matched).length < 2) {
      dispatch(flipCard(cardId));
      if (flippedCards.length === 1) {
        dispatch(incrementMove());
      }
    }

    if (flippedCards.length === 1) {
      setTimeout(() => {
        dispatch(checkForMatch());
      }, 1000);
    }
  };

  const handleReset = () => {
    dispatch(resetGame());
    dispatch(stopTimer());
    dispatch(resetTimer());
    setShowGame(true);
    setShowMessage(false);
    dispatch(resetMove());
    dispatch(startGame());
  };

  const handlePlayAgain = () => {
    dispatch(resetGame());
    dispatch(resetMove());
    dispatch(resetTimer());
    dispatch(startTimer());
    setShowGame(true);
    setShowMessage(false);
    dispatch(endGame());
  };

  return (
    <>
      <div>
        {showGame && (
          <div className="game-board">
            <GameLevelSelector />

            <div className="upper-part">
              <h3>Level: {getLevelText(selectedLevel)}</h3>
              <span>{formatTime(Math.max(getTimeLimitForLevel(selectedLevel) - leftTime, 0))}</span>
              <span>{moveCount} Moves</span>
              <button className="reset-button" onClick={handleReset}>↻</button>
            </div>
            <div className="cards">
              {cards.map(card => (
                <div
                  key={card.id}
                  className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''} ${selectedLevel === 'medium' ? 'card_medium' : selectedLevel === 'hard' ? 'card_hard' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className="front">🌟</div>
                  <img className="back" src={card.symbol} alt="Card Symbol" />
                </div>
              ))}
            </div>
            {isGameWon && (
              <div className="congratulations-container">
                <div className="message">Congratulations! You won in <strong>{moveCount}</strong> Moves!</div>
                <button className="reset-button2" onClick={handlePlayAgain}>Play Again</button>
              </div>
            )}
            {showMessage && (
              <div className="congratulations-container">
                <div className="message">You lost!</div>
                <button className="reset-button2" onClick={handlePlayAgain}>Try again</button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default GameBoard;

const getCardCountForLevel = (level) => {
  switch (level) {
    case 'easy':
      return 16;
    case 'medium':
      return 24;
    case 'hard':
      return 36;
    default:
      return 16;
  }
};

const getTimeLimitForLevel = (level) => {
  switch (level) {
    case 'easy':
      return 30;
    case 'medium':
      return 60;
    case 'hard':
      return 120;
    default:
      return 30;
  }
};

const getLevelText = (level) => {
  switch (level) {
    case 'easy':
      return 'Easy⭐';
    case 'medium':
      return 'Medium ⭐⭐';
    case 'hard':
      return 'Hard ⭐⭐⭐';
    default:
      return 'Unknown';
  }
};
