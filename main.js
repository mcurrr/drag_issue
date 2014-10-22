jQuery(function () {
var $ = jQuery;

var max_speed = 0.05,
	min_speed = 0.01,
	speed = max_speed,
	radius = 200,
	count = 0;

	var $menu_item = $(".drag");
	var num_item = $menu_item.length;
	var item_h = $menu_item.first().height();
	var item_w = $menu_item.first().width();
	var $list = $("#list_item");
	var $inner = $("#inner");
	$inner.css({
		"height": radius*2 + item_h + "px",
		"width": radius*2 + item_w + "px",
	});
		var center_x = $inner.width()/2;
		var center_y = $inner.height()/2;

function rotate() {


	$menu_item.each(function() {
		var angle = count * (Math.PI/180);
		var new_x = center_x + Math.cos(angle)*radius - $(this).width()/2;
		var new_y = center_y + Math.sin(angle)*radius - $(this).height()/2;

		$(this).css("left", new_x + "px").css("top", new_y + "px");

		count += 360/num_item + speed;
	});
};

setInterval(rotate, 3000/360);

$(document).on("mousemove", function(e) {
	var dw = $(document).width();
	var dh = $(document).height();

	if(e.pageX > dw/2 - radius - item_w/2 && e.pageX < dw/2 + radius + item_w/2 && e.pageY > dh/2 - radius - item_h/2 && e.pageY < dh/2 + radius + item_h/2) {
		speed = min_speed
	}
	else {
		speed = max_speed
	}
});

$menu_item.draggable({
	connectToSortable: "#inner",
	revert: true,
	revertDuration: 3000,
	scroll: false,
	cursor: "move",
	start: function() {
		$(this).removeClass("drag");
		$menu_item = $(".drag");
		num_item = $menu_item.length;
		speed -= 0.01;
		console.log(speed);
	},
	stop: function() {
		$(this).addClass("drag");
		$menu_item = $(".drag");
		num_item = $menu_item.length;
		console.log(speed);
	}
});

$inner.sortable();
// $inner.droppable({
// 	drop: function() {
// 		$(this).addClass("drag");
// 		$menu_item = $(".drag");
// 		num_item = $menu_item.length;
// 		speed += 0.01;
// 		console.log(speed);
// 	}
// });

});