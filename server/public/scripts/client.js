console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val().toUpperCase(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    console.log('OTS is: ', objectToSend);
    saveKoala( objectToSend );

  }); //end addButton on click
}); // end doc ready




function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
    } // end success
  }); //end ajax
}


function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( response ){
      console.log( 'got some koalas: ', response );
        appendToDom(response.koalas);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas



function appendToDom(koalas) {
  // Remove koalas that currently exist in the table
  $('#viewKoalas').empty();
  for(var i = 0; i < koalas.length; i += 1) {
    var koala = koalas[i];
    // For each koalas, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('koalas', koala);
    $tr.append('<td>' + koala.name + '</td>');
    $tr.append('<td>' + koala.age +'</td>');
    $tr.append('<td>' + koala.gender + '</td>');
    $tr.append('<td>' + koala.ready_for_transfer +'</td>');
    $tr.append('<td>' + koala.notes +'</td>');
    $tr.append('<td><button class="deleteBtn" data-koalaid="' + koala.id + '">Delete</button></td>');
    addTransferButton(koala);
    $('#viewKoalas').append($tr);
  }
}

function addTransferButton(koala) {
if(koala.ready_for_transfer == "N" || koala.ready_for_transfer == "NO") {
  $tr.append('<td><button class="transferBtn" data-koalaid="' + koala.id + '">Ready for Transfer</button></td>');
  }
}
