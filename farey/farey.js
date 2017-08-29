var reduction = (a, b) => {

  for (let i = 2; i <= a; i++) {

    if(a % i === 0 && b % i === 0) return true;

  }
  return false;
};

var displayVal = (arr) => {

  let result = [];

  for (let key in arr) {
    let keyArr = arr[key].join("/");
    result.push(" " + keyArr);
  }

  return result;

};

var getFarey = (n) => {
  let nVal = n;
  let arrIndex = [];

  for ( ; n > 0; n--) {

    for(let i = 1; i < n; i++) {

      if (!reduction(i, n))

      arrIndex.push([i,n]);
    }

  }

  arrIndex.sort( (a, b) => {
    a[0] / a[1] < b[0] / b[1];
  });

  arrIndex.splice( 0, 0, [0, 1] );
  arrIndex.push( [1, 1] );

  document.write( `<strong>The Farey sequence of order ${nVal}:</strong> ${displayVal(arrIndex)} <br />`  );

};

getFarey(5);
