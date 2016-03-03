$( document ).ready(function() {
  console.log('testview page ready');
  $('#testEndRequest').hide();
  $('#startTestButton').hide();
  $('iframe').hide();

  var mouseTracking = {};
  var realUrl;
  var iframePrepared = false;

  $('#startTestButton').on('click', function (){
    $('#testStartPrompt').hide();
    $('iframe').show();
  });

  $('#testEndNoButton').on('click', function (){
    $('#testEndRequest').hide();
    $('iframe').show();
  });

  $('#testEndYesButton').on('click', function (){
    console.log('sending mousetracking info');
    $.post({
      url: '/mousetracking',
      data: {mouseTracking: mouseTracking},
      success: function () {
        console.log('mousetracking info successfully posted');
      }
    });
  });


  // get the real url address to get screenshot
  $.get({
    url: '/realUrl',
    success: function (data) { realUrl = data }
  });

  // if detailConfig is 0 or 1, every pixel movement is tracked. if set to five, it tracks every five pixel movement. Use it to configure the trade-off between memory size and granularity of the mouse movement tracking.
  var detailConfig = 1;
  // mountCount simply works with detailConfig to achieve above.
  var mouseCount = 0;

  $('iframe').load(function(){
    // new page has loaded -- resetting the url and reference time
    console.log('iframe content loaded')
    if (!iframePrepared) {
      $('#startTestButton').show();
      $('#testviewLoading').hide();
    }
    // get current URL
    var url = realUrl + this.contentWindow.location.href.slice(21);
    var documentWidth = $('iframe').contents().find("body").width();
    var documentHeight = $('iframe').contents().find("body").height();

    // track how many times this particular page has been visited
    var visitCount = 0;
    if (mouseTracking[url]) {
      visitCount ++;
    } else {
      mouseTracking[url] = {};
    }

    // send screenshot to the server for review and comments
    $.post({
      url: '/screenshot',
      data: {url: url,
             resolution: [documentWidth, documentHeight]
            },
      success: function () {console.log('screenshot saved for review');}
    });

    // use the time of the onload event as the reference time
    var refTime = Date.now();
    console.log('current url: ', url);
    console.log('visit count: ', visitCount);

  $(this).contents().find("body").on('mousemove', function(event) {
    var x = event.pageX;
    var y = event.pageY;
    // timestamp is calculated by deducting the reference time from the current time
    var timestamp = Date.now() - refTime;
    mouseCount++;
    if(mouseCount % detailConfig === 0){

      if (!mouseTracking[url][visitCount]) {
        mouseTracking[url][visitCount] = [];
      }

      mouseTracking[url][visitCount].push({
        x: x,
        y: y,
        timestamp: timestamp,
        type: "move"
      });

      console.log(mouseTracking);
    }
  });

  $(this).contents().find("body").on('click', function(event) {
    var x = event.pageX;
    var y = event.pageY;
    // timestamp is calculated by deducting the reference time from the current time
    var timestamp = Date.now() - refTime;

    if (!mouseTracking[url][visitCount]) {
        mouseTracking[url][visitCount] = [];
    }

    mouseTracking[url][visitCount].push({
      x: x,
      y: y,
      timestamp: timestamp,
      type: "click"
    });

    console.log(mouseTracking);
  });

  $(document).keypress('d', function (event) {
    console.log('test end request');
    $('iframe').hide();
    $('#testEndRequest').show();
  });

  $('iframe').contents().find("body").keypress('d', function (event) {
    console.log('test end request');
    $('iframe').hide();
    $('#testEndRequest').show();
  });
});

});