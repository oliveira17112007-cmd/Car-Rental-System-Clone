document.addEventListener("DOMContentLoaded", () => {

    /* ====================================================
       1. BASE DE DADOS (FROTA)
       ==================================================== */
    const veiculos = [
        { id: 1, marca: "Fiat", modelo: "500", categoria: "carro", imagem: "img/fiat-500.jpg", portas: 2, pessoas: 4, malas: 2, transmissao: "M" },
        { id: 2, marca: "Fiat", modelo: "500 C", categoria: "carro", imagem: "img/fiat-500-descapotavel.jpg", portas: 2, pessoas: 4, malas: 2, transmissao: "M" },
        { id: 3, marca: "Fiat", modelo: "Panda", categoria: "carro", imagem: "img/fiat-panda.jpg", portas: 5, pessoas: 4, malas: 3, transmissao: "M" },
        { id: 4, marca: "Peugeot", modelo: "208", categoria: "carro", imagem: "img/peugeot_208_automatico.jpg", portas: 5, pessoas: 5, malas: 2, transmissao: "A" },
        { id: 5, marca: "Nissan", modelo: "Juke", categoria: "carro", imagem: "img/nissan-juke-manual.jpg", portas : 5, pessoas : 5, malas : 2, transmissao : "M" },
        { id : 6 , marca : "Fiat" , modelo : "600" , categoria : "carro" , imagem : "img/cat-mini-fiat-600-aut.jpg" , portas : 5 , pessoas : 5 , malas : 2 , transmissao : "A" },
        { id: 7, marca: "Peugeot", modelo: "308", categoria: "carro", imagem: "img/peugeot-308.jpg", portas: 5, pessoas: 5, malas: 2, transmissao: "M" },
        { id: 8, marca: "Peugeot", modelo: "2008", categoria: "carro", imagem: "img/peugeot-2008.jpg", portas: 5, pessoas: 5, malas: 2, transmissao: "M" },
        { id: 9, marca: "Peugeot", modelo: "E-Traveller", categoria: "carrinha", imagem: "img/peugeot-traveller.jpg", portas : 4, pessoas : 9, malas : 6, transmissao : "A" },
        { id: 10, marca: "Mercedes-Benz", modelo: "Vito", categoria: "carrinha", imagem: "img/mercedes-vito-cdi.jpg", portas : 4, pessoas : 9, malas : 6, transmissao : "A" },
        { id: 11, marca: "Ford", modelo: "Transit", categoria: "carrinha", imagem: "img/ford-tourneo.jpg", portas : 4, pessoas : 9, malas : 6, transmissao : "M" },
    ];

    /* ====================================================
       2. MENU HAMBÚRGUER (MOBILE)
       ==================================================== */
    const hamburgerBtn = document.getElementById('js-hamburger-btn');
    const mainMenu = document.getElementById('js-main-menu');

    if (hamburgerBtn && mainMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('is-active');
        });
    }

    /* ====================================================
       3. FROTA RESPONSIVA (Sem quebras de linha)
       ==================================================== */
    const frotaContainer = document.getElementById('frota-container');
    let indiceAtualFrota = 0;

    // Calcula quantos carros cabem (Matemática: largura / 270px por carro)
    function getCarrosPorPagina() {
        if (!frotaContainer) return 1;
        const larguraContainer = frotaContainer.parentElement.offsetWidth; // Usa a largura da secção Fleet
        
        if (window.innerWidth <= 600) return 1; // Telemóvel
        
        // 270 é a largura estimada de cada cartão + gap
        const possiveis = Math.floor(larguraContainer / 270);
        return Math.max(1, Math.min(4, possiveis));
    }

    function renderizarFrota() {
        if (!frotaContainer) return;

        const limite = getCarrosPorPagina();
        
        // Forçar colunas CSS
        frotaContainer.style.gridTemplateColumns = `repeat(${limite}, 1fr)`;
        
        let html = '';

        // Botão Anterior
        html += `<button class="seta-nav anterior"><i class="fa-solid fa-chevron-left"></i></button>`;

        // Gerar Carros
        for (let i = 0; i < limite; i++) {
            let index = (indiceAtualFrota + i) % veiculos.length;
            if (index < 0) index = veiculos.length + index;
            
            const v = veiculos[index];

            html += `
            <div class="carro-card">
                <img src="${v.imagem}" alt="${v.marca}" class="carro-img" onerror="this.src='fiat-500.jpg'">
                
                <h3 class="carro-nome">${v.marca} ${v.modelo}</h3>
                <p class="carro-categoria">${v.categoria}</p>
                
                <div class="carro-specs">
                    <div class="spec icon-pessoas">
                        <i class="sprite-icon"></i> 
                        <small>${v.pessoas}</small>
                    </div>

                    <div class="spec icon-portas">
                        <i class="sprite-icon"></i> 
                        <small>${v.portas}</small>
                    </div>
                    
                    <div class="spec icon-malas">
                        <i class="sprite-icon"></i> 
                        <small>${v.malas}</small>
                    </div>
                    
                    <div class="spec icon-transmissao">
                        <i class="sprite-icon"></i> 
                        <small>${v.transmissao}</small>
                    </div>

                </div>
                
                <button class="btn-reserva">MAKE RESERVATION <i class="fa-regular fa-circle-check"></i></button>
            </div>
            `;
        }

        // Botão Próximo
        html += `<button class="seta-nav proxima"><i class="fa-solid fa-chevron-right"></i></button>`;
        
        frotaContainer.innerHTML = html;
    }

    // Eventos
    if (frotaContainer) {
        frotaContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('proxima')) {
                indiceAtualFrota++;
                renderizarFrota();
            }
            if (e.target.classList.contains('anterior')) {
                indiceAtualFrota--;
                renderizarFrota();
            }
        });

        renderizarFrota();
        window.addEventListener('resize', renderizarFrota);
    }

    /* ====================================================
       4. FUNCIONALIDADES UI (Banner, Checkbox)
       ==================================================== */
    
    // Banner Rotativo
    const imagensBanner = ['img/imgfundo1.png', 'img/imgfundo2.jpg', 'img/imgfundo3.png', 'img/imgfundo4.png'];
    const banner = document.getElementById('banner-rotativo');
    let indiceBanner = 0;
    if (banner) {
        setInterval(() => {
            indiceBanner = (indiceBanner + 1) % imagensBanner.length;
            banner.src = imagensBanner[indiceBanner];
        }, 5000);
    }

    // Checkbox "Return to different location"
    const checkboxDropoff = document.getElementById('toggle-dropoff');
    const dropoffSelect = document.querySelector('select[name="local_devolucao"]');
    if (checkboxDropoff && dropoffSelect) {
        checkboxDropoff.addEventListener('change', () => {
            if(checkboxDropoff.checked) dropoffSelect.classList.remove('is-hidden');
            else dropoffSelect.classList.add('is-hidden');
        });
    }

    /* ====================================================
       5. LÓGICA DE PESQUISA, VALIDAÇÃO E CÁLCULO
       ==================================================== */
    const modal = document.getElementById('modal-resultados');
    const closeModal = document.querySelector('.close-modal');
    const form = document.getElementById('form-aluguer');
    const modalGrid = document.getElementById('modal-grid-resultados');

    // Fechar modal
    if (closeModal) { 
        closeModal.addEventListener('click', () => modal.classList.add('is-hidden')); 
    }
    window.addEventListener('click', (e) => { 
        if (e.target === modal) modal.classList.add('is-hidden'); 
    });

    // Submissão do Formulário
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 5.1 Capturar Dados
            const categoria = form.categoria_veiculo?.value;
            const dataLev = form.data_levantamento?.value;
            // Se o input time não existir, assume 10:00
            const horaLev = form.querySelector('input[name="hora_levantamento"]')?.value || '10:00';
            const dataDev = form.data_devolucao?.value;
            const dataNascStr = form.querySelector('input[name="data_nascimento"]')?.value;

            // 5.2 Validação de Campos Vazios
            if (!categoria || !dataLev || !dataDev || !dataNascStr) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            // 5.3 Validação de Idade (Mínimo 18 anos)
            // Espera formato DD-MM-YYYY ou YYYY-MM-DD dependendo do input,
            // mas assumindo que o browser force YYYY-MM-DD no type="date" ou o user escreva DD-MM-YYYY
            let diaNasc, mesNasc, anoNasc;
            
            if(dataNascStr.includes('-')) {
                const partes = dataNascStr.split('-');
                if(partes[0].length === 4) { // YYYY-MM-DD
                    anoNasc = parseInt(partes[0]);
                    mesNasc = parseInt(partes[1]) - 1;
                    diaNasc = parseInt(partes[2]);
                } else { // DD-MM-YYYY
                    diaNasc = parseInt(partes[0]);
                    mesNasc = parseInt(partes[1]) - 1;
                    anoNasc = parseInt(partes[2]);
                }
            } else {
                alert("Formato de data inválido."); return;
            }

            const dataNascimento = new Date(anoNasc, mesNasc, diaNasc);
            const hoje = new Date();
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const m = hoje.getMonth() - dataNascimento.getMonth();
            if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }

            if (idade < 18) {
                alert(`Idade insuficiente (${idade} anos). Mínimo 18 anos.`);
                return;
            }

            // 5.4 Validação de Datas (Pickup vs Dropoff)
            const dataHoraInicio = new Date(`${dataLev}T${horaLev}`);
            const dataHoraFim = new Date(`${dataDev}T10:00`); // Assume 10:00 se não houver hora de devolução
            const agora = new Date(); // Data e hora exata de "agora"

            // Verifica se a Data/Hora de Início é anterior a "Agora"
            if (dataHoraInicio < agora) {
                alert("Erro: A data e hora de levantamento não podem ser no passado.");
                return;
            }

            // Verifica se a devolução é anterior ou igual ao levantamento
            if (dataHoraFim <= dataHoraInicio) {
                alert("Erro: Data de devolução deve ser posterior ao levantamento.");
                return;
            }

            // 5.5 Filtrar Veículos pela Categoria
            const veiculosFiltrados = veiculos.filter(v => v.categoria === categoria);
            if (veiculosFiltrados.length === 0) {
                alert("Não temos veículos disponíveis nesta categoria.");
                return;
            }

            // Selecionar até 4 veículos aleatórios dessa categoria
            const veiculosParaMostrar = veiculosFiltrados.sort(() => 0.5 - Math.random()).slice(0, 4);

            // 5.6 Cálculos Financeiros
            // Diferença em dias (arredondado para cima)
            const diasTotais = Math.ceil((dataHoraFim - dataHoraInicio) / (1000 * 60 * 60 * 24));
            
            // Preço base por dia (Simplificado: Carro=30€, Carrinha=60€)
            let precoDia = (categoria === 'carro') ? 30 : 60;
            
            // Taxa One Way (se devolver noutro local)
            let taxaOneWay = (checkboxDropoff && checkboxDropoff.checked) ? 35 : 0;
            
            // Cálculo Final
            const custoTotal = (diasTotais * precoDia) + taxaOneWay;

            // 5.5 Limpa e desenha os resultados
            if (modalGrid) {
                modalGrid.innerHTML = ''; 
                
                veiculosParaMostrar.forEach(v => {
                    const html = `
                    <div class="carro-card">
                        <img src="${v.imagem}" class="carro-img" onerror="this.src='fiat-500.jpg'">
                        <h3 class="carro-nome">${v.marca} ${v.modelo}</h3>
                        
                        <div class="carro-specs">
                                
                                <div class="spec-item icon-pessoas">
                                <i class="sprite-icon"></i> 
                                <span>${v.pessoas}</span>
                                </div>

                                <div class="spec-item icon-malas">
                                <i class="sprite-icon"></i> 
                                <span>${v.malas}</span>
                                </div>

                                <div class="spec-item icon-portas">
                                <i class="sprite-icon"></i> 
                                <span>${v.categoria === 'carrinha' ? 4 : 5}</span>
                                </div>

                                <div class="spec-item icon-transmissao">
                                <i class="sprite-icon"></i> 
                                <span>${v.transmissao}</span>
                                </div>

                        </div>
                        
                        <div style="background:#f9f9f9; padding:10px; margin:15px 0 10px 0; border-radius:4px; text-align:center; width: 100%;">
                            <p style="margin:0; font-size:12px; color:#666;">Total para ${diasTotais} dias</p>
                            <strong style="font-size:18px; color:#007038;">${custoTotal.toFixed(2)}€</strong>
                        </div>
                        
                        <button class="btn-reserva">RESERVAR AGORA</button>
                    </div>`;
                    
                    modalGrid.innerHTML += html;
                });
            }

            // 5.8 Abrir o Modal
            modal.classList.remove('is-hidden');
        });
    }
    
});