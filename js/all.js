$(document).ready(function () {
    //收闔效果
    $('.newTodo').click(function (e) {
        e.preventDefault();
        $('.todolist').slideToggle();
    });


    //DOM
    var btnAdd = document.querySelector('.todoAdd');
    var content = document.querySelector('.content');
    var ListData = JSON.parse(localStorage.getItem('ListData')) || [];

    upIndexList(ListData);

    function addTodo(event) {
        event.preventDefault();
        //學員建議寫法
        let todoArray = document.getElementsByClassName('inputdata');
        console.log(todoArray);
        let todo = {
            todoListDate: todoArray[0].value,
            todoListTime: todoArray[1].value,
            content: todoArray[2].value,
            status: false
        };
        ListData.push(todo); //轉換成物件存入
        localStorage.setItem('ListData', JSON.stringify(ListData));
        document.querySelector('.todolist').reset();
        upIndexList(ListData);
    }
    function todoOpiton(e) {
        console.log(e.target.nodeName);
        console.log(e.target.dataset.index);
        if (e.target.nodeName == 'A') {
            var index = e.target.dataset.index;
            ListData.splice(index, 1);
            localStorage.setItem('ListData', JSON.stringify(ListData)); //同步到localStorage
            upIndexList(ListData); //更新網頁畫面
        } //可用tagName或nodeName

    }
    function upIndexList(item) {
        let itemLen = item.length;
        let str = '';
        for (let i = 0; i < itemLen; i++) {
            if (item.status) {
                str += `
                <div class="todo-card active">
                        <div class="card-body">
                            <input type="checkbox" name="" id="">
                            <p class="todo-completed">${item[i].content}</p>
                            <ul class="card-main">
                                <li class="star"><a href="#"><i class="far fa-star"></i></a></li>
                                <li class="pen"><a href="#"><i class="fas fa-pen"></i></a></li>
                                <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                            <i class="far fa-file"></i>
                            <i class="far fa-comment"></i>
                        </div>
                    </div>`;
            } else {
                str += `
                <div class="todo-card">
                    <div class="card-body">
                        <input type="checkbox" name="" id="">
                        <p class="todo-completed">${item[i].content}</p>
                        <ul class="card-main">
                            <li class="star"><a href="#"><i class="far fa-star"></i></a></li>
                            <li class="pen"><a href="#"><i class="fas fa-pen"></i></a></li>
                            <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                        <i class="far fa-file"></i>
                        <i class="far fa-comment"></i>
                    </div>
                </div>`;
            }

        };
        content.innerHTML = str;
    }
    //event
    btnAdd.addEventListener('click', addTodo);
    content.addEventListener('click', todoOpiton);
});