document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('registerForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const nome = document.getElementById('nome')?.value || '';
            const telefone = document.getElementById('telefone')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const senha = document.getElementById('senha')?.value || '';
            const confirmarSenha = document.getElementById('confirmarSenha')?.value || '';

            if (senha !== confirmarSenha) {
                alert("As senhas não coincidem. Por favor, tente novamente.");
                return;
            }

            // Envia os dados para o backend
            fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                   name: nome, 
                   phone: telefone, 
                   email: email, 
                   password: senha 
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => {
                        throw new Error(error.message || "Erro desconhecido");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("Registro bem-sucedido:", data);
                // Redireciona para outra página após o registro bem-sucedido
                window.location.href = '../../Pagina Pagamento/SegundaPagina/PaginaRegistro2.html';
            })
            .catch(error => console.error("Erro ao registrar:", error));
        });
    } else {
        console.error("Formulário de registro não encontrado!");
    }
});