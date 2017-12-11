
$(document).ready(function(){

	$('.message a').click(function(){
		$('form').animate({height: 'toggle', opacity: 'toggle'}, 'slow')
	})

	var userName
	var email
	var password

	$('#createButton').on('click', function(){

		userName = $('#userNameForSignup').val().trim()


		email = $('#emailAddressForSignup').val().trim()


		password = $('#passwordForSignup').val().trim()


		if(email && password){

			firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
				firebase.auth().onAuthStateChanged(function(user){

					var extentionOfEmail = email.split('@')
					if(extentionOfEmail[1] === 'dtiholdings.com'){
						if(user) {
							database.ref('/Authenticated Users/'+'users/'+user.uid).set({
								name: userName,
								email: email,
								password: password,
								uid: user.uid,
								class:{
									level:'high'
								}
							})

							document.location.href = "index.html"

						} else {
							console.log("can not grab the user")
						}

					} else {
						if(user) {
							database.ref('/Authenticated Users/'+'users/'+user.uid).set({
								name: userName,
								email: email,
								password: password,
								uid: user.uid,
								class:{
									level:'normal'
								}

							})

							document.location.href = "index.html"

						} else {
							console.log("can not grab the user")
						}


					}

					

				})
			}).catch(function(error) {

				var errorCode = error.code
				var errorMessage = error.message

				console.log(errorCode + " " + errorMessage)

			})

		} else {
			$('#userNameForSignup').val() = " "
			$('#emailAddressForSignup').val() = " "
			$('#passwordForSignup').val() = " "

		}

	})


	$('#loginButton').on('click', function(event){

		event.preventDefault()

		email = $('#emailForLogin').val()

		password = $('#passwordForLogin').val()


		firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){


			if(user){
				//console.log("success : " + user.val().name)
				document.location.href = "index.html"

			} else {
				console.log("no such user")
			}
		}).catch(function(error) {
			console.log(error)
		})

	})


})



