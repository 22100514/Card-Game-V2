const symbols = [
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-00.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-01.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-02.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-03.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-04.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-05.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-07.jpeg',
  'https://img.flawlessfiles.com/_r/100x100/100/avatar/one_piece/user-08.jpeg'
];

export function generateSymbols(count) {
  const allSymbols = [...symbols, ...symbols]; //დუბლიკაცია
  const shuffledSymbols = allSymbols.sort(() => Math.random() - 0.5); 
  const cards = shuffledSymbols.slice(0, count).map((symbol, index) => ({ id: index, symbol, flipped: false }));
  return cards;
}
