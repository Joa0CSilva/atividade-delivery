'use strict'

// Mostrar produtos //
const container = document.querySelector('#produtos')

function mostrarProdutos(listaProdutos) {

    container.innerHTML = ''

    listaProdutos.forEach((produto) => {
        
    const estoqueProduto = estoque.find(
    item => item.produtoId === produto.id
    );

    const quantidade = estoqueProduto
        ? estoqueProduto.quantidade
        : 0;

    const status = quantidade > 0
        ? '✅ Disponível'
        : '❌ Indisponível';

        container.innerHTML += `
        <div class="card" onclick="abrirModal(${produto.id})">

            <div class="container-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}"
                width="200" height="150"
                class="imagem-produto">
            </div>
            
            <div class="container-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p>${status}</p>
                <p>Estoque: ${quantidade}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            </div>
        </div>
        `
    })
}

mostrarProdutos(produtos)


// Modal //
function abrirModal(id){

    const produto = produtos.find(
        produto => produto.id === id
    );

        const estoqueProduto = estoque.find(
    item => item.produtoId === produto.id
    );

    const quantidade = estoqueProduto
        ? estoqueProduto.quantidade
        : 0;

    const status = quantidade > 0
        ? '✅ Disponível'
        : '❌ Indisponível';

    document.querySelector('#modal-imagem').src =
        produto.imagem;

    document.querySelector('#modal-nome').textContent =
        produto.nome;

    document.querySelector('#modal-categoria').textContent =
        `Categoria: ${produto.categoria}`;

    document.querySelector('#modal-unidade').textContent =
        `Unidade: ${produto.unidade}`;

    document.querySelector('#modal-preco').textContent =
        `Preço: R$ ${produto.preco.toFixed(2)}`;

    document.querySelector('#modal-descricao').textContent =
        produto.descricao;

    document.querySelector('#modal-quantidade').textContent =
        `Estoque: ${quantidade}`;

    document.querySelector('#modal-status').textContent =
        `Status: ${status}`;

    document.querySelector('#modal').style.display =
        'flex';
}

// Pesquisa //
const pesquisa = document.querySelector('#pesquisa')

pesquisa.addEventListener('input', () => {
    const texto = pesquisa.value.toLowerCase()

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(texto)
    )

    mostrarProdutos(produtosFiltrados)
})


// Filtro por categoria //

// Filtro por categoria //
const categoria = document.querySelector('#categoria')

categoria.addEventListener('change', () => {

    const categoriaSelecionada = categoria.value

    if (categoriaSelecionada === '') {
        mostrarProdutos(produtos)
        return
    }

    if (categoriaSelecionada === '') {
        mostrarProdutos(produtos)
        return
    }

    const produtosFiltrados = produtos.filter(produto =>
        produto.categoria.toLowerCase() === 
        categoriaSelecionada.toLowerCase()
    )
    mostrarProdutos(produtosFiltrados)
})

document
    .querySelector('#fechar-modal')
    .addEventListener('click', () => {

        document.querySelector('#modal')
            .style.display = 'none';

    });