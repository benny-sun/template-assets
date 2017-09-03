<?php
/**
 * Created by PhpStorm.
 * User: Haogood
 * Date: 2017/9/3
 * Time: 下午 04:51
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$mail = new PHPMailer(true);
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
//    $mail->Host = 'smtp.gmail.com';
//    $mail->Username = 'xeriok90686@gmail.com';                 // SMTP username
//    $mail->Password = 'daniel12369daniel12369';                           // SMTP password
    $mail->Host = 'mail.lirii.net';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'haogood@lirii.net';                 // SMTP username
    $mail->Password = 'benny_sun1994';                           // SMTP password
    $mail->SMTPSecure = false;                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 2525;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('haogood@lirii.net', 'Mailer');
    $mail->addAddress('ben831001@gmail.com', 'Joe User');     // Add a recipient
    $mail->addAddress('u0224083@mis.nkfust.edu.tw');               // Name is optional
//    $mail->addReplyTo('info@example.com', 'Information');
//    $mail->addCC('cc@example.com');
//    $mail->addBCC('bcc@example.com');

    //Attachments
//    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}