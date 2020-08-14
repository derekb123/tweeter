const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweetRen = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetRen);
    }
  }

const createTweetElement = function(tweet) {
  const $tweet = $(`<article class = "tweet">
    <div class='tweet-header'> 
      <div> 
        <img class="avatarSm" src= ${tweet.user.avatars}>
        <h3>${tweet.user.name}</h3>
      </div>
      <p class="handle">${tweet.user.handle}</p>
    </div>
    <p class="tweet-content">${escape(tweet.content.text)}</p>
    <div class='tweet-footer'> 
      <p>${moment().startOf('hour').fromNow()}</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </article>`);
  return $tweet;
}

// renderTweets(data);

let $form = $('.tweet-form');
$form.on('submit', (event) => {
  event.preventDefault();
  let $textLength = $('#tweet-text').val().length;

  if ($textLength === 0) {
    $('.error-message').html('Tweets cannot be empty!')
    $('.error-message').show();
    $('.error-message').fadeOut(2000);
  } else if ($textLength > 140) {
    $('.error-message').html('You have surpassed the tweet text limit!')
    $('.error-message').show();
    $('.error-message').fadeOut(2000);
  } else {
    const serialized = $($form).serialize();
    $('.error-message').fadeOut(500);
    $('#tweet-text').val('');
    $('.counter').val(140);

    $.post('/tweets', serialized)
      .then((text) => {
        loadTweets(text);
      });
  }
});

const loadTweets = function (){
  $.getJSON('/tweets')
    .then((text) => {
      renderTweets(text);
    });
}

loadTweets();

});


