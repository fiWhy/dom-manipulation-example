var Champion = (function() {
  function Champion(title, health, stamina) {
    this.title = title;
    this.maxHealth = this.health = health;
    this.maxStamina = this.stamina = stamina;
    this.elements = createChamp();
    this.initListeners();
    this.setTitle(title);
  }

  Champion.prototype.initListeners = function() {
    var self = this;
    this.elements.health.addEventListener('click', function() {
      self.damage(10);
    });

    this.elements.stamina.addEventListener('click', function() {
      self.move(10);
    });
  };

  Champion.prototype.damage = function(by) {
    this.health = this.health - this.maxHealth * (by / 100);
    this.repaint();
  };

  Champion.prototype.move = function(by) {
    this.stamina = this.stamina - this.maxStamina * (by / 100);
    this.repaint();
  };

  Champion.prototype.restore = function() {
    this.health = this.maxHealth;
    this.stamina = this.maxStamina;
    this.repaint();
  };

  Champion.prototype.setImage = function(imageSrc) {
    this.elements.avatarImage.src = imageSrc;
  };

  Champion.prototype.setTitle = function(title) {
    this.elements.title.innerText = this.title = title;
  };

  Champion.prototype.repaint = function() {
    this.elements.healthInner.style.width =
      calculatePercentFrom(this.health, this.maxHealth) + '%';
    this.elements.staminaInner.style.width =
      calculatePercentFrom(this.stamina, this.maxStamina) + '%';
    +'%';
  };

  Champion.prototype.render = function(parent) {
    parent.appendChild(this.elements.el);
  };

  return Champion;
})();
