// Carrega e renderiza os dados da equipe
async function carregarEquipe() {
    try {
        const response = await fetch('data/equipe.json');
        const equipe = await response.json();
        
        const container = document.getElementById('equipe-container');
        
        equipe.forEach(integrante => {
            const card = document.createElement('div');
            card.className = 'integrante-card';
            
            card.innerHTML = `
                <img src="${integrante.foto}" alt="${integrante.nome}">
                <h3>${integrante.nome}</h3>
                <p class="funcao">${integrante.funcao}</p>
                <p class="curso">${integrante.curso}</p>
                <a href="${integrante.lattes}" target="_blank" class="lattes-link">Currículo Lattes</a>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao carregar dados da equipe:', error);
    }
}

// Carrega a equipe quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarEquipe);