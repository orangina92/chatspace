$(function(){
    function buildHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class='chat-body' data-id="${message.id}">
                  <div class='chat-body--name'>
                    ${message.name}
                  </div>
                  <div class='chat-body--time'>
                    ${message.created_at}
                  </div>
                  <div class='chat-body--message'>
                    ${message.body}
                      </div>
                    ${insertImage}
                  </div>
                </div>`;
    return html;
  }
  $('.form__message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
  })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-content__chat-contents').append(html)
      $('#message_body').val('')
      $('.chat-body').animate({scrollTop: $(".chat-body")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  })

