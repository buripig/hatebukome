chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if(request.message == "open"){
      openBottomLine(request.urlAutoAdd);
      scrollBookmarks(request.bookmarks, request.loop, request.travelocity);
      if(!request.tab.selected) stop();
    }else if(request.message == "close"){
      closeBottomLine();
    }else if(request.message == "start"){
      start();
    }else if(request.message == "stop"){
      stop();
    }
  }
);

function openBottomLine(urlAutoAdd){
  appendCss();
  $("body").append(createBottomLine(urlAutoAdd));
  $("#__hatebukome__").animate({bottom: "0px"}, 800);
}

function scrollBookmarks(bookmarks, loop, travelocity){
  $("#__hatebukome__").append(createBookMarkUl(bookmarks));
  $("#__hatebukome__ul__").liScroll({loop: loop, travelocity: travelocity});
}

function closeBottomLine(){
  if($("#__hatebukome__ul__").length == 0) return;
  $("#__hatebukome__").animate({bottom: "-30px"}, 800, function(){$("#__hatebukome__").remove();$("#__hatebukome__style").remove();});
}

function start(){
  if($("#__hatebukome__ul__").length == 0) return;
  $("#__hatebukome__ul__").trigger("mouseout");
}

function stop(){
  if($("#__hatebukome__ul__").length == 0) return;
  $("#__hatebukome__ul__").trigger("mouseover");
}

function createBottomLine(urlAutoAdd){
  return $('<div id="__hatebukome__"/>')
           .append(
             $('<span id="__hatebukome__left"/>')
               .append(
                 $('<a id="__hatebukome__hatebubutton"/>')
                   .attr("href", "http://b.hatena.ne.jp/entry/" + location.href.replace(/^[a-zA-Z]+:\/\//, ""))
                   .attr("target", "_blank")
                   .append(
                     $('<img id="__hatebukome__hatebubutton-img"/>')
                       .attr("src", chrome.extension.getURL("images/hatebu_07.png"))
                   )
               )
           )
           .append(
             $('<span id="__hatebukome__right"/>')
               .append(
                 $('<img id="__hatebukome__cancelbutton"/>')
                   .attr("src", chrome.extension.getURL("images/close-blue.png"))
                   .bind("click", function(){if(urlAutoAdd){chrome.extension.sendRequest({type: "addIgnoreUrl", url: location.href});} closeBottomLine();})
               )
           );
}

function createBookMarkUl(bookmarks){
  var ul = $('<ul id="__hatebukome__ul__">');
  $.each(bookmarks, function(i, bookmark){
    ul.append(createBookMarkLi(bookmark));
  });
  return ul;
}

function createBookMarkLi(bookmark){
  return $('<li/>')
           .append(
             $('<a id="__hatebukome__username"/>')
               .attr("href", "http://b.hatena.ne.jp/" + bookmark.user + "/")
               .attr("target", "_blank")
               .text(bookmark.user)
               .prepend(
                 $('<img id="__hatebukome__profileicon"/>')
                   .attr("src", "http://www.st-hatena.com/users/" + bookmark.user.substr(0, 2) + "/" + bookmark.user + "/profile.gif")
               )
           )
           .append(
             $('<span id="__hatebukome__comment"/>')
               .text(bookmark.comment)
           );
}

function appendCss(){
  var css = '\
<style id="__hatebukome__style">\
#__hatebukome__{\
  height: 22px !important;\
  background: rgba(254,252,160,0.7) !important;\
  z-index: 90 !important;\
  position: fixed !important;\
  bottom: -30px;\
  left: 2.5% !important;\
  width: 95% !important;\
  margin-left: 0px !important;\
  padding: 0px !important;\
  text-align: left !important;\
  border-top: solid 2px #FFCC33 !important;\
  border-left: solid 2px #FFCC33 !important;\
  border-right: solid 2px #FFCC33 !important;\
  border-bottom: none !important;\
  -webkit-border-top-left-radius: 8px !important;\
  -webkit-border-top-right-radius: 8px !important;\
}\
#__hatebukome__left, #__hatebukome__right{\
  margin: 0px !important;\
  padding: 0px !important;\
  position: absolute !important;\
  width: 30px !important;\
  height: 100% !important;\
  text-align: center !important;\
  background: rgba(254,252,160,1.0) !important;\
  z-index: 91 !important;\
}\
#__hatebukome__left{\
  left: 0px !important;\
  -webkit-border-top-left-radius: 8px !important;\
}\
#__hatebukome__right{\
  right: 0px !important;\
  -webkit-border-top-right-radius: 8px !important;\
}\
#__hatebukome__hatebubutton{\
  margin: 0px !important;\
  padding: 0px !important;\
  border: none !important;\
}\
#__hatebukome__hatebubutton-img{\
  margin: 0px !important;\
  padding: 0px !important;\
  height: 24px !important;\
  width: 24px !important;\
  border: none !important;\
}\
#__hatebukome__cancelbutton{\
  margin: 0px !important;\
  padding: 0px !important;\
  padding-top: 2px !important;\
  height: 20px !important;\
  width: 20px !important;\
  border: none !important;\
}\
#__hatebukome__tickercontainer {\
  border: none !important;\
  width: 100%;\
  height: 22px !important;\
  margin: 0px !important;\
  padding: 0px !important;\
  overflow: hidden !important; \
}\
#__hatebukome__mask {\
  position: relative !important;\
  left: 0px !important;\
  top: 0px !important;\
  width: 100% !important;\
  overflow: hidden !important;\
}\
#__hatebukome__ ul.__hatebukome__newsticker {\
  position: relative !important;\
  left: 100%;\
  list-style-type: none !important;\
  margin: 0px !important;\
  padding: 0px !important;\
}\
#__hatebukome__ ul.__hatebukome__newsticker li {\
  float: left !important;\
  margin: 0 !important;\
  padding: 0 !important;\
  padding-top: 2px !important;\
}\
#__hatebukome__profileicon{\
  height: 18px !important;\
  width: 18px !important;\
  border: none !important;\
  margin-right: 5px !important;\
}\
#__hatebukome__username, #__hatebukome__username:hover, #__hatebukome__comment{\
  margin: 0px !important;\
  padding: 0px !important;\
  font-size: 16px !important;\
  font-style: normal !important;\
  font-weight: normal !important;\
  background-color: transparent !important;\
  text-decoration: none !important;\
  vertical-align: top !important;\
  text-align: left !important;\
}\
#__hatebukome__username {\
  color: blue !important;\
  margin-right: 10px !important;\
}\
#__hatebukome__username:hover{\
  color: blue !important;\
  margin-right: 10px !important;\
}\
#__hatebukome__comment{\
  color: #000 !important;\
  margin-right: 30px !important;\
}\
</style>\
';
  $("body").append(css);
}