const express = require('express');
const bodyParset = require('body-parser');
const app = express();

const port = 8000;

app.use(bodyParset.json());

let users = []
let counter = 1
/*
GET /users สำหรับget users ทั้งหมดที่บันทึกไว้
Post /users สำหรับสร้าง users ใหม่บันทึกเข้าไป 
GET /users /:id สำหรับดึง users รายคนออกมา
PUT /users /:id สำหรับแก้ไข user รายคน ตามidที่บันทึกเข้าไป
Delete /users /:id สำหรับลบ user รายคน ตามidที่บันทึกเข้าไป
 */

//path: /user ใช้สำหรับสร้างข้อมูลของ user ทั้งหมด GET /users สำหรับget users ทั้งหมดที่บันทึกไว้
app.get('/users',  (req,res) => {
    res.json(users);
});

//path: /user ใช้สำหรับสร้างข้อมูลของ userใหม่ Post /users สำหรับสร้าง users ใหม่บันทึกเข้าไป
app.post('/user', (req,res) => {
    let user = req.body;
    user.id = counter
    counter +=1

    users.push(user);
    res.json({
        message: "Create new user successfully",
        user:user
    });
})

//path: PUT /user/:id ใช้สำหรับแก้ไขข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้ 
// PUT /users /:id สำหรับแก้ไข user รายคน ตามidที่บันทึกเข้าไป
app.put('/user/:id', (req,res) => {
    let id = req.params.id;
    let updateUser = req.body;
    //หา users จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id)


    //แก้ไขข้อมูลของ user ที่หาเจอ
    //users[selectIndex] = updateUser;
    if(updateUser.firstname){
        users[selectIndex].firstname = updateUser.firstname;
    }
    if(updateUser.lastname){
        users[selectIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: "Update user successfully",
        data: {
            user: updateUser,
            indexUpdate: selectIndex
         }
    });  
})

//path: Delete /user/:id ใช้สำหรับลบข้อมูลของ user โดยใช้ id เป็นตัวบ่งชี้
//Delete /users /:id สำหรับลบ user รายคน ตามidที่บันทึกเข้าไป
app.delete('/user/:id', (req,res) => {
    let id = req.params.id;
    //หา index ของ user ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id)

    //ลบ 
    users.splice(selectIndex, 1)
    res.json({
        message: "Delete user successfully",
        indexDelete: selectIndex
    });
})

app.listen(port, (req,res) => {
    console.log(`Server is running on port`+ port);
});