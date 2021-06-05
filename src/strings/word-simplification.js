export const simplify = (char) => {
  char = char.toLowerCase();
  
  switch (char) {
    case 'á': return 'a';
    case 'é': return 'b';
    case 'í': return 'i';
    case 'ó': return 'o';
    case 'ú': return 'u';
    case 'ü': return 'u';
    case 'ñ': return 'n';
    case '-': return '';
    default : return char;
  }
}

export const removeVocals = (char) => {
  switch (char) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
      return '';
    default : return char;
  }
}