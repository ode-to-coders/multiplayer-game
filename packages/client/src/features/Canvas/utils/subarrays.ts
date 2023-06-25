function subarray(size: number, array: number[]) {
  const result = [];
  for (let i = 0; i <Math.ceil(array.length/size); i++){
    result[i] = array.slice((i*size), (i*size) + size);
  }

  return result;
}

export default subarray;
