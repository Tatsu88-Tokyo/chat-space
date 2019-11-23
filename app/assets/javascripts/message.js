$(function(){

  function buildHTML(message){
    if (message.image) {
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
                 <img class="lower-message__image" src=${message.image} alt="7a1e30c5 c428 4656 ba5a 65ac2fc9d990 4 5005 c">
                 </div>
                 </div>`
                 return html
    } else {
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
                 </div>
                 </div>`
                 return html
    }
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