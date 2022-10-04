const scale = (numbers, factor) => {
  for(let index = 0; index < numbers.length; index++) {
    numbers[index] *= factor;
  }

  return numbers;
};

export default scale;
