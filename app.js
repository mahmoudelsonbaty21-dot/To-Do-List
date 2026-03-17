$(document).ready(function(){
    
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // return todos from localstorage or set todos=[]
    function rendertodos(){
        $('ul').empty();
        
        //iterate over todos
        todos.forEach((todo,index) => {
            const iscompleted=todo.completed ? 'completed':''
            const ischecked=todo.completed ? 'checked':''
            const li=`
            
                <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <input type="checkbox" 
                    class="from-check-input toggle-todo"data-id="${index}" ${ischecked}>
                    <label class="form-check-label ${iscompleted}">
                        ${todo.text}
                    </label>
                </div>
                <button class="btn btn-danger btn-sm delete" 
                data-id=${index}>DELETE
                </button>
                </li>
            `
            $('ul').append(li)
        });
     }

     function savetodoandreload(){
        localStorage.setItem('todos',JSON.stringify(todos))
        rendertodos()
     }

     $("#addtask").on('click',function(){
        const todotext=$("#taskinput").val().trim()

        if(todotext !== ""){
            todos.push({text : todotext, completed : false})
            $("#taskinput").val("")
            savetodoandreload()
        }
     })

     $("#taskinput").on('keypress',function(event){
        if(event.which===13){
            $("#addtask").click()
        }
     })
     $("ul").on('click','.delete',function(){
        const todoid=$(this).data('id')
        todos.splice(todoid,1);
        savetodoandreload();
     })
     $("ul").on('change','.toggle-todo',function(){
        const todoid=$(this).data('id')
        todos[todoid].completed= !todos[todoid].completed
        savetodoandreload()
     })

    rendertodos();
})