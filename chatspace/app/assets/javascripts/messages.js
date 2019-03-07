$(function() {
  function buildSendMessageHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class='message' data-id="${message.id}">
                  <div class="upper-message">
                    <div class='upper-message__user-name'>
                      ${message.name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-message'>
                    ${message.content}
                      </div>
                    ${insertImage}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(sendMessageData) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    });
  });

  function scroll() {
    $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
  }

});

