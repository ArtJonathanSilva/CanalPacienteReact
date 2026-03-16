(function () {
    'use strict';

    var form = document.getElementById('loginForm');
    var carteirinhaInput = document.getElementById('carteirinha');
    var senhaInput = document.getElementById('senha');

    if (!form) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var carteirinha = (carteirinhaInput && carteirinhaInput.value) ? carteirinhaInput.value.trim() : '';
        var senha = (senhaInput && senhaInput.value) ? senhaInput.value : '';

        if (!carteirinha) {
            alert('Por favor, digite sua carteirinha.');
            if (carteirinhaInput) carteirinhaInput.focus();
            return;
        }

        if (!senha) {
            alert('Por favor, digite sua senha.');
            if (senhaInput) senhaInput.focus();
            return;
        }

        if (carteirinha === '0089234000012' && senha === '123456') {
            alert('Login realizado com sucesso! (simulação)');
        } else {
            alert('Carteirinha ou senha incorretos. Tente novamente.');
        }
    });
})();
