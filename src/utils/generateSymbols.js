export function generateSymbols(symbolCount) {
  let symbols;
  switch (symbolCount) {
    case 16:
      symbols = [
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-04.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-05.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-07.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-08.jpeg'
      ];
      break;
    case 24:
      symbols = [
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-04.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-05.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-07.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-08.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
        // 'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
        // 'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
      ];
      break;
    case 36:
      symbols = [
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-04.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-05.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-07.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-08.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-04.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-05.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-07.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-08.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
        'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
      ];
      break;
    default:
      throw new Error('Invalid symbol count.');
  }

  if (symbols.length < 2) {
    throw new Error('Insufficient symbols available to generate cards.');
  }

  const allSymbols = [...symbols, ...symbols]; // Duplicate symbols
  const shuffledSymbols = allSymbols.sort(() => Math.random() - 0.5); 
  const cards = shuffledSymbols.slice(0, symbolCount).map((symbol, index) => ({ id: index, symbol, flipped: false }));
  return cards;
}
