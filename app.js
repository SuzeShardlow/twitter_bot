// http://thinkful-workshops.slides.com/jasjitsingh85/deck-893ff61f-1fb8-4e15-a379-775dfdbcee77-7-14-84-124-151-184#/

var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var Twitter = new TwitterPackage(secret);

var query = 'uk';
Twitter.get('search/tweets', {q: query, count: 2, lang: 'en'}, function(error, tweets, response) {

  var tweetList = tweets['statuses'];
  console.log(tweetList);

  for (let i = 0; i < tweetList.length; i++) {
    if ('retweeted_status' in tweetList[i]) {
      console.log('skipping retweet');
      continue;
    }

    setTimeout(() => {

      var screenName = tweetList[i].user.screen_name;
      var message = '@' + screenName + ' Alot confused, a lot not understand feelings';
      var tweetId = tweetList[i].id_str;

      console.log(message);

      try {
        Twitter.post('statuses/update', {'status': message, 'in_reply_to_status_id': tweetId}, function(error, tweet, response){
          console.log('Tweet posted successfully!');
        });
      } catch(err) {
        console.log(err);
      }
    }, 5000);

  }
});
