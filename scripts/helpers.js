//"use strict";
var _ = require("lodash");
var moment = require("moment");

hexo.extend.helper.register('menu_lang', function(className){
  
  var lang = this.page.lang;
  var menu = this.site.data.menu;
  var root = this;
  var result = "";

  if(lang == "pt"){
    getMenu();
  }else{
      getMenu();
  }

  // Hoisting function
  function getMenu(){

    result += '<li><a href="/">INICIO</a></li>';

    _.each(menu, function(path, title){

      path = path.replace("/", "./");

      result += '<li><a href="/'+lang+'/'+path+'">'+
                root._p("menu." + title)+
                '</a></li>';
    });
  }

  return result;

});

// Script para limitar as strings
hexo.extend.helper.register('limit', function(text, lengthText){
  return text.substring(0, lengthText) + "...";
});

hexo.extend.helper.register('parseDate', function(postDate){
  return moment(postDate, 'YYYYMMDD')
});
