$(document).ready(function () {
    //收闔效果
    $('.newTodo').click(function (e) {
        e.preventDefault();
        $('.todolist').slideToggle();
    });


    //DOM
    var btnAdd = document.querySelector('.todoAdd');
    var ListData =JSON.parse(localStorage.getItem('ListData')) || [];
    function addTodo(event) {
        event.preventDefault();
        //學員建議寫法
        let todoArray = document.getElementsByClassName('inputdata');
        console.log(todoArray);
        alert(todoArray[0].value)
        let todo = {
            todoListDate: todoArray[0].value,
            todoListTime:todoArray[1].value,
            content: todoArray[2].value
        };
        ListData.push(todo); //轉換成物件存入
        localStorage.setItem('ListData',JSON.stringify(ListData));
        document.querySelector('.todolist').reset();
        formList.reset();
    }
    //event
    btnAdd.addEventListener('click', addTodo);
});