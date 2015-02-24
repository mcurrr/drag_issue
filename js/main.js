$(function() {


//experienced variables that can be changed 
var max_speed = 0.05,
	min_speed = 0.01,
	speed = max_speed,
	radius = 300,
	rotate_speed = 8,
	count = 0;

//other variables
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
		"border": "1px dashed grey"  //in case you wanna highlite spinnig area
	});
	var center_x = $inner.width()/2;
	var center_y = $inner.height()/2;

	var drop_h = parseInt($drop.css("height"));
	var drop_w = parseInt($drop.css("width"));
	$drop.css({"top": center_x - drop_h/2, "left": center_y - drop_w/2});

//main function
function rotate() {

	$menu_item.each(function() {
		var angle = count * (Math.PI/180);
		var new_x = center_x + Math.floor(Math.cos(angle)*radius) - $(this).width()/2;
		var new_y = center_y + Math.floor(Math.sin(angle)*radius) - $(this).height()/2;

		$(this).css("left", new_x + "px").css("top", new_y + "px");
		count += 360/num_item + speed;
	});
};

//===========MAIN LOOP=========================

setInterval(rotate, rotate_speed);//main loop

//============CONDITION TO HOVER SPINNING AREA=================

$(document).on("mouseenter", $inner.selector, function (event) {
	speed = min_speed;
	});
$(document).on("mouseleave", $inner.selector, function (event) {
	speed = max_speed;
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

		default: $drop.text ("Aliens are real!");
	}

	$item.remove();
	$menu_item = $(".drag");
	num_item = $menu_item.length;
};

});