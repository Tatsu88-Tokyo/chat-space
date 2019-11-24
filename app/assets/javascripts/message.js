$(function(){

  function buildHTML(message){
    var image = message.image ? `<img class="lower-message__image" src=${message.image}>` : ``

    let html = `<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${message.content}
                </p>
                ${image}
                </div>
                </div>`;
      return html
    }
    
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type:"POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:false
    })
    .done(function(message){
      let html = buildHTML(message)
      $('.messages').append(html);
      $('.contents__messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled',false);
    })
    .fail(function(){
      alert('error!');
    })
  })
});