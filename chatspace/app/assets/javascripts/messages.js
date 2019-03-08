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

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href.json,
        type: 'GET',
        dataType: 'json'
      })

      .done(function(json) {
        var last_message_id = $('.chat-body:last').data('id');
        var insertHTML = '';
        json.messages.forEach(function(message) {
          if (message.id > last_message_id ) {
            insertHTML += buildHTML(message);
          }
        });
        $('.main-content__chat-contents').append(insertHTML);
        scroll()
      })

      .fail(function(json) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }} , 5 * 1000 );

});

