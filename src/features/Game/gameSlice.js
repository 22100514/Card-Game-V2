import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
  flippedCards: [],
  solvedCards: [],
  matchedPairs: 0,
  isGameWon: false,
  timerStarted: false,
  leftTime: 0,
  moveCount: 0,
  selectedLevel: 'easy',
  isGameStarted: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    initializeGame(state, action) {
      state.cards = action.payload;
    },
    flipCard(state, action) {
      const cardId = action.payload;
      const cardIndex = state.cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1 && !state.cards[cardIndex].flipped && state.flippedCards.length < 2) {
        state.cards[cardIndex].flipped = true;
        state.flippedCards.push(cardId);
      }
    },
    checkForMatch(state) {
      if (state.flippedCards.length === 2) {
        const [card1Id, card2Id] = state.flippedCards;
        const card1Index = state.cards.findIndex(card => card.id === card1Id);
        const card2Index = state.cards.findIndex(card => card.id === card2Id);

        if (card1Index !== -1 && card2Index !== -1) {
          const card1 = state.cards[card1Index];
          const card2 = state.cards[card2Index];

          if (card1.symbol === card2.symbol) {
            state.matchedPairs++;
            card1.matched = true;
            card2.matched = true;

            if (state.matchedPairs === state.cards.length / 2) {
              state.isGameWon = true;
            }
          } else {
            state.cards.forEach(card => {
              if (card.flipped && !card.matched) {
                card.flipped = false;
              }
            });
          }
        }
        state.flippedCards = [];
      }
    },
    resetGame(state) {
      state.cards.forEach(card => {
        card.flipped = false;
        card.matched = false; 
      });
      state.flippedCards = [];
      state.matchedPairs = 0;
      state.isGameWon = false;
    },
    startTimer(state) {
      state.timerStarted = true;
    },
    stopTimer(state) {
      state.timerStarted = false;
    },
    resetTimer(state) {
      state.timerStarted = false;
      state.leftTime = 0;
    },
    incrementTime(state) {
      state.leftTime += 1;
    },
    incrementMove(state) {
      if (state.flippedCards.length === 2) {
        state.moveCount += 1;
      }
    },
    resetMove(state) {
      state.moveCount = 0;
    },
    setSelectedLevel(state, action) {
      const { payload } = action;
      state.selectedLevel = payload;
      switch (payload) {
        case 'easy':
          state.symbolCount = 16;
          break;
        case 'medium':
          state.symbolCount = 24;
          break;
        case 'hard':
          state.symbolCount = 36;
          break;
        default:
          state.symbolCount = 16;
          break;
      }
    },
    startGame(state) {
      state.isGameStarted = true;
    },
  
    endGame(state) {
      state.isGameStarted = false;
    },
  },
});

export const { initializeGame, flipCard, checkForMatch, resetGame, startTimer, stopTimer, resetTimer, incrementTime, incrementMove, resetMove, setSelectedLevel, startGame, endGame } = gameSlice.actions;

export default gameSlice.reducer;
