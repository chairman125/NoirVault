document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const productTypeInputs = document.querySelectorAll('input[name="product_type"]');
    const quantitySelect = document.getElementById('quantity_select');
    const quantityInput = document.getElementById('quantity_input');
    const privacyAgreement = document.getElementById('privacy_agreement');
    const serviceAgreement = document.getElementById('service_agreement');

    const nameRegex = /^[가-힣]{2,}$/;
    const usernameRegex = /^[A-Za-z0-9]{4,12}$/;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|kr)$/;
    const passwordRegex = /^[A-Za-z0-9]{4,12}$/;

    const ERROR_MESSAGES = {
        name: '이름을 입력해주세요.',
        invalidName: '유효하지 않은 이름입니다.',
        username: '아이디를 입력해주세요.',
        invalidUsername: '아이디는 4~12자의 대소문자 영문과 숫자 조합만 가능합니다.',
        email: '이메일을 입력해주세요.',
        invalidEmail: '유효하지 않은 이메일 주소입니다.',
        contact: '연락처를 입력해주세요.',
        invalidContactLength: '연락처는 10~11자리 숫자로 입력해주세요.',
        invalidContactFormat: '연락처는 - 기호 제외하고 작성해주세요.',
        password: '패스워드를 입력해주세요.',
        invalidPassword: '패스워드는 4~12자의 대소문자 영문과 숫자 조합만 가능합니다.',
        confirmPassword: '패스워드 확인을 입력해주세요.',
        passwordMismatch: '비밀번호가 일치하지 않습니다.',
        productType: '제품을 선택해주세요.',
        quantity: '수량을 입력해주세요.',
        agreement: '필수 약관에 동의해주세요.',
    };

    function showError(message) {
        alert(message);
    }


    // 네비게이션 바를 숨기기 위한 함수
    function hideNavbarForMobile() {
        const navbar = document.querySelector('.navbar');
        const containerForm = document.querySelector('.container-form');
        if (window.innerWidth <= 768) {
            navbar.style.display = 'none';
            containerForm.style.border = '15px solid #000';
            containerForm.style.borderRadius = '80px';
        } else {
            navbar.style.display = 'block';
            containerForm.style.border = 'none';
            containerForm.style.borderRadius = '0';
        }
    }

    // 페이지 로드 시와 창 크기 변경 시 네비게이션 바 상태 확인
    hideNavbarForMobile();
    window.addEventListener('resize', hideNavbarForMobile);

    function showError(message) {
        alert(message);
    }

    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(ERROR_MESSAGES.name);
            return false;
        }
        if (!nameRegex.test(nameInput.value)) {
            showError(ERROR_MESSAGES.invalidName);
            return false;
        }
        return true;
    }

    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            showError(ERROR_MESSAGES.username);
            return false;
        }
        if (!usernameRegex.test(usernameInput.value)) {
            showError(ERROR_MESSAGES.invalidUsername);
            return false;
        }
        return true;
    }

    function validateEmail() {
        if (emailInput.value.trim() === '') {
            showError(ERROR_MESSAGES.email);
            return false;
        }
        if (!emailRegex.test(emailInput.value)) {
            showError(ERROR_MESSAGES.invalidEmail);
            return false;
        }
        return true;
    }

    function validateContact() {
        const contactValue = contactInput.value.trim();
        const contactNumericRegex = /^[0-9]+$/; // Check for numeric values only
    
        if (contactValue === '') {
            showError(ERROR_MESSAGES.contact);
            return false;
        }
        if (!contactNumericRegex.test(contactValue)) {
            showError(ERROR_MESSAGES.invalidContactFormat);
            return false;
        }
        if (contactValue.length < 10 || contactValue.length > 11) {
            showError(ERROR_MESSAGES.invalidContactLength);
            return false;
        }
        return true;
    }
    
    

    function validatePassword() {
        if (passwordInput.value.trim() === '') {
            showError(ERROR_MESSAGES.password);
            return false;
        }
        if (!passwordRegex.test(passwordInput.value)) {
            showError(ERROR_MESSAGES.invalidPassword);
            return false;
        }
        if (confirmPasswordInput.value.trim() === '') {
            showError(ERROR_MESSAGES.confirmPassword);
            return false;
        }
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(ERROR_MESSAGES.passwordMismatch);
            return false;
        }
        return true;
    }

    function validateProductType() {
        let productTypeSelected = false;
        productTypeInputs.forEach(input => {
            if (input.checked) {
                productTypeSelected = true;
            }
        });
        if (!productTypeSelected) {
            showError(ERROR_MESSAGES.productType);
            return false;
        }
        return true;
    }

    quantitySelect.addEventListener('change', function() {
        if (quantitySelect.value !== '') {
            quantityInput.value = '';
        }
    });
    
    quantityInput.addEventListener('input', function() {
        if (quantityInput.value !== '') {
            quantitySelect.value = '';
        }
    });

    function validateQuantity() {
        const quantitySelectValue = quantitySelect.value.trim();
        const quantityInputValue = quantityInput.value.trim();
    
        if (quantitySelectValue === '' && quantityInputValue === '') {
            showError(ERROR_MESSAGES.quantity);
            return false;
        }
        return true;
    }
    

    function validateAgreements() {
        if (!privacyAgreement.checked || !serviceAgreement.checked) {
            showError(ERROR_MESSAGES.agreement);
            return false;
        }
        return true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // prevent form submission for validation checks

        if (validateName() && validateUsername() && validateEmail() && validateContact() &&
            validatePassword() && validateProductType() && validateQuantity() && validateAgreements()) {
            alert('정상적으로 신청되었습니다.');
            location.href = 'https://trailhead.salesforce.com/ko/today'; // redirect after successful validation
        }
    });
});
