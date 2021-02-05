// personalData

let personalData = {
    fullname: '',
    email: '',
    phone: '',
    gender: '',
    birthdate: '',
    city: '',
    address: '',
    passport: '',
    passportIssue: '',
    passportExpiry: '',
    studied: 'no',
    studiedCity: '',
    studiedUniversity: '',
    studiedMajor: ''
}

const fullnameHandler = () => {
    personalData.fullname = $('input[id="fullname"]').val();
    console.log(personalData.fullname);
}

const emailHandler = () => {
    personalData.email = $('input[id="email"]').val();
    console.log(personalData.email);
}

const phoneHandler = () => {
    personalData.phone = $('input[id="phone"]').val();
    console.log(personalData.phone);
}

const genderHandler = () => {
    personalData.gender = $('input[name="gender"]:checked').val();
    console.log(personalData.gender);
}

const birthdateHandler = () => {
    personalData.birthdate = $('input[id="birthdate"]').val();
    console.log(personalData.birthdate);
}

const cityHandler = () => {
    personalData.city = $('input[id="city"]').val();
    console.log(personalData.city);
}

const addressHandler = () => {
    personalData.address = $('input[id="address"]').val();
    console.log(personalData.address);
}

const passportHandler = () => {
    personalData.passport = $('input[id="passport"]').val();
    console.log(personalData.passport);
}

const passportIssueHandler = () => {
    personalData.passportIssue = $('input[id="passport_issue"]').val();
    console.log(personalData.passportIssue);
}

const passportExpiryHandler = () => {
    personalData.passportExpiry = $('input[id="passport_expiry"]').val();
    console.log(personalData.passportExpiry);
}

// family data

let familyData = {
    fatherFname: '',
    fatherSname: '',
    fatherOccupation: '',
    fatherPhone: '',
    motherFname: '',
    motherSname: '',
    motherOccupation: '',
    mother_phone: ''
}

const fatherFnameHandler = () => {
    familyData.fatherFname = $('input[id="father_fname"]').val();
    console.log(familyData.fatherFname);
}

const fatherSnameHandler = () => {
    familyData.fatherSname = $('input[id="father_sname"]').val();
    console.log(familyData.fatherSname);
}

const fatherOccupationHandler = () => {
    familyData.fatherOccupation = $('input[id="father_occupation"]').val();
    console.log(familyData.fatherOccupation);
}

const fatherPhoneHandler = () => {
    familyData.fatherPhone = $('input[id="father_phone"]').val();
    console.log(familyData.fatherPhone);
}

const motherFnameHandler = () => {
    familyData.motherFname = $('input[id="mother_fname"]').val();
    console.log(familyData.motherFname);
}

const motherSnameHandler = () => {
    familyData.motherSname = $('input[id="mother_sname"]').val();
    console.log(familyData.motherSname);
}

const motherOccupationHandler = () => {
    familyData.motherOccupation = $('input[id="mother_occupation"]').val();
    console.log(familyData.motherOccupation);
}

const motherPhoneHandler = () => {
    familyData.motherPhone = $('input[id="mother_phone"]').val();
    console.log(familyData.motherPhone);
}

// Educational Background
