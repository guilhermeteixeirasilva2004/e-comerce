// URL base da sua API Spring Boot
const apiUrl = 'http://localhost:8080/produtos';

// Elementos do DOM
const form = document.getElementById('form-produto');
const listaProdutosDiv = document.getElementById('lista-produtos');

/**
 * Função para buscar todos os produtos da API e exibi-los na tela.
 */
async function listarProdutos() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos: ' + response.statusText);
        }
        const produtos = await response.json();
        
        // Limpa a lista atual antes de adicionar os novos itens
        listaProdutosDiv.innerHTML = ''; 

        // Cria e adiciona cada produto na lista do HTML
        produtos.forEach(produto => {
            const produtoItem = document.createElement('div');
            produtoItem.className = 'produto-item';
            
            // Adiciona o nome e o preço formatado
            const produtoInfo = document.createElement('span');
            produtoInfo.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
            
            // Cria o botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = () => deletarProduto(produto.id); // Adiciona o evento de clique

            produtoItem.appendChild(produtoInfo);
            produtoItem.appendChild(deleteButton);
            listaProdutosDiv.appendChild(produtoItem);
        });

    } catch (error) {
        console.error('Falha na requisição:', error);
        listaProdutosDiv.innerHTML = '<p>Não foi possível carregar os produtos.</p>';
    }
}

/**
 * Função para cadastrar um novo produto.
 */
async function cadastrarProduto(event) {
    event.preventDefault(); // Evita o recarregamento da página ao submeter o form

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;

    const novoProduto = {
        nome: nome,
        preco: parseFloat(preco)
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar produto: ' + response.statusText);
        }

        form.reset(); // Limpa o formulário
        listarProdutos(); // Atualiza a lista de produtos na tela

    } catch (error) {
        console.error('Falha ao cadastrar:', error);
        alert('Não foi possível cadastrar o produto.');
    }
}

/**
 * Função para deletar um produto pelo ID.
 */
async function deletarProduto(id) {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar produto: ' + response.statusText);
        }

        listarProdutos(); // Atualiza a lista de produtos na tela

    } catch (error) {
        console.error('Falha ao deletar:', error);
        alert('Não foi possível deletar o produto.');
    }
}

// Event Listeners
// Adiciona o listener para o evento de submit do formulário
form.addEventListener('submit', cadastrarProduto);

// Chama a função para listar os produtos assim que a página é carregada
document.addEventListener('DOMContentLoaded', listarProdutos);
