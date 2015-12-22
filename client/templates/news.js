var EDITING_KEY = 'editingList';
Session.setDefault(EDITING_KEY, false);

Template.news.helpers({

  articles : function() {
    //pull the rss feeds for the user
    //forall rss, pull articles
    //order them and return list of title and links
    var all = [
      {title:"News headline 1",link:"a.link.com"},
      {title:"News headline 2",link:"a.link.com"}
    ];
    console.log(all);
    return all;
  }
});

Template.article.helpers({
  title : function() { console.log(this); return this.title },
  link : function() { return this.link }
  
});
