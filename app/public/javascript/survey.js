$(window).on('load',function(){
  // on load, fade in survey
  $('.survey-wrapper').fadeIn(600);
  
})

// initialize materializecss
$('select').material_select();

// onclick sumbit post to send ajax call post to api/friends
$('#survey-submit').on('click',function(){

  var results = {
                  "name": $('#first_name').val().trim() + ' ' + $('#last_name').val().trim(),
                  "photo": $('#image_link').val().trim(),
                  "scores":[$('#q-1 :selected').attr('value'), $('#q-2 :selected').attr('value'), $('#q-3 :selected').attr('value'), $('#q-4 :selected').attr('value'), $('#q-5 :selected').attr('value'),
                  $('#q-6 :selected').attr('value'), $('#q-7 :selected').attr('value'), $('#q-8 :selected').attr('value'), $('#q-9 :selected').attr('value'), $('#q-10 :selected').attr('value') ]
                }

  results.scores = results.scores.map(Number);
  console.log(results.scores);
  
  $.ajax({
          type: 'POST',
          url:  '/api/friends', 
          data: results,
          success: success,
          dataType: 'json'          
  })

})

function success(){
  
}






  