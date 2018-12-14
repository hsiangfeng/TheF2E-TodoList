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
    function addTodo(e) {
        e.preventDefault();
        //學員建議寫法
        let todoArray = document.getElementsByClassName('inputdata');
        let todo = {
            todoListDate: todoArray[0].value,
            todoListTime: todoArray[1].value,
            content: todoArray[2].value,
            status: false
        }
        ListData.push(todo); //轉換成物件存入
        localStorage.setItem('ListData', JSON.stringify(ListData));
        document.querySelector('.todolist').reset();
        upIndexList(ListData);
    }
    function todoOpiton(e) {
        let index = e.target.dataset.index;
        if (e.target.nodeName == 'A') {
            ListData.splice(index, 1);
            localStorage.setItem('ListData', JSON.stringify(ListData)); //同步到localStorage
        } else if (e.target.nodeName == 'INPUT') {
            if (ListData[index].status) {
                ListData[index].status = false;
            } else {
                ListData[index].status = true;
            }
            localStorage.setItem('ListData', JSON.stringify(ListData)); //同步到localStorage
        }//可用tagName或nodeName
        upIndexList(ListData); //更新網頁畫面
    }
    function upIndexList(item) {
        let index = document.querySelector('.main .active').textContent;
        console.log(index);
        let str = '';
        let itemLen = item.length;
        if (index === "My Tasks") {
            for (let i = 0; i < itemLen; i++) {
                if (item[i].status == true) {
                    str += `
                <div class="todo-card active">
                    <div class="card-body">
                        <input type="checkbox" data-index='${i}' checked>
                        <p class="todo-completed">${item[i].content}</p>
                        <ul class="card-main">
                            <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                        <i class="far fa-comment"></i>
                    </div>
                </div>`;
                } else {
                    str += `
                <div class="todo-card">
                    <div class="card-body">
                        <input type="checkbox" data-index='${i}'>
                        <p >${item[i].content}</p>
                        <ul class="card-main">
                            <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                        <i class="far fa-comment"></i>
                    </div>
                </div>`;
                }

            };
        } else if (index === "In Progress") {
            for (let i = 0; i < itemLen; i++) {
                if (!item[i].status) {
                    str += `
                <div class="todo-card">
                    <div class="card-body">
                        <input type="checkbox" data-index='${i}'>
                        <p >${item[i].content}</p>
                        <ul class="card-main">
                            <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                        <i class="far fa-comment"></i>
                    </div>
                </div>`;
                }

            };
        } else {
            for (let i = 0; i < itemLen; i++) {
                if (item[i].status) {
                    str += `
                <div class="todo-card active">
                    <div class="card-body">
                        <input type="checkbox" data-index='${i}' checked>
                        <p class="todo-completed">${item[i].content}</p>
                        <ul class="card-main">
                            <li><a href="#" data-index='${i}' class="far fa-trash-alt"></a></li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <i class="far fa-calendar-alt"></i>${item[i].todoListDate}/${item[i].todoListTime}
                        <i class="far fa-comment"></i>
                    </div>
                </div>`;
                }
            };
        }
        content.innerHTML = str;
    }
    //event
    btnAdd.addEventListener('click', addTodo);
    content.addEventListener('click', todoOpiton);
});