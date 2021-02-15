$(document).ready(function () {
    countMemo();
    date();
    getTodo();
});

function countMemo() {
    $.ajax({
        type: "GET",
        url: "/api/addTodo",
        data: {},
        success: function (response) {
            let count = response['all_todos'].length
            $('#count').text(count);
        }
    })
}

function date() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let dayLists = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ];
    let day = today.getDay();
    let nowDay = `${year}년 ${month + 1}월 ${date}일 ${dayLists[day]}`;
    $('#date').text(nowDay);
}

function buttonShow() {
    $('.delete').css('display') === 'none'
        ? $('.delete').show()
        : $('.delete').hide();
}

function todoRemove(todo) {
    $.ajax({
        type: 'POST',
        url: '/api/delete',
        data: {todo_give: todo},
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    });
}

function getTodo() {
    $.ajax({
        type: "GET",
        url: "/api/addTodo",
        data: {},
        success: function (response) {
            let todos = response['all_todos']
            if (todos.length === 0) {
                $('#noMemo').show()
            } else {
                $('#noMemo').hide()
            }
            for (let i = 0; i < todos.length; i++) {
                let comment = todos[i]['todo']
                let tempHtml = `<li class="list-items" onclick="buttonShow()">
                                      <p id="item" >${comment}</p>
                                          <button class="btn btn-danger delete" type="button" onclick="todoRemove('${comment}')">
                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                  class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                  <path
                                                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                              </svg>
                                          </button>
                                  </li>`

                $('#todo-list').append(tempHtml)
            }
        }
    })
}

function addTodo() {
    let todo = $('#todoAdd').val();

    $.ajax({
        type: "POST",
        url: "/api/addTodo",
        data: {todo_give: todo},
        success: function (response) {
            alert(response["msg"]); // 성공 시 메세지 알림
            window.location.reload(); // 페이지 다시 읽기(새로고침)
        }
    })
}

