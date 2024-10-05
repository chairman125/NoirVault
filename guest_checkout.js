document.addEventListener('DOMContentLoaded', function() {
    const paymentSelect = document.getElementById('payment');
    const creditCardInfo = document.getElementById('creditCardInfo');
    const checkoutForm = document.getElementById('checkoutForm');

    paymentSelect.addEventListener('change', function() {
        if (paymentSelect.value === 'credit') {
            creditCardInfo.style.display = 'block';
        } else {
            creditCardInfo.style.display = 'none';
        }
    });

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출 막기

        if (paymentSelect.value === 'credit') {
            // 신용카드 결제 처리 로직
            alert('구매해 주셔서 감사합니다!');
        } else if (paymentSelect.value === 'paypal') {
            // PayPal 결제 처리 로직
            window.location.href = 'https://www.paypal.com';
        }
    });
});
