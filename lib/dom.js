function appendProperties(el, props) {
  var classes = props.classes;
  var style = props.style;
  delete props.classes;
  delete props.style;

  if (classes) {
    el.className = classes.join(' ');
  }

  if (style) {
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        const value = style[key];
        el.style[key] = value;
      }
    }
  }

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const value = props[key];
      el.setAttribute(key, value);
    }
  }

  return el;
}

function element(elementName, props, children) {
  var el = document.createElement(elementName);
  (children || []).forEach(function(childElement) {
    el.append(childElement);
  });
  return appendProperties(el, props || {});
}

function createChamp() {
  var title = element('div', {
    classes: ['title']
  });
  var healthInner = element('div', {
      classes: ['health-inner', 'inner'],
      style: {
        width: '100%'
      }
    }),
    staminaInner = element('div', {
      classes: ['stamina-inner', 'inner'],
      style: {
        width: '100%'
      }
    }),
    avatarImage = element('img', {
      classes: ['avatar-img']
    });
  var health = element('div', { classes: ['health-bar'] }, [healthInner]),
    stamina = element('div', { classes: ['stamina-bar'] }, [staminaInner]),
    avatar = element('div', { classes: ['avatar-block'] }, [avatarImage]);
  var card = element(
    'div',
    {
      classes: ['card-wrapper']
    },
    [title, health, stamina, avatar]
  );

  return {
    healthInner: healthInner,
    staminaInner: staminaInner,
    health: health,
    stamina: stamina,
    avatar: avatar,
    avatarImage: avatarImage,
    title: title,
    el: card
  };
}
