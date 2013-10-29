$(document).ready(function () {
	
	// *******************************
	// global functions
	// *******************************
	
	// login button -- currently just hides login content and shows logged-in content
	$('#login-box .login-submit').click(function(e) {
		e.preventDefault();
		$('#login-box').toggle();
		$('#user-box').toggle();
	});
	
	// Show "fake" password field to display the text "Password" on screen
	// When the fake password field recieves focus, pass focus to the real password field
	$('#login-password-fake').show();
	$('#login-password').hide();
	$('#login-password-fake').focus(function() {
	    $('#login-password-fake').hide();
	    $('#login-password').show();
	    $('#login-password').focus();
	});
	$('#login-password').blur(function() {
	    if($('#login-password').val() == '') {
	        $('#login-password-fake').show();
	        $('#login-password').hide();
	    }
	});
	
	// Display default text within input fields such as "Search", "Username", and "Password"
	// Default text in "rel" field is removed on focus, and restored if field is left empty after losing focus
	$("input").on("blur", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == ""){ $(this).val(default_value); }
    }).on("focus", function(){
            var default_value = $(this).attr("rel");
            if ($(this).val() == default_value){ $(this).val(""); }
    });
	
	
	// Navigation and edRover Menu button
	$('.main-menu a').click(function(e) {
	    e.preventDefault();
	    edRoverMenu(); // call to custom function
	});
	
	// Display the Category + edRover overlay menu
	function edRoverMenu() {
		if(!$('#nav-menu').is(":visible")) {
			$('#nav-menu').slideDown("fast",function(){  //show the menu
				if ($('#contents-centered').height() < $('#nav-menu').height()+25) { // check to make sure we don't make the page SMALLER!
					$('#contents-centered').height($('#nav-menu').height()+25); // adjust the height of the page (reason: absolute positioning)
				}
				if ($('#contents-full').height() < $('#nav-menu').height()+25) { // check to make sure we don't make the page SMALLER!
					$('#contents-full').height($('#nav-menu').height()+25); // adjust the height of the page (reason: absolute positioning)
				}
			});
		} else {
			$('#nav-menu').slideUp("fast"); // hide the menu
			$('#contents-centered').css('height','auto'); // restore height of page to default value
			$('#contents-full').css('height','auto'); // restore height of page to default value
		}
	}
	
	// sign-up functions
	$('#sign-up-panel .selectable-male-female').click(function(e) {
	    e.preventDefault();
		if ($("#sign-up-panel input[name='male-female'][value='male']").is(':checked')) {
			$("#sign-up-panel input[name='male-female'][value='female']").prop("checked", true);
			$('#sign-up-panel .selectable-male-female').html("Ms.");
		} else {
			$("#sign-up-panel input[name='male-female'][value='male']").prop("checked", true);
			$('#sign-up-panel .selectable-male-female').html("Mr.");
		}
	});
	// terms checkbox replacement
	$('.checkbox-styled').each(function(){
		$(this).hide().after('<div class="checkbox-replacement" />'); // hide normal checkbox
	});
	$('.checkbox-replacement').on('click',function(){
		$(this).toggleClass('checked').prev().prop('checked',$(this).is('.checked')) // check the hidden box and the custom box simulatenously
	});
	$('.form-terms-text').on('click',function(){
		$('.checkbox-replacement').click();
	});
	
	
	
	// *******************************
	// search location page functions
	// *******************************
	
	$('#search-location-panel .form-male').click(function(e) {
	    e.preventDefault();
		if ($("#search-location-panel input[name='male-female'][value='female']").is(':checked')) {
			$("#search-location-panel input[name='male-female'][value='male']").prop("checked", true);
			$(this).toggleClass("checked");
			$('#search-location-panel .form-female').toggleClass("checked");
		}
	});
	$('#search-location-panel .form-female').click(function(e) {
	    e.preventDefault();
		if ($("#search-location-panel input[name='male-female'][value='male']").is(':checked')) {
			$("#search-location-panel input[name='male-female'][value='female']").prop("checked", true);
			$(this).toggleClass("checked");
			$('#search-location-panel .form-male').toggleClass("checked");
		}
	});
	
	// call for custom styled dropdown
	createDropDown();
    $(".interest-dropdown dt a").click(function() {
        $(".interest-dropdown dd ul").toggle();
    });
    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("interest-dropdown"))
            $(".interest-dropdown dd ul").hide();
    });        
    $(".interest-dropdown dd ul li a").click(function() {
        var text = $(this).html();
        $(".interest-dropdown dt a").html(text);
        $(".interest-dropdown dd ul").hide();
        
        var source = $("#source");
        source.val($(this).find("span.value").html())
    });
	
});

// custom styled dropdown example
function createDropDown(){
    var source = $("#source");
    var selected = source.find("option[selected]");
    var options = $("option", source);
    
    $("#form-interest").append('<dl id="target" class="interest-dropdown"></dl>')
    $("#target").append('<dt><a href="#" onclick="return false">' + selected.text() + 
        '<span class="value">' + selected.val() + 
        '</span></a></dt>')
    $("#target").append('<dd><ul></ul></dd>')

    options.each(function(){
        $("#target dd ul").append('<li><a href="#" onclick="return false">' + 
            $(this).text() + '<span class="value">' + 
            $(this).val() + '</span></a></li>');
    });
}