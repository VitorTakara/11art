<?php 
    //session_start();
    // date_default_timezone_set("America/Sao_Paulo");
    // $DataAbertura = date("Y-m-d");

    require_once('phpMailer/class.phpmailer.php');
    

    //----- DADOS ENVIADOS DO FORMULARIO ------
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $mensagem = $_POST['mensagem'];
    //-----------------------------------------

    
    $mail = new PHPMailer(true); //criar um novo mailer para poder enviar meu email
    $mail->IsSMTP(); //tipo de email é SMTP
    
    try{
        $mail->Host = 'smtp.umbler.com'; //servidor de smpt que será usado
        $mail->SMTPAuth = true; //autenticação
        $mail->Port = 587; //porta do servidor
        $mail->Username = 'contato@11art.com.br';
        $mail->Password = 'senha'; //digitar a senha
        // $mail->SMTPSecure = 'tls'; //segurança do email

        $mail->SetFrom('contato@11art.com.br', '11Art'); //quem esta enviando o email
        $mail->addAddress($email); //quem vai receber o email
        //$mail->AddCC('email@email.com'); //CC
        //$mail->AddBCC('email@email.com'); //CCo
        $mail->Subject = "Obrigado por entrar em contato conosco!";
        

        //--------------------------------------------------------
        //corpo da mensagem que será enviada por email
        $MensagemCompleta = "
        <p>Nome: $nome </p>
        <p>Email: $email </p>
        <p>Mensagem: $mensagem </p>
        ";

        $mail->MsgHTML($MensagemCompleta); //conteudo da mensagem
         //--------------------------------------------------------
         

        $mail->Send();

        // $_SESSION["success"] = "Mensagem enviada com sucesso"; //nao sei o q ele faz
        header("Location: email-enviado.html"); //redirecionamento

    } catch (phpmailerException $e) {
        // Mensagem de erro costumizada do PHPMailer

        // $_SESSION["danger"] = "Error ao enviar a mensagem" . $mail->ErrorInfo; //nao sei o q ele faz
        header("Location: email-nao-enviada.html"); //redirecionamento
        
    }
  
?>

