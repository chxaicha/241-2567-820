const BASE_URL = "http://localhost:8000";
//2. นำ user ที่โหลดมาใส่ใน html
window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('loaded')
    //1. load user ทั้งหมดออกมาจาก api
    const response = await axios.get(`${BASE_URL}/users`);
    console.log('response', response);

    //2. นำ user ที่โหลดมาใส่ใน html
    const userDOM = document.getElementById('users');
    let htmlData = '<div>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += `<div> 
        ${user.id} ${user.firstname} ${user.lastname}
        <a href='index.html?id=${user.id}'><button>Edit</button></a>
        <button class = 'delete' data-id'${user.id}'>Delete</button>
        </div>`
    }
    htmlData += '</div>'
    userDOM.innerHTML = htmlData;

    //3.ลบ user
    const dataDOM = document.querySelectorAll('.delete');
    for (let i = 0; i < dataDOM.length; i++) {
        dataDOM[i].addEventListener('click', async () => {
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BASE_URL}/users/${id}`);
                loadData(); //recursion function = เรียกใช้ฟังก์ชันเอง
            } catch {
                console.log('error', error);
            }
        });
    }
}