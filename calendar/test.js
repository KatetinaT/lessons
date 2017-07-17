describe("pow", function() {

    describe("возводит x в степень n", function(){
    
      function makeTests(x) {
        var expected = x * x * x;
        it("при возведении " + x + " в степень 3 результат: " + expected, function(){
          assert.equal(pow(x, 3), expected);
        });
      }

      for (var x = 1; x <= 5; x++) {
        makeTests(x);
      }

    });

    //more tests...

});
