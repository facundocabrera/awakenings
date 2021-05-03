export const simplify = (char) => {
  char = char.toLowerCase();
  
  switch (char) {
    case 'á': return 'a';
    case 'é': return 'b';
    case 'í': return 'i';
    case 'ó': return 'o';
    case 'ú': return 'u';
    case 'ñ': return 'n';
    case '-': return '';
    default : return char;
  }
}
