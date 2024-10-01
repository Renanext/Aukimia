document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');
    var loginContainer = document.getElementById('login-container');
    var mainContent = document.getElementById('main-content');
    var errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if (username === 'aukimia' && password === 'admin') {
            errorMessage.textContent = '';
            loginContainer.classList.add('hidden');
            mainContent.classList.remove('hidden');
        } else {
            errorMessage.textContent = 'Nome de usuário ou senha incorretos.';
        }
    });
});
