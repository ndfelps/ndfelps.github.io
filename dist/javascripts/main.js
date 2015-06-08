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
			// $('.comment').emoticonize();
		},
		nav2: function() {
			$('.page').hide();
			$('#chatArea2').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch2').addClass('active');
			// $('.comment').emoticonize();
		},
		nav3: function() {
			$('.page').hide();
			$('#chatArea3').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch3').addClass('active');
			// $('.comment').emoticonize();
		},
		nav4: function() {
			$('.page').hide();
			$('#chatArea4').show();
			$('#message').show();
			$('#username').show();
			$('.btn').show();
			$('.con').removeClass('active');
			$('#ch4').addClass('active');
			// $('.comment').emoticonize();
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
				setInterval(chatBot2(myMessage.message), 1000);
				$('#message').val('');
			}
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
				setInterval(chatBot2(myMessage.message), 1000);
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
					$(window.location.hash).append('<div>' + '<span class = "timestamp">' + timeFormat(val[i]) + '</span>' + '<span class = "comment">' + val[i].name + ': ' + val[i].message + '</span>' + '</div>');
					$('.comment').emoticonize();
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
		console.log(1);
		$.get(
			'https://morning-reef-8611.herokuapp.com/trainers/leaderboard',
			onUsersReceived,
			'json'
		);
	}
	function onUsersReceived (val) {
		console.log(2);
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
//
// Emote implementization
	function em () {
		$('.comment').emoticonize();
	}
//
// Chat Bot
	var responses = {
		res1: "You're tacky and I hate you.",
		res2: "Absolutely not.",
		res3: "Shove off.",
	}

	function chatBot (val) {
		if (val === "help" || val === "pls help" || val === " please help" || val === "Can anyone help?" || val === "help" || val === "please help?" || val === "help?") {
			return responses.res2;
		} else if (val === "I need help" || val === "Will someone talk to me?") {
			return responses.res3;
		} else if (val === "amirite" || val === "amirite?") {
			return response.res1;
		} else {
			return undefined;
		}
	}

	function chatBot2 (mess) {
		if (chatBot(mess) !== undefined) {
			botMess = {
				name: 'HelpBot',
				message: chatBot(mess),
				badge: (window.location.hash).substring(1)
			}
			$.post(
				'https://morning-reef-8611.herokuapp.com/trainers',
				botMess
			);
		}
	}

















//
// Open source emoticon plugin from http://os.alfajango.com/css-emoticons/
	(function($) {
  $.fn.emoticonize = function(options) {

    var opts = $.extend({}, $.fn.emoticonize.defaults, options);
    
    var escapeCharacters = [ ")", "(", "*", "[", "]", "{", "}", "|", "^", "<", ">", "\\", "?", "+", "=", "." ];
    
    var threeCharacterEmoticons = [
        // really weird bug if you have :{ and then have :{) in the same container anywhere *after* :{ then :{ doesn't get matched, e.g. :] :{ :) :{) :) :-) will match everything except :{
        //  But if you take out the :{) or even just move :{ to the right of :{) then everything works fine. This has something to do with the preMatch string below I think, because
        //  it'll work again if you set preMatch equal to '()'
        //  So for now, we'll just remove :{) from the emoticons, because who actually uses this mustache man anyway?
      // ":{)",
      ":-)", ":o)", ":c)", ":^)", ":-D", ":-(", ":-9", ";-)", ":-P", ":-p", ":-Þ", ":-b", ":-O", ":-/", ":-X", ":-#", ":'(", "B-)", "8-)", ";*(", ":-*", ":-\\",
      "?-)", // <== This is my own invention, it's a smiling pirate (with an eye-patch)!
      // and the twoCharacterEmoticons from below, but with a space inserted
      ": )", ": ]", "= ]", "= )", "8 )", ": }", ": D", "8 D", "X D", "x D", "= D", ": (", ": [", ": {", "= (", "; )", "; ]", "; D", ": P", ": p", "= P", "= p", ": b", ": Þ", ": O", "8 O", ": /", "= /", ": S", ": #", ": X", "B )", ": |", ": \\", "= \\", ": *", ": &gt;", ": &lt;"//, "* )"
    ];
    
    var twoCharacterEmoticons = [ // separate these out so that we can add a letter-spacing between the characters for better proportions
      ":)", ":]", "=]", "=)", "8)", ":}", ":D", ":(", ":[", ":{", "=(", ";)", ";]", ";D", ":P", ":p", "=P", "=p", ":b", ":Þ", ":O", ":/", "=/", ":S", ":#", ":X", "B)", ":|", ":\\", "=\\", ":*", ":&gt;", ":&lt;"//, "*)"
    ];
    
    var specialEmoticons = { // emoticons to be treated with a special class, hash specifies the additional class to add, along with standard css-emoticon class
      "&gt;:)": { cssClass: "red-emoticon small-emoticon spaced-emoticon" },
      "&gt;;)": { cssClass: "red-emoticon small-emoticon spaced-emoticon"},
      "&gt;:(": { cssClass: "red-emoticon small-emoticon spaced-emoticon" },
      "&gt;: )": { cssClass: "red-emoticon small-emoticon" },
      "&gt;; )": { cssClass: "red-emoticon small-emoticon"},
      "&gt;: (": { cssClass: "red-emoticon small-emoticon" },
      ";(":     { cssClass: "red-emoticon spaced-emoticon" },
      "&lt;3":  { cssClass: "pink-emoticon counter-rotated" },
      "O_O":    { cssClass: "no-rotate" },
      "o_o":    { cssClass: "no-rotate" },
      "0_o":    { cssClass: "no-rotate" },
      "O_o":    { cssClass: "no-rotate" },
      "T_T":    { cssClass: "no-rotate" },
      "^_^":    { cssClass: "no-rotate" },
      "O:)":    { cssClass: "small-emoticon spaced-emoticon" },
      "O: )":   { cssClass: "small-emoticon" },
      "8D":     { cssClass: "small-emoticon spaced-emoticon" },
      "XD":     { cssClass: "small-emoticon spaced-emoticon" },
      "xD":     { cssClass: "small-emoticon spaced-emoticon" },
      "=D":     { cssClass: "small-emoticon spaced-emoticon" },
      "8O":     { cssClass: "small-emoticon spaced-emoticon" },
      "[+=..]":  { cssClass: "no-rotate nintendo-controller" }
      //"OwO":  { cssClass: "no-rotate" }, // these emoticons overflow and look weird even if they're made even smaller, could probably fix this with some more css trickery
      //"O-O":  { cssClass: "no-rotate" },
      //"O=)":    { cssClass: "small-emoticon" } 
    }
    
    var specialRegex = new RegExp( '(\\' + escapeCharacters.join('|\\') + ')', 'g' );
    // One of these characters must be present before the matched emoticon, or the matched emoticon must be the first character in the container HTML
    //  This is to ensure that the characters in the middle of HTML properties or URLs are not matched as emoticons
    //  Below matches ^ (first character in container HTML), \s (whitespace like space or tab), or \0 (NULL character)
    // (<\\S+.*>) matches <\\S+.*> (matches an HTML tag like <span> or <div>), but haven't quite gotten it working yet, need to push this fix now
    var preMatch = '(^|[\\s\\0])';
    
    for ( var i=threeCharacterEmoticons.length-1; i>=0; --i ){
      threeCharacterEmoticons[i] = threeCharacterEmoticons[i].replace(specialRegex,'\\$1');
      threeCharacterEmoticons[i] = new RegExp( preMatch+'(' + threeCharacterEmoticons[i] + ')', 'g' );
    }
    
    for ( var i=twoCharacterEmoticons.length-1; i>=0; --i ){
      twoCharacterEmoticons[i] = twoCharacterEmoticons[i].replace(specialRegex,'\\$1');
      twoCharacterEmoticons[i] = new RegExp( preMatch+'(' + twoCharacterEmoticons[i] + ')', 'g' );
    }
    
    for ( var emoticon in specialEmoticons ){
      specialEmoticons[emoticon].regexp = emoticon.replace(specialRegex,'\\$1');
      specialEmoticons[emoticon].regexp = new RegExp( preMatch+'(' + specialEmoticons[emoticon].regexp + ')', 'g' );
    }
    
    var exclude = 'span.css-emoticon';
    if(opts.exclude){ exclude += ','+opts.exclude; }
    var excludeArray = exclude.split(',')

    return this.not(exclude).each(function() {
      var container = $(this);
      var cssClass = 'css-emoticon'
      if(opts.animate){ cssClass += ' un-transformed-emoticon animated-emoticon'; }
      
      for( var emoticon in specialEmoticons ){
        specialCssClass = cssClass + " " + specialEmoticons[emoticon].cssClass;
        container.html(container.html().replace(specialEmoticons[emoticon].regexp,"$1<span class='" + specialCssClass + "'>$2</span>"));
      }
      $(threeCharacterEmoticons).each(function(){
        container.html(container.html().replace(this,"$1<span class='" + cssClass + "'>$2</span>"));
      });                                                          
      $(twoCharacterEmoticons).each(function(){                    
        container.html(container.html().replace(this,"$1<span class='" + cssClass + " spaced-emoticon'>$2</span>"));
      });
      // fix emoticons that got matched more then once (where one emoticon is a subset of another emoticon), and thus got nested spans
      $.each(excludeArray,function(index,item){
        container.find($.trim(item)+" span.css-emoticon").each(function(){
          $(this).replaceWith($(this).text());
        });
      });
      if(opts.animate){
        setTimeout(function(){$('.un-transformed-emoticon').removeClass('un-transformed-emoticon');}, opts.delay);
      }
    });
  }
  
  $.fn.unemoticonize = function(options) {
    var opts = $.extend({}, $.fn.emoticonize.defaults, options);
    return this.each(function() {
      var container = $(this);
      container.find('span.css-emoticon').each(function(){
        // add delay equal to animate speed if animate is not false
        var span = $(this);
        if(opts.animate){
          span.addClass('un-transformed-emoticon');
          setTimeout(function(){span.replaceWith(span.text());}, opts.delay); 
        }else{
          span.replaceWith(span.text());
        }
      });
    });
  }

  $.fn.emoticonize.defaults = {animate: false, delay: 500, exclude: 'pre,code,.no-emoticons'}
})(jQuery);
}