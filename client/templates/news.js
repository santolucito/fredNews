
Template.news.onRendered(function() {
  Sources.find().map( function(s){
    Meteor.call("updateRSS",s);
  });
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
  getContent : function(){
    var c = this.contentSnippet
    return c.split(/\s+/).filter(function(word) {
      return word && !/[&]/.test(word);
    }).join(" ");
  }
});


Meteor.methods({
  updateRSS : function (sourceRSS){
    console.log('answered');
    var results=[];
    var rssAll = $.jGFeed(sourceRSS.link,
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
            var articleToAdd = feeds.entries[i]
            articleToAdd.source = sourceRSS.name
            console.log(articleToAdd);
            Articles.insert(articleToAdd);
          }
        }
      }, 5);
  }

});
