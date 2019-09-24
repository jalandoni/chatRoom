$("#SMS").hide();
$(function () {
    var names = $('#username').val();
    var username = $('#username');
    var users = [];
    var socket = io();

 

    socket.on('online',function(data){  
        $('#activeUser').append($("<li>").text(data));
        });
    
    $('#submitButton').click(function () {
        socket.emit('online', username.val());
        console.log(username.val());
        $('#userinterface').hide();
        $("#SMS").show();
        $('#disconnect').click(function () {

        })

    })
    $('form').submit(function () {
        socket.emit('chat message', username.val() + " : " + $('#m').val());
        $('#m').val('');
        return false;
    });

    $('#m').on('keypress', function () {
        socket.emit('typing', username.val());
    })


    socket.on('typing', function (msg, err) {
        console.log(err);
        $('#typing').html(msg + " is typing a message...");
        setTimeout(function () {
            $("#typing").html('');
        }, 2000);
    })

    

    socket.on('offline', function () {

    })
    socket.on('chat message', function (msg) {
        // $('#messages').append($('<li>').text(msg));
        console.log(msg.split(" : ")[0])
        if (username.val() == msg.split(" : ")[0]) {
            $('#messages').append($('<li style="padding:5px;border-radius:10px;background-color:deepskyblue;margin-left:340px;margin-top:30px;">').text(msg));
        } else {
            $('#messages').append($('<li style="padding:5px;border-radius:10px;background-color:white;color:deepskyblue;margin-right:340px;margin-top:30px; ">').text(msg));
        }
    });


});
window.scrollTo(0, document.body.scrollHeight);


