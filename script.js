'use strict';

function getDogImages(quantity, breed) {
	let url = `https://dog.ceo/api/breed/${breed}/images/random/${quantity}`;

//  it won't do the CATCH if breed not found error code 404 without no-cors
// see https://stackoverflow.com/questions/48865254/fetch-rejects-promise-on-404-responses-instead-of-resolving-with-404-status

// another option is to do:
// fetch(url, {mode: 'no-cors'})

  fetch(url)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => $('.error').html('<h2>Something went wrong. Try again later.</h2>'));
}

function formatImages(imageArray) {
	let output = '<h2>Look at this dog!</h2>';
	for (let i = 0; i < imageArray.length; i++){
		output += `<img src="${imageArray[i]}" class="results-img">`;
	};
	
	return output;
}

function displayResults(responseJson) {
  console.log(responseJson);
  //replace the existing image placeholder div contents
  
  // alert('status = ' + responseJson.status  );
  // alert('code = ' + responseJson.code  );
  // alert('message = ' + responseJson.message  );
  
  if(responseJson.status !== 'success'){
  	$('.error').html(`<h2>${responseJson.message}. Try again.</h2>`);
  	$('.results-img').html('');
  	
  } else {
  
   // response.message is an array of images
   // use a function to loop thru this array and create a list of images
   let imageArray = responseJson.message;
   $('.results-img').html(formatImages(imageArray));
   
  	$('.error').html('');
  
   //display the results section
   $('.results').removeClass('hidden');
  
  }
  
  
}


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    
    // re-using code from previous exercise so manually setting quantity value
    let quantity = 1;
    
    // capture selected breed
    let breed = $('#breed').val();
    
    getDogImages(quantity, breed);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});