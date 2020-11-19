$('.red').on('click', function (e) {
  e.preventDefault();
  var id = $(this).attr('id');
  
 //aqui passamos a ID do registro para dentro do modal, atraveś do click do botão...
  $('#modalCategoria').data('id', id).modal('show');
});

$('#btnDelteYes').click(function () {
  var id = $('#modalCategoria').data('id');
  
  $.get('/deletar-categoria/'+id)
  //$('#modalCategoria').modal('hide');
  location.reload();
});