function FIFO(size) {
  let arr = new Array(size);

  const push = (el) => {
    const n = arr.slice(1);
    arr = [...n, el];
    return arr;
  };
  
  const get = () => {
    return arr;
  };

  return {
    push,
    get
  };
}    

export { FIFO };