
var display = document.getElementById("display");
$("#inscription").click(function() {
      var insemail = $("#inscription_mail").val();
          var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: window.location.href+"?emailid=email",
        handleCodeInApp: true,
     }
    firebase.auth().sendSignInLinkToEmail(insemail, actionCodeSettings)
    .then(function() {
      
        //localStorage.clear();
        window.localStorage.setItem('emailForSignIn', insemail);
        $("#validmail").html("<b>Veuillez commencer votre inscription en cliquant sur le lien qu'on vient de vous envoyer sur votre adresse mail: "+insemail+"</b>");
        $("#validbtn").html('<span class="close"></span>');
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
     
      $("#emailHelp").html('<div class = "text-danger">'+error+'</div>');
       
    });

  //firebase.auth().createUserWithEmailAndPassword(insemail, rdmpass);
  
  });
  var regspan = document.getElementsByClassName("regclose")[0];
  var regmodal = document.getElementById('regModal');
  var urlParams = new URLSearchParams(location.search);
  var emailid = urlParams.get('emailid');
if(emailid=="email")
{
    regmodal.style.display = "block";
    var gtemail = window.localStorage.getItem('emailForSignIn');

    regspan.onclick = function() {
        regmodal.style.display = "none";
      }
    window.onclick = function(event) {
        if (event.target == regmodal) {
            regmodal.style.display = "none";
        }
      }
           $("#reg_mail").val(gtemail);
   
     $("#register").click(function() {
        var regemailid = $("#reg_mail").val();
        var inspass = $("#reg_pass").val();
     firebase.auth().createUserWithEmailAndPassword(regemailid, inspass).then(function(){ 
      location.href = "profile.html";
    }).catch(function(error) {
        // Handle Errors here.
               var errorMessage = error.message;
        $("#passHelp").html('<div class = "text-danger">'+errorMessage+'</div>');
              
        // ...
      });
    });

}
  

$("#conection").click(function() {

  var conmail = $("#con_mail").val();
  var conpass = $("#con_pass").val();

  firebase.auth().signInWithEmailAndPassword(conmail, conpass)
  .catch(function(error) {
        
     $("#conHelp").html('<div class = "text-danger">'+error.message+'</div>');  
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
   
      location.href = "profile.html";

      
    } else {
      // User is signed out.
      // ...
     
    }
  });


  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $("#con_p").html('<button class="btn btn-outline-light mx-2" type="submit" id="profileBtn">Profile</button>'); 
      $("#dec_p").html('<button id="decBtn" class="btn btn-outline-danger mx-2" type="submit">Déconnecter</button>'); 
 
      $('#profileBtn').click(function(){
        
        location.href = "profile.html";
      });
  
      $('#decBtn').click(function(){
        firebase.auth().signOut();
        location.href = "index.html";
      });
      
    } else {
      // User is signed out.
      // ...
      
    } });


    function initapp() {
     
      firebase.auth().onAuthStateChanged(function (xuser) {
          var users = firebase.database().ref('user/' + xuser.uid + '/');
          var articale = firebase.database().ref('articale');
          if (xuser) {
             
          users.on("value", function (data) {
              var monUser = data.val();
                $("#pseudo").val(monUser.pseudo);
                $("#nom").val(monUser.nom);
                $("#prenom").val(monUser.prenom);
                $("#age").val(monUser.agee);
                $("#gender").val(monUser.sexe);
                $("#phone").val(monUser.tel);
                $("#adresse").val(monUser.inputAddress);
                $("#pays").val(monUser.pays);
console.log(monUser.imageurl);

                var photo = $('#profil_pict').children();
              photo[0].src = monUser.imageurl;
              var photo = $('#profil_pict2').children();
              photo[0].src = monUser.imageurl;
          });
              $("#email").val(xuser.email);
              $('#valider').click(function () {
                           
                  var pseudo = $("#pseudo").val();
                  var nom = $("#nom").val();
                  var prenom = $("#prenom").val();
                  var agee = $("#age").val();
                  var sexe = $("#gender").val();
                  var tel = $("#phone").val();
                  var inputAddress = $("#adresse").val();
                  var pays = $("#pays").val();
                  var x = $('#profil_pict').children();
  // console.log(x[0]);
  var src = x[0].src;
                  var purl = src;
                          
                              
                    users.set({
                      pseudo: pseudo,
                      nom: nom,
                      prenom: prenom,
                      agee: agee,
                      sexe: sexe,
                      tel: tel,
                      inputAddress: inputAddress,
                      pays: pays,
                      imageurl:purl
              
                    
                  });     
  

  
              });

              $('#admin_valider').click(function () {

                var admin_title = $("#admin_title").val();
                var admin_description = $("#admin_description").val();
                var admin_prix = $("#admin_prix").val();
                var admin_endroit = $("#admin_endroit").val();
                var admin_histoire = $("#admin_histoire").val();
                var admin_img = $('#admin_profil_pict').children();
                var admin_src = admin_img[0].src;
                var admin_url = admin_src;
                articale.push().set({
              admin_title: admin_title,
              admin_description: admin_description,
              admin_prix: admin_prix,
              admin_endroit: admin_endroit,
              admin_histoire: admin_histoire,
              admin_image: admin_url
              });
              
              alert("post succussed")
              location.href = "admin.html";
               });
               articale.on("child_added", function(data) {
                var newPlayer = data.val();
              var taskArticle = document.createElement("div");
                taskArticle.addEventListener('dblclick',comdel);
                taskArticle.classList.add('card','mb-3');
                taskArticle.setAttribute('data-position', data.key);
                var taskbody = document.createElement("div");
                taskbody.classList.add('card-body');
                taskArticle.appendChild(taskbody);
                var tasktitre = document.createElement("h1");
                tasktitre.classList.add('h5');
                tasktitre.textContent = newPlayer.admin_title;
                taskbody.appendChild(tasktitre);
                
                display.appendChild(taskArticle);
           
             });

             function comdel(){
              var order = this.getAttribute('data-position');
              articale.child(order).remove();
              this.remove();
             }
              
          } else {
  
  
          }
  
         
      });
      function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var auth = firebase.auth();
        var storageRef = firebase.storage().ref();
        var file = evt.target.files[0];
  
        var metadata = {
          'contentType': file.type
        };
  
        // Push to child path.
        // [START oncomplete]
        storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log('File metadata:', snapshot.metadata);
          // Let's get a download URL for the file.
          snapshot.ref.getDownloadURL().then(function(url) {
            var photo = $('#profil_pict').children();
            photo[0].src = url;
            var photo = $('#profil_pict2').children();
            photo[0].src = url;
  
            // [END_EXCLUDE]
          });
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        });
        // [END oncomplete]
      }
      document.getElementById('file').addEventListener('change', handleFileSelect, false);

  }
  
  

  function adminleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var auth = firebase.auth();
    var storageRef = firebase.storage().ref();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };

    // Push to child path.
    // [START oncomplete]
    storageRef.child('articale/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      snapshot.ref.getDownloadURL().then(function(xurl) {
        var photo = $('#admin_profil_pict').children();
        photo[0].src = xurl;
        
        // [END_EXCLUDE]
      });
    }).catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
    // [END oncomplete]
  }
  document.getElementById('admin_file').addEventListener('change', adminleFileSelect, false);