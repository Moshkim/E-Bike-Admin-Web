var config = {
  apiKey: "AIzaSyDc8eqvGtyDO9GL-IXBc5ZxBOgSHjdVCVQ",
  authDomain: "e-bike-app.firebaseapp.com",
  databaseURL: "https://e-bike-app.firebaseio.com",
  projectId: "e-bike-app",
  storageBucket: "e-bike-app.appspot.com",
  messagingSenderId: "894618975305"
}

firebase.initializeApp(config)


var database = firebase.database()
var storage = firebase.storage()

