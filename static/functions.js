
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

  function formatTimeUnit(input, unit){
    var index = input.indexOf(unit);
    var output = "00"
   if(index < 0){
     return output;
   }
  
   if(isNaN(input.charAt(index-2))){
     return '0' + input.charAt(index-1);
   }else{
     return input.charAt(index-2) + input.charAt(index-1);
   }
  }
  
  function ISO8601toDuration(input){
    var H = formatTimeUnit(input, 'H');
    var M = formatTimeUnit(input, 'M');
    var S = formatTimeUnit(input, 'S');
   if(H === "00"){
     H = "";
   }else{
     H += ":"
   }
  
   return H  + M + ':' + S ;
  }


  module.exports  = {
    shuffle,
    ISO8601toDuration
  };