<?php
include 'config.php'; // Inclua seu arquivo de configuração com as credenciais do banco de dados

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado para inserção
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $nome_animal = $_POST['nome_animal'];
    $data_consulta = $_POST['data_consulta'];
    $hora_consulta = $_POST['hora_consulta'];
    $nome_veterinario = $_POST['nome_veterinario'];

    // Prepara a instrução SQL para inserção
    $stmt = $conn->prepare("INSERT INTO consultas (nome, nome_animal, data_consulta, hora_consulta, nome_veterinario) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nome, $nome_animal, $data_consulta, $hora_consulta, $nome_veterinario);

    if ($stmt->execute()) {
        $message = "Consulta agendada com sucesso!";
    } else {
        $message = "Erro: " . $stmt->error;
    }

    $stmt->close();
}

// Seleciona todas as consultas do banco de dados para exibir no calendário
$sql = "SELECT consulta_id, nome, nome_animal, data_consulta, hora_consulta, nome_veterinario FROM consultas";
$result = $conn->query($sql);

$eventos = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $eventos[] = array(
            'id' => $row['consulta_id'],
            'title' => $row['nome'] . " - " . $row['nome_animal'] . " com " . $row['nome_veterinario'],
            'start' => $row['data_consulta'] . 'T' . $row['hora_consulta']
        );
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agendamento de Consulta</title>
    <link href='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.css' rel='stylesheet' />
    <link href="servicoConsulta.css" rel="stylesheet">
</head>
<body>
    <a href="aukimia(home).html"><img src="logo aukimia.png" alt="Logo" class="logo"></a>
    <h1>Agendamento de Consulta</h1>

    <!-- Mensagem de Sucesso ou Erro -->
    <?php if (!empty($message)): ?>
        <p><?php echo htmlspecialchars($message); ?></p>
    <?php endif; ?>
    
    <!-- Formulário de Agendamento -->
    <div class="form-container">
        <form action="" method="POST">
            <label for="nome">Nome do Cliente:</label>
            <input type="text" id="nome" name="nome" required>

            <label for="nome_animal">Nome do Animal:</label>
            <input type="text" id="nome_animal" name="nome_animal" required>

            <label for="data_consulta">Data da Consulta:</label>
            <input type="date" id="data_consulta" name="data_consulta" required>

            <label for="hora_consulta">Hora da Consulta:</label>
            <input type="time" id="hora_consulta" name="hora_consulta" required>
        
            <label for="nome_veterinario">Nome do Veterinário:</label>
            <input type="text" id="nome_veterinario" name="nome_veterinario" required>

            <button type="submit">Agendar Consulta</button>
        </form>
    </div>

    <!-- Calendário -->
    <div class="calendar-container">
        <div id='calendar'></div>
    </div>

    <script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.15/index.global.min.js'></script>
    <script src='servicoConsulta.js'></script>
</body>
</html>