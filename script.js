function open() {
    let a = document.querySelector("#side")
    a.style.display = "grid"
    return false;
}
async function table() {
    let data = await fetch("http://localhost:3000/task")
    let res = await data.json()
    let a = document.querySelector("#output")
    a.innerHTML = res.map((e) => `
    <tr>
    <td>${e.id}</td>
    <td>${e.name}</td>
    <td>${e.contact}</td>
    <td>${e.services}</td>
    <td>${e.date}</td>
    <td>${e.time}</td>
    <td><i class="fa-sharp fa-solid fa-trash" onclick=del('${e.id}')></i></td>
    <td><i class="fa-solid fa-pen-nib" onclick=edit('${e.id}')></i></td>

    </tr>
    `)
}
function insert() {
    let obj = {
        name: document.querySelector("#name").value,
        contact: document.querySelector("#contact").value,
        services: document.querySelector("#service").value,
        date: document.querySelector("#date").value,
        time: document.querySelector("#time").value,
    }
    fetch("http://localhost:3000/task", {
        method: "POST",
        body: JSON.stringify(obj)
    })
        .then(res => alert("Booking Successfully........!!"))
}
function del(id) {
    let res = window.confirm("Do you want to delete this appointment data")
    if (res) {
        fetch(`http://localhost:3000/task/${id}`, {
            method: "DELETE"
        })
    }
    else {
        window.alert("Invalid Input")
    }
}
async function edit(id) {
    let data = await fetch(`http://localhost:3000/task/${id}`)
    let res = await data.json()
    let a = document.querySelector("#edit")
    a.innerHTML = `
      <input type="text" id="id" value="${res.id}" readonly>
            <input type="text" id="name1" value="${res.name}">
            <input type="text" id="contact1" value="${res.contact}">
            <input type="text" id="service1" value="${res.services}">
            <input type="date" id="date1" value="${res.date}">
            <input type="time" id="time1" value="${res.time}">
            <button onclick = "update('${res.id}')">Update</button>`
}
function update(id) {
    let fdata = {
        name: document.querySelector("#name1").value,
        contact: document.querySelector("#contact1").value,
        services: document.querySelector("#service1").value,
        date: document.querySelector("#date1").value,
        time: document.querySelector("#time1").value,
    }
    fetch(`http://localhost:3000/task/${id}` , {
        method : "PUT",
        body:JSON.stringify(fdata)
    })
    .then(res=>alert("Updated successfully....!!"))
}