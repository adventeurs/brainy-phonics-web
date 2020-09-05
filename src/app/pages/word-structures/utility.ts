export function getAudioPath(cat: string, word: string): string {
  return `assets/audio/word-structures/${cat}/${word}`;
}

export function getImagePath(cat: string, word: string[] | string): string {
  let pathName = typeof word === "string" ? word : `${word[0]}-${word[1]}`;
  return `assets/img/word-structures/${cat}/${pathName}.png`;
}
