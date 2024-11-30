
const a = document.createElement("div");
document
a.id = "appendMenuLateral";
a.innerHTML = `
    <div class="sidebar" id="sidebar">
        <a href="./PaginaPerfil.html">
            <img src="../Assets/Images/perfil.png" alt="Ícone do Usuário" class="user-icon">
        </a>

        <!-- Menu Hambúrguer -->
        <div class="menu-item" onclick="toggleMenu()">
            <div class="hamburger">
                <img src="../Assets/Images/MenuH.png" alt="Menu Icon">
            </div>
            <span class="menu-text">Menu</span>
        </div>

        <!-- Itens do Menu -->
        <div class="menu-item">
            <a href="./index.html">
                <span class="menu-icon"><img src="../Assets/Images/casa.png" alt="Home"></span>
                <span class="menu-text">Início</span>
            </a>
        </div>
        <div class="menu-item">
            <a href="./Tela Curso.html ">
                <span class="menu-icon"><img src="../Assets/Images/abra-o-livro.png" alt=""></span>
                <span class="menu-text">Aulas</span>
            </a>
        </div>
        <div class="menu-item">
            <a href="./PaginaEscolhaJogos.html">
                <span class="menu-icon"><img src="../Assets/Images/Controle.png" alt="Controle"></span>
                <span class="menu-text">Jogos</span>
            </a>
        </div>
        <div class="menu-item">
            <a href="./PaginaAplicação.html">
                <span class="menu-icon"><img src="../Assets/Images/Maleta.png" alt="Maleta"></span>
                <span class="menu-text">Aplicação</span>
            </a>
        </div>
    </div>
    <link rel="stylesheet" href="../Styles/MenuLateral.css">
    `;

document.querySelector('.container').appendChild(a);
