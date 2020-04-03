function asyncCall(time) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('abc');
    }, time);
  });
}

var clown = '🤡';
var fun = '🥳';
var drunk = '🥴';
var sad = '🥺';
var normal = '😏';

function make(time, from, to, cbFn) {
  setTimeout(function() {
    cbFn(
      from.map(function() {
        return to;
      })
    );
  }, time);
}

function makeWithPromise(time, to) {
  return function(from) {
    return new Promise(function(resolve) {
      make(time, from, to, resolve);
    });
  };
}

function tap(cb) {
  return function(data) {
    cb(data);
    return data;
  };
}
var mode = 'development';

function promiseDataDebug(cb) {
  return mode === 'development'
    ? tap(cb)
    : function(data) {
        return data;
      };
}

var arr = Array(3000).fill('😈');

var devilPromise = new Promise(function(resolve, reject) {
  resolve(arr);
  resolve([]);
});

var staticDevilPromise = Promise.resolve(arr);

var p = staticDevilPromise;
var clownMade = p.then(makeWithPromise(100, clown));

clownMade
  .then(tap(console.log))
  .then(makeWithPromise(100, fun))
  .then(tap(console.log))
  .then(makeWithPromise(100, drunk))
  .then(tap(console.log))
  .then(makeWithPromise(100, sad))
  .then(tap(console.log))
  .then(makeWithPromise(100, normal))
  .then(tap(console.log));

p.then(function(data) {
  console.log(data);
});

clownMade
  .then(tap(console.log))
  .then(makeWithPromise(100, fun))
  .then(tap(console.log))
  .then(makeWithPromise(100, drunk))
  .then(tap(console.log))
  .then(makeWithPromise(100, sad))
  .then(tap(console.log))
  .then(makeWithPromise(100, normal))
  .then(tap(console.log));

// devilPromise
//   .then(function(devils) {
//     return makeWithPromise(1000, devils, clown);
//   })
//   .then(function(clowns) {
//     console.log(clowns);
//   });
