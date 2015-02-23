jQuery(function () {
var $ = jQuery;

//experienced variables that can be changed 
var max_speed = 0.05,
	min_speed = 0.01,
	speed = max_speed,
	radius = 180,
	rotate_speed = 8,
	count = 0;

//other variables
	var dw = $(window).width();
	var dh = $(window).height();
	var $menu_item = $(".drag");
	var num_item = $menu_item.length;
	var item_h = $menu_item.first().height();
	var item_w = $menu_item.first().width();
	var $drop = $("#drop");
	var $outer = $("#drop > span");
	var $inner = $("#inner");
	$inner.css({
		"height": radius*2 + item_h + "px",
		"width": radius*2 + item_w + "px",
		//"border": "1px dashed grey"  //in case you wanna highlite spinnig area
	});
	var center_x = $inner.width()/2;
	var center_y = $inner.height()/2;

//main function
function rotate() {

	$menu_item.each(function() {
		var angle = count * (Math.PI/180);
		var new_x = center_x + Math.cos(angle)*radius - $(this).width()/2;
		var new_y = center_y + Math.sin(angle)*radius - $(this).height()/2;

		$(this).css("left", new_x + "px").css("top", new_y + "px");
		count += 360/num_item + speed;
	});
};


//===========MAIN LOOP=========================

setInterval(rotate, rotate_speed);//main loop

//replacing hover on spinning area
$(window).on("resize", function(e) {
	dw = $(window).width();
	dh = $(window).height();
});


//============CONDITION TO HOVER SPINNING AREA=================

$(document).on("mousemove", function (e) {
	if( e.pageX > dw/2 - radius - item_w/2 && // 
		e.pageX < dw/2 + radius + item_w/2 && 
		e.pageY > dh/2 - radius - item_h/2 && 
		e.pageY < dh/2 + radius + item_h/2) 
		{
		speed = min_speed
	}
	else {
		speed = max_speed
	}
});


//=============DRAG & DROP===================

$menu_item.draggable({
	connectToSortable: "#inner",
	revert: true,
	revertDuration: 3000,
	scroll: false,
	start: function(event, ui) {
		$(this).removeClass("drag");
		$menu_item = $(".drag");
		num_item = $menu_item.length;
	},
	stop: function(event, ui) {
		$(this).addClass("drag");
		$menu_item = $(".drag");
		num_item = $menu_item.length;
	}
});

$drop.droppable({
	drop: function(event, ui) {
		dropped (ui.draggable);
	}
});

//chosing THIS for dragging
$menu_item.on("click", function () {
	var $item = $(this);
});

function dropped ($item) {

	switch ($item.find("div").text()) {
		case "1": $outer.text ("One");
		break;

		case "2": $outer.text ("Two");
		break;

		case "3": $outer.text ("Three");
		break;

		case "4": $outer.text ("Four");
		break;

		case "5": $outer.text ("Five");
		break;

		case "6": $outer.text ("Six");
		break;

		default: $drop.text ("Fuck you very much!");
	}

	$item.remove();
	$menu_item = $(".drag");
	num_item = $menu_item.length;
};

});
