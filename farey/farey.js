var reduction = function(a, b) {

  for (let i = 2; i <= a; i++) {

    if(a % i === 0 && b % i === 0) return true;

  }
  return false;
};

var displsyVal = function(arr) {

  let result = [];

  for (let key in arr) {
    let keyArr = arr[key].join("/");
    result.push(" " + keyArr);
  }

  document.write(result);

};

var getFarey = function(n) {
  let arrIndex = [];

  for ( ; n > 0; n--) {

    for(let i = 1; i < n; i++) {

      if (!reduction(i, n))

      arrIndex.push([i,n]);
    }

  }

  arrIndex.splice( 0, 0, [0, 1] );
  arrIndex.push( [1, 1] );

  displsyVal(arrIndex);
};

getFarey(6);
