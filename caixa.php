<?php
include 'db_connect.php';

// Processar o cadastro de cliente
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['cadastrar_cliente'])) {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];

    $sql = "INSERT INTO clientes (nome, email, telefone) VALUES ('$nome', '$email', '$telefone')";
    if ($conn->query($sql) === TRUE) {
        $cliente_id = $conn->insert_id;
        echo "<p>Cliente cadastrado com sucesso!</p>";
    } else {
        echo "<p>Erro: " . $conn->error . "</p>";
    }
}

// Registrar a venda
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['registrar_venda'])) {
    $cliente_id = isset($_POST['cliente_id']) && !empty($_POST['cliente_id']) ? $_POST['cliente_id'] : 'NULL';
    $data_venda = date('Y-m-d H:i:s');

    $sql = "INSERT INTO vendas (cliente_id, data_venda) VALUES ($cliente_id, '$data_venda')";
    if ($conn->query($sql) === TRUE) {
        $venda_id = $conn->insert_id;

        foreach ($_POST['produtos'] as $produto_id => $dados) {
            $quantidade = $dados['quantidade'];
            $preco_unitario = $dados['preco'];
            $total = $quantidade * $preco_unitario;

            $sql = "INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco_unitario, total) VALUES 
                    ($venda_id, $produto_id, $quantidade, $preco_unitario, $total)";
            $conn->query($sql);
        }

        echo "<p>Venda registrada com sucesso!</p>";
    } else {
        echo "<p>Erro ao registrar venda: " . $conn->error . "</p>";
    }
}

// Puxar produtos do banco de dados
$sql = "SELECT * FROM produtos";
$result = $conn->query($sql);

// Fechar conexão
$conn->close();
?>
