function request(method, url, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.addEventListener('load', function() {
    if (success) {
      success(JSON.parse(this.responseText));
    }
  });
  xhr.addEventListener('error', error || function() {});
  xhr.send();
  return xhr;
}

function get(url, success, error) {
  return request('GET', url, success || function() {}, error || function() {});
}

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
