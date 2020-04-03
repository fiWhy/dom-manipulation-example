function request(method, url, data) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.addEventListener('load', function(e) {
      resolve(this);
    });
    xhr.addEventListener('error', reject);
    xhr.send(data);
    return xhr;
  });
}

function get(url) {
  return request('GET', url);
}
function post(url, data) {
  return request('POST', url, data);
}

function transformFromXmlResponse(xmlResponse) {
  return JSON.parse(xmlResponse.responseText);
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

function HttpClient(baseUrl) {
  this.baseUrl = baseUrl;
}

HttpClient.prototype.prepeareUrl = function(postfix) {
  return this.baseUrl + postfix;
};

HttpClient.prototype.get = function(postfix) {
  var self = this;
  return get(this.prepeareUrl(postfix)).then(function(data) {
    if (data.status === 200) {
      self.handleError();
    }
    return transformFromXmlResponse(data);
  });
};

HttpClient.prototype.post = function(postfix, data) {
  var self = this;
  return post(this.prepeareUrl(postfix), data).then(function(data) {
    if (data.status === 200) {
      self.handleError();
    }
    return transformFromXmlResponse(data);
  });
};

HttpClient.prototype.handleError = function() {};
