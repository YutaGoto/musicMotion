//////////////////////// itemSearch.js ////////////////////////
var $;

function ItemSearch(id, addOpts) {

  // Element ID Name
  this.elementId = id;

  // Array applicationId / developerId
  this.applicationId = [
    '1078594737046022507'
  ];

  // Default Options
  this.options = {
    genreId: 101311,
    page: 1,
    hits: 1,
    sort: 'standard'
  };

  // Initialize => Option Overwrite
  this.setOptions(addOpts);

}

ItemSearch.prototype = {

  // Use Random ID
  id: function () {
    return this.applicationId[Math.floor(Math.random() * this.applicationId.length)];
  },

  // API URL Generater
  generateURL: function (options) {
    var url, key;

    // Rakuten API ItemSearch v2 URL
    url = 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20120723?format=json&callback=?';
    url += '&applicationId=' + this.id();

    for (key in options) {

      if (options.hasOwnProperty(key)) {

        if (options[key] === '') { continue; }

        if (key === 'keyword' || key === 'NGKeyword') {
          url += '&' + key + '=' + encodeURIComponent(options[key]);
        } else {
          url += '&' + key + '=' + options[key];
        }
      }

    }

    return url;
  },

  // Option Overwrite
  setOptions: function (addOpts) {
    this.options = $.extend(this.options, addOpts);
  },

  // Get Item DATA
  getItems: function () {
    var self = this, url;
    url = self.generateURL(self.options);
    $.getJSON(url, function (data) {
        // User Custom View
        self.addView(data);
    });
  },

  // User Customize View
  addView: function (data) {
    // Please be defined later
  }

};

//////////////////////// itemSearch.js ////////////////////////

var recommend = new ItemSearch('recommend', { keyword: '1992' });

recommend.addView = function (data) {
  var items = data.Items, item, i, j, html;    

  html = '';
  for (i = 0, j = items.length; i < j; i++) {
    item = items[i].Item;

    html += '<p>';
    html += '<a href="' + item.itemUrl + '">';
    html += '<img src="' + item.mediumImageUrls[0].imageUrl + '"> ';
    html += item.itemName;
    html += '</a></p>';
  }

  $('#' + this.elementId).html(html);

};

recommend.getItems();
