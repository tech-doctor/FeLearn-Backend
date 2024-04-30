
function shuffle(arr) {
    let arrLength = arr.length;
    let temp;
    let index;
    while (arrLength > 0) {
      index = Math.floor(Math.random() * arrLength);
      arrLength--;
      temp = arr[arrLength];
      arr[arrLength] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }


  module.exports  = {
    shuffle
  };