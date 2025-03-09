const validateData = (userData) => {
    let errors = [];

    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    } else if (isNaN(userData.age)) {
        errors.push('อายุต้องเป็นตัวเลข');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests || userData.interests.length === 0) { // แก้ไขการตรวจสอบความสนใจ
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
};

const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name = firstname]');
    let lastNameDOM = document.querySelector('input[name =lastname]');
    let ageDOM = document.querySelector('input[name =age]');
    let genderDOM = document.querySelector('input[name= gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.querySelector('.message');

    try {
        let interest = '';
        if (interestDOMs && interestDOMs.length > 0) { // ตรวจสอบว่ามี interests ถูกเลือกหรือไม่
            for (let i = 0; i < interestDOMs.length; i++) {
                interest += interestDOMs[i].value;
                if (i !== interestDOMs.length - 1) {
                    interest += ',';
                }
            }
        }

        let userData = {
            firstname: firstNameDOM.value,
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM ? genderDOM.value : '', // ตรวจสอบ genderDOM ก่อนใช้ .value
            description: descriptionDOM.value,
            interests: interest
        };

        console.log('submit Data', userData);
        const errors = validateData(userData);

        if (errors.length > 0) {
            //มี error
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }

        const response = await axios.post('http://localhost:8000/users', userData);
        console.log('response', response.data);
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อย';
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        console.log('error ', error.errors);

        if (error.response) {
            console.log(error.response);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }

        let htmlData = '<div>';
        htmlData += `<div> ${error.message} </div>`;
        htmlData += '<ul>';
        if (error.errors) { // ตรวจสอบว่า error.errors มีอยู่หรือไม่
            for (let i = 0; i < error.errors.length; i++) {
                htmlData += `<li> ${error.errors[i]} </li>`;
            }
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }
};