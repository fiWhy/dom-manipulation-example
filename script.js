var wrapper = document.getElementById('wrapper');

var form = document.getElementById('filter-form');

function requestCharacters(fitler) {
  return get(
    'https://rickandmortyapi.com/api/character/?' + serialize(fitler)
  ).then(function(data) {
    return data.results.map(function(character) {
      var c = new Champion(character.name, 200, 150);
      c.setImage(character.image);
      return c;
    });
  });
}

function requestCharactersWithFetch(fitler) {
  return fetch(
    'https://rickandmortyapi.com/api/character/?' + serialize(fitler)
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.results.map(function(character) {
        var c = new Champion(character.name, 200, 150);
        c.setImage(character.image);
        return c;
      });
    });
}

// form.elements.characterName.addEventListener(
//   'input',
//   debounce(function() {
//     requestCharacters({
//       name: this.value,
//       gender: 'male'
//     }).then(function(arrayOfCharacters) {
//       wrapper.innerHTML = '';
//       arrayOfCharacters.forEach(function(champ) {
//         champ.render(wrapper);
//       });
//     });
//   }, 200)
// );

requestCharacters({
  name: 'rick',
  gender: 'male'
}).then(function(arrayOfCharacters) {
  wrapper.innerHTML = '';
  arrayOfCharacters.forEach(function(champ) {
    champ.render(wrapper);
  });
});
