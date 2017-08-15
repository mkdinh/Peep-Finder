$(window).on('load',function(){
  // on load, fade in survey
  setTimeout(function(){$('.survey-wrapper').fadeIn(600)
  },200)

  // initalize modal
  $('#match-modal').modal();
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
console.log(results.name)
  // check for valid input
  if($('#first_name').val().trim() === "" || $('#last_name').val().trim()=== ""){
    Materialize.toast('Give yourself a name!', 2000)
    return
  }

  if(results.photo.match(/\.(jpeg|jpg|gif|png)$/) === null){
    Materialize.toast('Make sure that the image link is valid!', 2000);
    return
  }

  for(i = 1; i <= 10; i++){
    // pushed selected choice into results object
    var choice = $('#q-'+i+" :selected").attr('value');
    results.scores.push(choice);

    // if value of selected is either 5 or 0 push into highlight
    if(choice === '4' || choice === '5'){
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

  // $.post(window.location.origin + "/api/friends",results, function(data){
  //   success(data)
  // })
    
})

function success(res){
  // Materialize.toast(message, displayLength, className, completeCallback);
  Materialize.toast('Matchmaking in progress!', 2000, handlePostReq(res)) // 4000 is the duration of the toast
}

function handlePostReq(response){
  // updating modal with matches
  $('#match-photo').attr('src',response.photo);
  $('#match-name').text(response.name);
  $('#match-highlights').text(response.highlights.join(', '))
  
  // show modal
  setTimeout(function(){
    $('#match-modal').modal('open')
  },2000);
}






  