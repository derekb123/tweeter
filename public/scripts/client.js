//Escape message input to reduce chances of content affecting app operation, used in createTweetElement
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



$(document).ready(function() {

//empties pre-existing tweets from container, renders and adds the new tweet @ top of list
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
      const $tweetRen = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetRen);
    }
  }

//composes tweet as template literal string in html format
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
      <p>${moment(tweet.created_at).fromNow()}</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </article>`);
  return $tweet;
}

//event listener and handler
let $form = $('.tweet-form');
$form.on('submit', (event) => {
  event.preventDefault();
  let $textLength = $('#tweet-text').val().length;

//error handling/ message input serialization and post
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

//get request loads JSON encoded data and calls renderTweets
const loadTweets = function (){
  $.getJSON('/tweets')
    .then((text) => {
      renderTweets(text);
    });
}

loadTweets();

});


