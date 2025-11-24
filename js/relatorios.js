// Carrega e gerencia os relatórios
let relatoriosData = [];

async function carregarRelatorios() {
    try {
        const response = await fetch('data/relatorios.json');
        relatoriosData = await response.json();
        
        popularSelectMunicipio();
        configurarEventListeners();
    } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
    }
}

function popularSelectMunicipio() {
    const select = document.getElementById('select-municipio');
    
    relatoriosData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.municipio;
        option.textContent = item.municipio;
        select.appendChild(option);
    });
}

function configurarEventListeners() {
    const selectMunicipio = document.getElementById('select-municipio');
    const radioRelatorio = document.getElementById('tipo-relatorio');
    const radioSlide = document.getElementById('tipo-slide');
    
    selectMunicipio.addEventListener('change', atualizarViewer);
    radioRelatorio.addEventListener('change', atualizarViewer);
    radioSlide.addEventListener('change', atualizarViewer);
}

function atualizarViewer() {
    const municipioSelecionado = document.getElementById('select-municipio').value;
    const tipoSelecionado = document.querySelector('input[name="tipo-documento"]:checked').value;
    
    const placeholder = document.getElementById('placeholder-relatorio');
    const iframe = document.getElementById('pdf-viewer');
    const erroContainer = document.getElementById('erro-acesso');
    const linkDireto = document.getElementById('link-direto');
    
    // Esconde todos os elementos
    placeholder.style.display = 'none';
    iframe.style.display = 'none';
    erroContainer.style.display = 'none';
    
    if (!municipioSelecionado) {
        placeholder.style.display = 'block';
        return;
    }
    
    const dadosMunicipio = relatoriosData.find(item => item.municipio === municipioSelecionado);
    
    if (dadosMunicipio) {
        const url = tipoSelecionado === 'relatorio' ? dadosMunicipio.relatorio : dadosMunicipio.slide;
        
        // Configura link direto
        const linkUrl = url.replace('/preview', '/view').replace('/embed', '/edit');
        linkDireto.href = linkUrl;
        
        // Tenta carregar no iframe
        iframe.src = url;
        iframe.style.display = 'block';
        
        // Detecta erro de carregamento
        iframe.onload = function() {
            // Se carregou com sucesso, mantém o iframe
        };
        
        iframe.onerror = function() {
            iframe.style.display = 'none';
            erroContainer.style.display = 'block';
        };
        
        // Timeout para detectar problemas de acesso
        setTimeout(() => {
            try {
                // Se não conseguir acessar o conteúdo, mostra erro
                if (iframe.contentDocument === null) {
                    iframe.style.display = 'none';
                    erroContainer.style.display = 'block';
                }
            } catch (e) {
                iframe.style.display = 'none';
                erroContainer.style.display = 'block';
            }
        }, 3000);
    }
}

// Carrega os relatórios quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarRelatorios);