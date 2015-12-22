Template.newSource.events({
   "submit .new-source": function (event) {
     // Prevent default browser form submit
     event.preventDefault();

     // Get value from form element
     var text = event.target.text.value;

     // Insert a task into the collection
     Sources.insert({
       link: text,
     });
     console.log(Sources.find().fetch())
     // Clear form
     event.target.text.value = "";
     Router.go('/');
   }
 });
