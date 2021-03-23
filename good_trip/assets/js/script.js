 // Get the modal
 var modal = document.getElementById('myModal');
      
 // Get the button that opens the modal
 var btn2 = document.getElementById("myBtn2");
  var btn = document.getElementById("myBtn");
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
 
 // When the user clicks the button, open the modal 
 btn.onclick = function() {
  conmodal.style.display = "none";
   modal.style.display = "block";
 }
 btn2.onclick = function() {
  conmodal.style.display = "none";
   modal.style.display = "block";
 }
 
 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(eventx) {
   if (eventx.target == modal) {
     modal.style.display = "none";
   }
 }


 var conmodal = document.getElementById('conModal');
      
 // Get the button that opens the modal
 var conbtn2 = document.getElementById("conBtn2");
  var conbtn = document.getElementById("conBtn");
 // Get the <span> element that closes the modal
 var conspan = document.getElementsByClassName("conclose")[0];
 
 // When the user clicks the button, open the modal 
 conbtn.onclick = function() {
  modal.style.display = "none";
   conmodal.style.display = "block";
 }
 conbtn2.onclick = function() {
  modal.style.display = "none";
   conmodal.style.display = "block";
 }
 
 // When the user clicks on <span> (x), close the modal
 conspan.onclick = function() {
   conmodal.style.display = "none";
 }
 
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(eventxx) {
   if (eventxx.target == modal) {
     conmodal.style.display = "none";
   }
 }
 var articale = firebase.database().ref('articale');
 articale.on("child_added", function(data) {
  var dir_articale = data.val();
 document.getElementById("full_articale").innerHTML += '<article class="col-md-6 col-sm-12"><div class="card mt-5"><img src="'+dir_articale.admin_image+'" class="card-img-top" height="250px"><div class="card-body"><h5 class="card-title text-center">'+dir_articale.admin_title+'</h5><p class="card-text">'+dir_articale.admin_description+'</p><article class="text-right"> <a href="articale.html?id='+data.key+'" class="btn btn-primary">découvrir</a></article></div></div></article>';
 
});

var furl = new URL(window.location); 
var id = furl.searchParams.get('id');
var farticale = firebase.database().ref('articale/'+id);

farticale.once("value", function(data) {
    var newdata = data.val();
       document.getElementById("about").innerHTML = '<div class="container"><div class="about-w3l-agileifo-grid"><div class="agile-w3l-ab"><div class="agile-w3l-ab-img"><img width="100%" src="'+newdata.admin_image+'" class="img-responsive" alt="Homey Designs"></div></div><div class="ab-w3l-text w3l-pop"><div class="ab-agile-top"><h3>'+ newdata.admin_title +'</h3><div class="ab-agile-bottom"><p>'+newdata.admin_description+'</p></div></div></div></div><br><br><br><br><br><br><br><br><br><div class="card"><div class="card-body"><p class="card-text">'+ newdata.admin_histoire +'</p></div><ul class="list-group list-group-flush"><li class="list-group-item">Endroit : '+ newdata.admin_endroit +'</li><li class="list-group-item">Prix : '+ newdata.admin_prix +' €</li><li class="list-group-item"><a href="contact.html">Contactez nous</a></li></ul></div></div>';
    });    