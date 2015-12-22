
Template.news.onRendered(function() {
  updateRSS('http://amherststudent.amherst.edu/?q=rss.xml');
  updateRSS('http://news.yale.edu/news-rss');

});


Template.news.helpers({

  articles : function() {
    //pull the list of rss feeds for the user
    //forall rss, update database if need
    //return the users feeds from database

    //we update the rssData everytime the user rquests a feed

    var all = Rss.find().fetch();
    console.log("now you have ...")
    console.log(all)
    console.log(Rss.find().count())
    return all;
  }
});

var updateRSS = function (sourceRSS){
  var results=[];
  var rssAll = $.jGFeed(sourceRSS,
    function(feeds){
      if(!feeds){
       console.error("error: bad rss feed");
       return false;
      }
      for(var i=0; i<feeds.entries.length; i++){
        currentTitle = feeds.entries[i].title;
        if(!Rss.findOne({title:currentTitle})){
          //console.log(!Rss.findOne({title:currentTitle}))
          //console.log(Rss.findOne({title:currentTitle}))
          console.log("found a new article, adding to database: "+currentTitle);
          Rss.insert(feeds.entries[i]);
        }
      }
    }, 5);
}

Template.article.helpers({
  title : function() { console.log(this); return this.title },
  link : function() { return this.link }

});
