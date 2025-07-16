
const form = document.querySelector(".form");
const addme = document.querySelector(".add")
const todolist = document.querySelector(".todo-ul")

const todoinput = document.getElementById("input")
const checkbox = document.getElementsByClassName('checkbox')
form.addEventListener('submit', addtodo())
const rendtodo = [];
let alltodo = gettodos();
addme.addEventListener('click', function (e) {
    e.preventDefault()
    addtodo()
}
)
function addtodo() {
    const todotext = todoinput.value.trim()
    if (todotext.length > 0) {
        const todoobj={text:todotext,done:false};
        alltodo.push(todoobj);
        createtodo(todoobj)
        local()
        todoinput.value = ""

    }
}
function createtodo(todoobj) {
    const todoli = document.createElement('li')
    todoli.innerHTML = `<input type="checkbox" class ="checkbox"${todoobj.done?"checked":""}>
    <span>${todoobj.text}</span>
     <button class="trash"><img src="icons8-trash-25.png" alt=""></button>`
     
    todolist.append(todoli)
    const checkbox= todoli.querySelector(".checkbox")
    checkbox.addEventListener("change",()=>{
        todoobj.done=checkbox.checked;
        local()
    })
    todoli.querySelector(".trash").addEventListener('click', () => {
        todoli.remove();
        alltodo = alltodo.filter(todo => todo !== todoobj);
        localStorage.setItem("todos", JSON.stringify(alltodo))
    })
}
function local() {
    const todosjson = JSON.stringify(alltodo)
    localStorage.setItem("todos", todosjson)

}
function gettodos() {
    let stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
}
window.addEventListener("DOMContentLoaded", () => {
    let storedtodo = JSON.parse(localStorage.getItem("todos")) || []
    alltodo = storedtodo;
    storedtodo.forEach(todo => {
        createtodo(todo)
    });
})
