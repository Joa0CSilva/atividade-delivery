'use strict';

const tbody = document.querySelector('#tbody-produtos');
const formulario = document.querySelector('.form-produto');

let produtoEditando = null;
let produtos = [];
let estoque = [];

// =========================
// CARREGAR DADOS DA API
// =========================
async function carregarDados() {

    const respostaProdutos = await fetch(
        'https://hortifruti-api-1-ioyc.onrender.com/produtos'
    );

    const respostaEstoque = await fetch(
        'https://hortifruti-api-1-ioyc.onrender.com/estoque'
    );

    produtos = await respostaProdutos.json();
    estoque = await respostaEstoque.json();

    listarProdutos();
}

// =========================
// LISTAR PRODUTOS
// =========================
function listarProdutos() {

    tbody.innerHTML = '';

    produtos.forEach(produto => {

        const estoqueProduto = estoque.find(
            item => item.produtoId === produto.id
        );

        const quantidade = estoqueProduto
            ? estoqueProduto.quantidade
            : 0;

        tbody.innerHTML += `
            <tr>
                <td>${produto.id}</td>

                <td>${produto.nome}</td>

                <td>${produto.categoria}</td>

                <td>
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace('.', ',')}
                </td>

                <td>${quantidade}</td>

                <td>
                    <button
                        class="btn-acao"
                        onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button
                        class="btn-acao"
                        onclick="excluirProduto(${produto.id})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

}

// =========================
// EDITAR PRODUTO
// =========================
function editarProduto(id) {

    document.querySelector('.btn-cadastrar')
        .textContent = 'Salvar Alterações';

    const produto = produtos.find(
        produto => produto.id === id
    );

    const estoqueProduto = estoque.find(
        item => item.produtoId === id
    );

    document.querySelector('#nome').value =
        produto.nome;

    document.querySelector('#preco').value =
        produto.preco;

    document.querySelector('#categoria').value =
        produto.categoria;

    document.querySelector('#unidade').value =
        produto.unidade;

    document.querySelector('#imagem').value =
        produto.imagem;

    document.querySelector('#descricao').value =
        produto.descricao;

    document.querySelector('#estoque').value =
        estoqueProduto
            ? estoqueProduto.quantidade
            : 0;

    produtoEditando = id;
}

// =========================
// EXCLUIR PRODUTO
// =========================
async function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) {
        return;
    }

    await fetch(
        `https://hortifruti-api-1-ioyc.onrender.com/produtos/${id}`,
        {
            method: 'DELETE'
        }
    );

    const estoqueProduto = estoque.find(
        item => item.produtoId === id
    );

    if (estoqueProduto) {

        await fetch(
            `https://hortifruti-api-1-ioyc.onrender.com/estoque/${estoqueProduto.id}`,
            {
                method: 'DELETE'
            }
        );

    }

    await carregarDados();

    alert('✅ Produto excluído com sucesso!');
}

// =========================
// CADASTRAR / EDITAR
// =========================
formulario.addEventListener(
    'submit',
    async (event) => {

        event.preventDefault();

        const nome =
            document.querySelector('#nome').value;

        const preco =
            Number(
                document.querySelector('#preco').value
            );

        const categoria =
            document.querySelector('#categoria').value;

        const unidade =
            document.querySelector('#unidade').value;

        const imagem =
            document.querySelector('#imagem').value;

        const descricao =
            document.querySelector('#descricao').value;

        const quantidade =
            Number(
                document.querySelector('#estoque').value
            );

        // =====================
        // EDITAR
        // =====================
        if (produtoEditando !== null) {

            await fetch(
                `https://hortifruti-api-1-ioyc.onrender.com/produtos/${produtoEditando}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type':
                            'application/json'
                    },
                    body: JSON.stringify({
                        id: produtoEditando,
                        nome,
                        preco,
                        categoria,
                        unidade,
                        imagem,
                        descricao
                    })
                }
            );

            const estoqueProduto = estoque.find(
                item =>
                    item.produtoId === produtoEditando
            );

            if (estoqueProduto) {

                await fetch(
                    `https://hortifruti-api-1-ioyc.onrender.com/estoque/${estoqueProduto.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            id: estoqueProduto.id,
                            produtoId: produtoEditando,
                            quantidade
                        })
                    }
                );

            }

            produtoEditando = null;

            document.querySelector('.btn-cadastrar')
                .textContent =
                'Cadastrar Produto';

            await carregarDados();

            formulario.reset();

            alert(
                '✅ Produto editado com sucesso!'
            );

            return;
        }

        // =====================
        // NOVO PRODUTO
        // =====================

        const novoId =
            produtos.length > 0
                ? Math.max(
                    ...produtos.map(
                        produto => produto.id
                    )
                ) + 1
                : 1;

        const novoProduto = {
            id: novoId,
            nome,
            preco,
            categoria,
            unidade,
            imagem,
            descricao
        };

        await fetch(
            'https://hortifruti-api-1-ioyc.onrender.com/produtos',
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                body: JSON.stringify(novoProduto)
            }
        );

        await fetch(
            'https://hortifruti-api-1-ioyc.onrender.com/estoque',
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json'
                },
                body: JSON.stringify({
                    produtoId: novoId,
                    quantidade
                })
            }
        );

        await carregarDados();

        formulario.reset();

        alert(
            '✅ Produto cadastrado com sucesso!'
        );

    }
);

// =========================
// INICIALIZAÇÃO
// =========================
carregarDados();