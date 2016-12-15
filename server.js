const express = require('express');
const app = express();

var array = [];
for(var i = 1; i <= 100; i++) {
  array.push(i);
}
for (var i = array.length - 1; i > 0; i--) {
  var j = Math.floor(Math.random() * (i + 1));
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

app.use(express.static('public'));
app.get('/data', function(req, res) {
  res.send({
    data: array.toString()
  });
});

app.listen(8080, function() {
  console.log('Listening on port 8080');
});
