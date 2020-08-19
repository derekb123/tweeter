$(document).ready(function() {

//keeps track of text count and updates counter number
  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length;
    let counter = $(this).parents('form').find('.counter');
    $(counter).val(140 - textLength);

//dynamically change css class for visual alert if counter goes below zero
    if ($(counter).val() < 0) {
      $(counter).addClass('negative-counter');
    }
    else {
      $(counter).removeClass('negative-counter');
    }
  });

});

