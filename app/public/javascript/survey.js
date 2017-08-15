$(window).on('load',function(){
  // on load, fade in survey
  setTimeout(function(){$('.survey-wrapper').fadeIn(600)
},500)
})

// initialize materializecss
$('select').material_select();

// onclick sumbit post to send ajax call post to api/friends
$('#survey-submit').on('click',function(){

  var results = {
                  "name": $('#first_name').val().trim() + ' ' + $('#last_name').val().trim(),
                  "photo": $('#image_link').val().trim(),
                  "scores": [],
                  "highlights": []
                };
  
  for(i = 1; i <= 10; i++){
    // pushed selected choice into results object
    var choice = $('#q-'+i+" :selected").attr('value');
    results.scores.push(choice);

    // if value of selected is either 5 or 0 push into highlight
    if(choice === '3' || choice === '4' || choice === '5'){
      var attr = $('#ask-'+i).text();
      results.highlights.push(attr)
    }
  }
  
  results.scores = results.scores.map(Number);

  $.ajax({
          type: 'POST',
          url:  '/api/friends', 
          data: results,
          success: success,
          dataType: 'json'          
  })

})

function success(){
   // Materialize.toast(message, displayLength, className, completeCallback);
   Materialize.toast('Matchmaking in progress!', 4000) // 4000 is the duration of the toast
}






  