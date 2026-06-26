// ============================================================
// Stack de tecnologias — dados e comportamento do modal
// ============================================================
const STACK = [
  { name:'Python', color:'#185FA5', bg:'#E6F1FB', category:'Linguagem principal',
    desc:'Linguagem principal utilizada para coleta de dados via APIs, transformação de dados com Pandas e construção de aplicações web com Flask.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'💱', name:'arbitrage-brl-ars'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'Pandas', color:'#185FA5', bg:'#E6F1FB', category:'Biblioteca Python',
    desc:'Biblioteca para manipulação e transformação de dados tabulares. Utilizada para limpar, filtrar e converter dados JSON em formato Parquet.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'DuckDB', color:'#185FA5', bg:'#E6F1FB', category:'Biblioteca Python',
    desc:'Banco de dados analítico embarcado que executa SQL diretamente sobre arquivos Parquet — inclusive remotos no S3 via extensão httpfs. Alternativa local ao Athena para exploração e desenvolvimento.',
    projects:[{icon:'🏗️', name:'crypto-dw'}] },
  { name:'Polars', color:'#185FA5', bg:'#E6F1FB', category:'Biblioteca Python',
    desc:'Alternativa moderna ao Pandas com melhor performance para grandes volumes de dados, escrita em Rust com API Python.',
    projects:[] },
  { name:'AWS S3', color:'#D85A30', bg:'#FAECE7', category:'Cloud AWS',
    desc:'Serviço de armazenamento de objetos da AWS utilizado como data lake. Armazena dados brutos (JSON) e processados (Parquet) particionados por data.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'💱', name:'arbitrage-brl-ars'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'AWS Athena', color:'#D85A30', bg:'#FAECE7', category:'Cloud AWS',
    desc:'Query engine serverless da AWS que permite executar SQL diretamente sobre arquivos no S3. Custo baseado em dados escaneados — sem servidor para gerenciar.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'AWS Lambda', color:'#D85A30', bg:'#FAECE7', category:'Cloud AWS',
    desc:'Serviço de computação serverless da AWS. Permite executar funções Python sob demanda ou agendadas sem provisionar servidores.',
    projects:[] },
  { name:'SQL', color:'#0F6E56', bg:'#E1F5EE', category:'Linguagem de consulta',
    desc:'Linguagem padrão para consulta e modelagem de dados relacionais. Utilizado no Athena para análise dos dados coletados pelos pipelines.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'Star Schema', color:'#0F6E56', bg:'#E1F5EE', category:'Modelagem de dados',
    desc:'Modelo dimensional com tabela fato e dimensões. Usado para organizar dados históricos de criptomoedas em um Data Warehouse consultável via SQL.',
    projects:[{icon:'🏗️', name:'crypto-dw'}] },
  { name:'Apache Parquet', color:'#0F6E56', bg:'#E1F5EE', category:'Formato de arquivo',
    desc:'Formato de arquivo colunar otimizado para big data. Compressão eficiente e leitura seletiva de colunas — padrão da indústria em engenharia de dados.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'🏗️', name:'crypto-dw'}] },
  { name:'Flask', color:'#534AB7', bg:'#EEEDFE', category:'Framework web',
    desc:'Microframework Python para construção de aplicações web e APIs REST. Utilizado para servir o dashboard de arbitragem com rotas e templates Jinja2.',
    projects:[{icon:'💱', name:'arbitrage-brl-ars'}] },
  { name:'Git', color:'#534AB7', bg:'#EEEDFE', category:'Controle de versão',
    desc:'Sistema de controle de versão distribuído. Todos os projetos são versionados e publicados no GitHub com commits semânticos.',
    projects:[{icon:'🪙', name:'crypto-pipeline'},{icon:'💱', name:'arbitrage-brl-ars'},{icon:'🏗️', name:'crypto-dw'}] },
];

// ============================================================
// Renderiza os pills da stack
// ============================================================
const grid = document.getElementById('stack-grid');

STACK.forEach((s, i) => {
  const pill = document.createElement('span');
  pill.className = 'stack-pill';
  pill.innerHTML = `<span class="stack-dot" style="background:${s.color}"></span>${s.name}`;
  pill.addEventListener('click', () => openModal(i));
  grid.appendChild(pill);
});

// ============================================================
// Modal
// ============================================================
function openModal(i) {
  const s = STACK[i];

  document.getElementById('modal-icon').style.cssText = `background:${s.bg};color:${s.color}`;
  document.getElementById('modal-icon').textContent = s.name.substring(0, 2).toUpperCase();
  document.getElementById('modal-name').textContent = s.name;
  document.getElementById('modal-category').textContent = s.category;
  document.getElementById('modal-desc').textContent = s.desc;

  const proj = document.getElementById('modal-projects');
  if (s.projects.length) {
    proj.innerHTML = s.projects.map(p =>
      `<div class="modal-project"><span class="modal-project-icon">${p.icon}</span><span>${p.name}</span></div>`
    ).join('');
  } else {
    proj.innerHTML = '<div class="modal-project" style="color:#888780">Em estudo — ainda não aplicado em projetos</div>';
  }

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay') && e.target !== document.querySelector('.modal-close')) return;
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal({});
});
