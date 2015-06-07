$(document).on('ready', start)

function start() {
// Router configuration
	var routerConfig = {
		routes: {
			"": 'login',
			'login': 'login',
			"1": "nav1",
			"2": "nav2",
			"3": "nav3",
			"4": "nav4",
			"actUsers": "nav5",
			"settings": "nav6",
			"actChat": "nav7",
			"recent": "nav8"
		},
		login: function() {
			$('.page').hide();
			$('#loginPage').show();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('#signOut').hide();
			$('.con').removeClass('active');
			if(user === '' || user === undefined) {
				$('#loginArea').show();
				$('#signOut').hide();
			} else {
				$('#loginArea').hide()
				$('#signOut').show();
			}
		},
		nav1: function() {
			$('.page').hide();
			$('#chatArea1').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch1').addClass('active');
		},
		nav2: function() {
			$('.page').hide();
			$('#chatArea2').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch2').addClass('active');
		},
		nav3: function() {
			$('.page').hide();
			$('#chatArea3').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch3').addClass('active');
		},
		nav4: function() {
			$('.page').hide();
			$('#chatArea4').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch4').addClass('active');
		},
		nav5: function() {
			dropdownClose();
			$('.page').hide();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			$('#actUsers').show();
		},
		nav6: function() {
			$('.page').hide();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			$('#settings').show();
		},
		nav7: function() {
			dropdownClose();
			$('.page').hide();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			$('#actChat').show();
		},
		nav8: function() {
			dropdownClose();
			$('.page').hide();
			$('#message').hide();
			$('#username').hide();
			$('.btn').hide();
			$('.con').removeClass('active');
			$('#recent').show();
		}
	}
//
// Router intialization
	var app = Backbone.Router.extend(routerConfig);
	var myRouter = new app();
	Backbone.history.start();
//
// Event Listeners
	$('.btn').on('click', messSub);
	$('#username').on('keyup', messSubPush);
	$('#message').on('keyup', messSubPush);

	$('#loginBox').on('keyup', signInPush);
	$('#signIn').click(signIn);

	$('#signOut').click(logOut);

	$('#leadDrop').click(dropdown);
	$('.leaderDrop').on('mouseleave', dropdownClose);
	$(".leaderDrop").click(dropdownClose);
//
// Variable Declarations
	var $message = $("#message");
	var user = '';
	var open = false;
//
// Initial message retrieval
	getMess();
//
// Log In/Out functions
	function signIn () {
		if($('#loginBox').val() !== '') {
			user = $('#loginBox').val();
			$('#loginBox').val('');
			$('#loginArea').hide();
			$('#signOut').show();
		}

	}

	function signInPush () {
		if(event.keyCode === 13) {
			if($('#loginBox').val() !== '') {
				user = $('#loginBox').val();
				$('#loginBox').val('');
				$('#loginArea').hide();
				$('#signOut').show();
			}
		}
	}

	function logOut() {
		$('.drop').hide();
		user = '';
		$('#loginArea').show();
		$('#signOut').hide();
	}
//
// Message post functions
	function messSub(e) {
		$('.drop').hide();
		if(user === '' || user === undefined) {
			window.location.hash = '#login';
		} else if($("#message").val() === '') {

			} else {
				myMessage = {
					name: user,
					message: $("#message").val(),
					badge: (window.location.hash).substring(1)
				}

				$.post(
					'https://morning-reef-8611.herokuapp.com/trainers',
					myMessage
				);
				$('#message').val('');
			}
	}
	function messSubPush(e) {
	if($("#message").val() === '') {

		} else if(event.keyCode === 13) {
			if(user === '' || user === undefined) {
			window.location.hash = '#login';
			} else {
					myMessage = {
						name: user,
						message: $("#message").val(),
						badge: (window.location.hash).substring(1)
					}

					$.post(
						'https://morning-reef-8611.herokuapp.com/trainers',
						myMessage
					);
					$('#message').val('');
				}
			}
	}
//
// Message get functions
	function getMess() {
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers',
			onMessagesReceived,
			'json'
		);
	}
	function onMessagesReceived(val) {
		if(window.location.hash === '#1' || window.location.hash === '#2' || window.location.hash === '#3' || window.location.hash === '#4') {
			$(window.location.hash).html('');
			for (var i = 0; i<val.length; i++) {
				if(window.location.hash === ('#'+val[i].badge)) {
					$(window.location.hash).append('<div>' + '<span class = "timestamp">' + timeFormat(val[i]) + '</span>' + '<span class = "comment">' + val[i].name + ': ' + val[i].message + '</span>' + '</div>')
					// $('.comment').emoticonize('animate');
				}
			}
		}
	}
	function timeFormat (time) {
		var s = time.created_at;
		s = s.slice(0, 16);
		s = s.slice(0, 10) + " " + s.slice(11,16) + " ";
		return s + " ";
	}
	setInterval(getMess, 500);
//
// Leaderboard get functions
	function getUser () {
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers/leaderboard',
			onUsersReceived,
			'json'
		);
	}
	function onUsersReceived (val) {
		$('#chatLeaders').html('')
		for(var i = 0; i<val.length; i++) {
			$('#chatLeaders').append(i+1+'. ' + val[i] + '<br>');
		}
	}
	function getCh () {
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers/leaderboard/boards',
			onChReceived,
			'json'
		);
	}
	function onChReceived (val) {
		$('#roomLeaders').html('')
		for(var i = 0; i<val.length; i++) {
			$('#roomLeaders').append(i+1+'. Chat Room ' + val[i] + '<br>');
		}
	}
	function getRec () {
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers/leaderboard/users',
			onRecReceived,
			'json'
		);
	}
	function onRecReceived (val) {
		$('#mostRecent').html('')
		for(var i = 0; i<val.length; i++) {
			$('#mostRecent').append(val[i] + '<br>');
		}
	}
	setInterval(getUser, 500);
	setInterval(getCh, 500);
	setInterval(getRec, 500);

//
//	Dropdown nav functions
	function dropdown () {
		if(open === false) {
			$('.leaderDrop').show();
			open = true;
		} else {
			dropdownClose();
		}
	}
	function dropdownClose () {
		$('.leaderDrop').hide();
		open = false;
	}
}