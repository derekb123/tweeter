$(document).ready(function() {

  $("#tweet-text").on('input', function() {
    let textLength = $(this).val().length;
    let counter = $(this).parents('form').find('.counter');
    $(counter).val(140 - textLength);

    if ($(counter).val() < 0) {
      $(counter).addClass('negative-counter');
    }
    else {
      $(counter).removeClass('negative-counter');
    }
  });

});

