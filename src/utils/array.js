const pick = (arr, index) => { 
  let n = index % arr.length;
  
  if (n < 0) n = arr.length + n;

  return arr[ n ];
}

export {
  pick
}