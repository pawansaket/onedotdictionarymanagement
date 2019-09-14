// Javascript functionality to make the button active and deactive
import $ from "jquery";
$(document).ready(function() {
  $(".li-class").on("click", function(e) {
    console.log("HOALLA");
    $(".li-class").removeClass("li-active");
    $(this).addClass("li-active");
  });

  $(".dark-li-class").on("click", function(e) {
    $(".dark-li-class").removeClass("li-active");
    $(this).addClass("li-active");
  });
});
