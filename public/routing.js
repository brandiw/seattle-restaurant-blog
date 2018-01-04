console.log('Hello from routing.js!');

$('.delete-link').click(function(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).success(function(data){
    window.location.href = '/articles';
  });
});

$('#delete-tag').click(function(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'delete'
  }).success(function(response){
    window.location.href = '/tags';
  });
});
