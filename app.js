var diffErrors = 0;
var generateCSS = '';
function renderDiffs() {
            $('#spot1, #spot2').append('<span class="dcount diff no1" data-number="no1"></span>');
            $('#spot1, #spot2').append('<span class="dcount diff no2" data-number="no2"></span>');
            $('#spot1, #spot2').append('<span class="dcount diff no3" data-number="no3"></span>');
            $('#spot1, #spot2').append('<span class="dcount diff no4" data-number="no4"></span>');
        }
function findDiffs() {
    $('#spot1, #spot2').click(function(event) {
        
        console.log(event.target.nodeName, ' on ', $(this).attr('id') ,' was clicked');
        if (event.target.nodeName == 'SPAN') {
            console.log('event.target', $(event.target).data('number'));
            var diffNoClicked = $(event.target).data('number');
            $('span.'+ diffNoClicked).css('background-color', 'rgba(256, 0, 0, 0.5');
            $('span.'+ diffNoClicked).removeClass('dcount');
            diffCounter();
            $('#score').prepend('✓');
        }
        else if (event.target.nodeName == 'IMG') {
            diffErrors++;
            console.log('Errors made: ', diffErrors);
            $('#score').prepend('×');
        }
        
    });
}
function mouseCoordinates() {
    $( "div#spot1, div#spot2" ).mousemove(function( event ) {
        console.log(this);
      $(this).children('.mirror').hide();
      $(this).siblings('div').children('.mirror').show();
      var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
      var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
      
        // Not yet used, get offset of element instead of page (might be needed if we change layout)
        var offset1 = $("#spot1").offset();
        var diffLeft1 = event.pageX - offset1.left;
        var diffTop1 = event.pageY - offset1.top;
        
        var offset2 = $("#spot2").offset();
        var diffLeft2 = event.pageX - offset2.left;
        var diffTop2 = event.pageY - offset2.top;
        
        console.log('difflefttop1', diffLeft1, diffTop1, 'difflefttop2', diffLeft2, diffTop2);
        // Not yet used, get offset of element instead of page (might be needed if we change layout)
      
      $( "span.coordinates" ).text( "( event.pageX, event.pageY ) : " + pageCoords );
      $( "span.coordinates2" ).text( "( event.clientX, event.clientY ) : " + clientCoords );
      if ($(this).is('#spot1')) {
      $(this).siblings('div').children('.mirror').css({
            'left': diffLeft1 + 'px',
            'top': diffTop1 + 'px'
        });
      }
      else {
        $(this).siblings('div').children('.mirror').css({
            'left': diffLeft2 + 'px',
            'top': diffTop2 + 'px'
        });
      
      }
    });
}
function diffCounter() {
    var diffCount = $('#spot1 .dcount').length;
    console.log('Differences Count: ', diffCount);
    if (diffCount == 0) {
        $('body').append('<div class="gratz"><p>Congratulations!<br>You found all the differences with ' + diffErrors + ' errors.</p><div class="close">OK</div></div>')
    }
}
function clearResult() {
    console.log('wtf');
    
    $(document).on('click', '.close', function() {
        $('.gratz').remove();
    });
}

// Countdown timer
var mins_count=2;
var secs_count=0;
var count = (mins_count * 60) + secs_count;
var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

function timer()
{
  count=count-1;
  if (count < 0)
  {
     clearInterval(counter);
     //counter ended, do something here
     alert("Time is Out");
     
     return;
  }
    r_mins = Math.floor(count / 60);
    r_secs = count % 60;
    var f_mins = (r_mins < 10) ? ("0" + r_mins) : r_mins;
    var f_secs = (r_secs < 10) ? ("0" + r_secs) : r_secs;
  //Do code for showing the number of seconds here
  //document.getElementById("timer").innerHTML=count + " secs"; // watch for spelling
  document.getElementById("timer").innerHTML= f_mins + ":" + f_secs; // watch for spelling
} // End of Countdown timer

function getRandomInt(min, max) {
    min = 0;
    max = json.diff.length;
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
} // Get a random number that represents the images that will be loaded
        
function loadImages(i) {
    console.log('i', i);
    $('#spot1 img').attr('src', json.diff[i].a_src);
    $('#spot2 img').attr('src', json.diff[i].b_src);
} // Load images for a new round

function generateCss(i) { 
    for (j=0; j<4; j++) {
        generateCSS += '.diff.no' + (j+1) + ' {left: ' + json.diff[0].css[j].left + 'px; top: ' + json.diff[1].css[j].top + 'px;';
        if (json.diff[i].css[j].clip_path != undefined) {
            generateCSS += '-webkit-clip-path: ' + json.diff[0].css[j].clip_path + ';'
            generateCSS += 'clip-path: ' + json.diff[0].css[j].clip_path + ';'
        }
        if (json.diff[i].css[j].width != undefined) {
            generateCSS += 'width: ' + json.diff[0].css[j].width + 'px;'
        }
        if (json.diff[i].css[j].height != undefined) {
            generateCSS += 'height: ' + json.diff[0].css[j].height + 'px;'
        }
        generateCSS += '}';
    }
} // Create coordinates of the image differences using inline CSS

function renderCSS() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = generateCSS;
    document.getElementsByTagName('head')[0].appendChild(style);
}    // Render the coordinates CSS

function startGame () {
    imageHistory = []; // Reset history of images loaded in previous session
    score = 0;
    newRound();
}

function newRound () {
    while (imageHasLoaded(randomImg) == true) {
        var randomImg = getRandomInt();
        console.log('randomImg', randomImg);
    }
}
function endRound() {
    if (roundNumber == gameRounds) {
        endGame();
    }
}
function endGame() {
    
}
function imageHasLoaded (randomImg) {
    
    for (j=0; j<imageHistory.length; j++) {
        if (randomImg === imageHistory[j]) {
            return true;
        }
    }
    
}

var json = {
    "diff": [
        {
            "id":"1",
            "a_src":"diafores1.jpg",
            "b_src":"diafores2.jpg",
            "css":  [
                {
                "left":"332",
                "top":"391", 
                "clip_path":"polygon(13% 3%, 93% 36%, 92% 89%, 11% 30%)",
                "width":"65",
                "height":"36"
                },
                {
                "left":"473",
                "top":"174"
                },
                {
                "left":"49",
                "top":"371"
                },
                {
                "left":"332",
                "top":"533"
                }
            ]
        },
        {
            "id":"2",
            "a_src":"./img/spot-the-difference-002a.jpg",
            "b_src":"./img/spot-the-difference-002b.jpg",
            "css": [
                {
                "left":"332",
                "top":"391", 
                "clip_path":"polygon(13% 3%, 93% 36%, 92% 89%, 11% 30%)",
                "width":"65",
                "height":"36"
                },
                {
                "left":"473",
                "top":"174"
                },
                {
                "left":"49",
                "top":"371", 
                "clip_path":"polygon(13% 3%, 93% 36%, 92% 89%, 11% 30%)",
                "width":"65",
                "height":"36"
                },
                {
                "left":"332",
                "top":"533", 
                "clip_path":"polygon(13% 3%, 93% 36%, 92% 89%, 11% 30%)",
                "width":"65",
                "height":"36"
                }
            ]
        }
    ]
};
    
jQuery(document).ready(function () {
    
        renderDiffs();
        findDiffs();
        mouseCoordinates();
        diffCounter();
        clearResult();
        
        var i = getRandomInt();
        
        console.log('json.diff.length', json.diff.length, i);
        
        
        generateCss(i);
        loadImages(i);
        renderCSS();
        console.log('generateCSS', generateCSS);
        
    }
);