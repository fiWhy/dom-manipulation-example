var wrapper = document.getElementById('wrapper');

var form = document.getElementById('filter-form');

function requestCharacters(fitler, success) {
  get(
    'https://rickandmortyapi.com/api/character/?' + serialize(fitler),
    function(data) {
      var arrayOfCharacters = data.results.map(function(character) {
        var c = new Champion(character.name, 200, 150);
        c.setImage(character.image);
        return c;
      });

      success(arrayOfCharacters);
    }
  );
}

form.elements.characterName.addEventListener(
  'input',
  debounce(function() {
    requestCharacters(
      {
        name: this.value,
        gender: 'male'
      },
      function(arrayOfCharacters) {
        wrapper.innerHTML = '';
        arrayOfCharacters.forEach(function(champ) {
          champ.render(wrapper);
        });
      }
    );
  }, 200)
);
