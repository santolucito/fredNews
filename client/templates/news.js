
Template.news.onRendered(function() {
  Meteor.call("updateRSS",'http://amherststudent.amherst.edu/?q=rss.xml');
  Meteor.call("updateRSS",'http://news.yale.edu/news-rss');
  console.log("called twice");
});


Template.news.helpers({

  articles : function() {
    //pull the list of rss feeds for the user
    //forall rss, update database if need
    //return the users feeds from database

    //we update the rssData everytime the user rquests a feed

    var all = Articles.find().fetch();
    console.log("now you have ...")
    console.log(all)
    console.log(Articles.find().count())
    return all;
  }
});

Template.article.helpers({
  title : function() { console.log(this); return this.title },
  link : function() { return this.link }
});


Meteor.methods({
  updateRSS : function (sourceRSS){
    console.log('answered');
    var results=[];
    var rssAll = $.jGFeed(sourceRSS,
      function(feeds){
        if(!feeds){
         console.error("error: bad rss feed");
         return false;
        }
        for(var i=0; i<feeds.entries.length; i++){
          currentTitle = feeds.entries[i].title;
          if(!Articles.findOne({title:currentTitle})){
            //console.log(!Rss.findOne({title:currentTitle}))
            //console.log(Rss.findOne({title:currentTitle}))
            console.log("found a new article, adding to database: "+currentTitle);
            Articles.insert(feeds.entries[i]);
          }
        }
      }, 5);
  }

});
