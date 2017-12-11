
var connectionsRef = database.ref("/connections")
var connectedRef = database.ref(".info/connected")
var authenticatedUserArray = []
var userKeyArray = []
var users

connectedRef.on('value', function(connect){

	if(connect.val()){
		var connectedUser = connectionsRef.push(true)

		console.log("Does it remove from the list?")
		connectedUser.onDisconnect().remove()
	}

})

connectionsRef.on('value', function(connect){

	$('#connectedUserCount').text("Currently " + connect.numChildren() + " customers are connected")
})






$(document).ready(function(){
	$('#logoutButton').on('click', function(){
		firebase.auth().signOut().then(function(){
			document.location.href = 'Login.html'
		}).catch(function (error) {

		})
	})


	firebase.auth().onAuthStateChanged(function(user){

		if(user){

			retrieveUserInfo(user.uid)
			retrieveDatabase(user.uid)

		} else {
			console.log("The user is not logged-in")
			document.location.href = "login.html"
		}
	})
})


function retrieveUserInfo(uid){
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			database.ref('/Authenticated Users/'+'users/').once('value', function(snap){
				var adminUserObj = snap.val()
				var username
				var userEmail
				console.log(adminUserObj)
				for(key in adminUserObj){
					console.log(key)
					if(key === uid){
						console.log("HI!")
						username = adminUserObj[key].name
						console.log(username)
						userEmail = adminUserObj[key].email
						console.log(userEmail)
					}
				}
				$('#titleUserName').text(username)
				$('#userNameNavBar').text(username)
				$('#userEmailNavBar').text(userEmail)

			})

		} else {
			document.location.href = 'login.html'
		}

	})



}


function retrieveDatabase(uid){
	var count = 0

	database.ref('/Authenticated Users/'+'users/').once('value', function(snap){

		users = snap.val()

		for(var key in users){
			if(users.hasOwnProperty(key)){
				authenticatedUserArray.push(key)
				//console.log(key)
			}
		}

		

		for(var i = 0; i < authenticatedUserArray.length; i++){
			if(authenticatedUserArray[count] === uid){
			
				var level = users[authenticatedUserArray[count]].class.level
				if(level === "high"){
					highLevelContents()
				} else if (level === "normal"){
					normalLevelContents()

				} else {
					lowLevelContents()

				}

			}
			count += 1


			/*database.ref('/Authenticated Users/'+'users/'+authenticatedUserArray[i]).once('value', function(snapshot){
				var levelObj = snapshot.val()
				var level = levelObj.class.level
				if(level === "high"){
					if()
					highLevelContents()
				} else if (level === "normal"){
					normalLevelContents()

				} else {
					lowLevelContents()

				}
			})
*/
		}


	})

}

var counter = 0

function highLevelContents() {
	database.ref('/users/').once('value', function(snap){

		users = snap.val()

		for(var key in users){
			if(users.hasOwnProperty(key)){
				userKeyArray.push(key)
				//console.log(key)
			}
		}

		for(var i = 0; i < userKeyArray.length; i++){

			database.ref('/users/'+userKeyArray[i]).once('value', function(snapshot){
				var userObj = snapshot.val()
				var username = userObj.username
				var userEmail = userObj.email
				var userPassword = userObj.password
				var howManyRides = 0
				var totalDistance = 0
				var totalDuration = 0


				if(snapshot.hasChild('rides')){
					var rides = snapshot.val().rides


					for(var eachRide in rides){
						howManyRides += 1
						totalDistance += rides[eachRide].data.distance
						totalDuration += rides[eachRide].data.duration
					}

				} else {

					howManyRides = 0
					totalDuration = 0
					totalDistance = 0

				}
				
				var duration = moment.duration(totalDuration, 'seconds')
				var formatted = duration.format('hh:mm:ss')



				$('#userInfo')
				.append($('<tr>')
					.append($('<td>').text(userKeyArray[counter]))
					.append($('<td>').text(username))
					.append($('<td>').text(userEmail))
					.append($('<td>').text(howManyRides))
					.append($('<td>').text(totalDistance.toFixed(2) + " Miles"))
					.append($('<td>').text(formatted + " Mins")))


				counter += 1
				console.log(totalDistance + ", " + totalDuration +", "+howManyRides)

			})

		}


	})


}


function normalLevelContents() {
	$('#userInfo')
	.append($('<tr>')
		.append($('<td>').text("Not allowed"))
		.append($('<td>').text("Not allowed"))
		.append($('<td>').text("Not allowed"))
		.append($('<td>').text("Not allowed"))
		.append($('<td>').text("Not allowed"))
		.append($('<td>').text("Not allowed")))

}


function lowLevelContents(){


}

