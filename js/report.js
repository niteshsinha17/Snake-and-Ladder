
  // Your web app's Firebase configuration

  var firebaseConfig = {
     apiKey: "AIzaSyDhkji_vhA58VnWYVdcRJpzxDbNkuGxk50",
     authDomain: "snake-and-ladder-web.firebaseapp.com",
     databaseURL: "https://snake-and-ladder-web.firebaseio.com",
     projectId: "snake-and-ladder-web",
     storageBucket: "snake-and-ladder-web.appspot.com",
     messagingSenderId: "664238188861",
     appId: "1:664238188861:web:c140a2df78a363491b3d54",
     measurementId: "G-N56P30TGP8"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   var firestore = firebase.firestore();

//    firebase.analytics();

// var contactRef = firebase.ref().child("bug-form");

const BugDb = firestore.collection("BugData");
const CommentDb = firestore.collection("CommentData");
const message = document.getElementById('message');

document.getElementById('bug-submit').addEventListener('click',submitBugForm);
document.getElementById('comment-submit').addEventListener('click',submitCommentForm);

function submitBugForm(e){
     e.preventDefault();

     var name = getInputVal('bug-name');
     var email = getInputVal('bug-email');
     var msg = getInputVal('bug-msg')

     saveBugForm(name,email,msg);

     document.getElementById('bug-form').reset();


}

function submitCommentForm(e){
     e.preventDefault();

     var name = getInputVal('comment-name');
     var msg = getInputVal('comment-msg')

     saveCommentForm(name,msg);

     document.getElementById('comment-form').reset();


}

function getInputVal(id){
     return document.getElementById(id).value;
}

function saveBugForm(name,email,msg){
     BugDb.doc().set({
          name:name,
          email:email,
          msg:msg
     }).then( function(){
          message.textContent='Thanks for your Response'
          message.style.display = 'block'
     }
     )
     .catch(function(error){
          message.textContent='Something went wrong'
          message.classList.remove('alert-success')
          message.classList.add('alert-warning')
          message.style.display = 'block'
     })
}

function saveCommentForm(name,msg){
     CommentDb.doc().set({
          name:name,
          msg:msg
     }).then( function(){
          message.textContent='Thanks for your Response'
          message.style.display = 'block'

     }
     )
     .catch(function(error){
          message.textContent='Something went wrong'
          message.classList.remove('alert-success')
          message.classList.add('alert-warning')
          message.style.display = 'block'
     })
}