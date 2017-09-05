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

$name = $_POST['Name'];
$email = $_POST['Email'];
$career = $_POST['Career'];
$msg = $_POST['message'];
$err_keys = ['name'];
$isError = false;
$error_msg = [
    'name' => '',
    'email' => '',
    'career' => '',
    'msg' => ''
];

if ($name == '') {
    $error_msg['name'] = '請輸入您的稱呼';
}

if ($email == '') {
    $error_msg['email'] = '請輸入聯絡方式，Email或電話';
}

if ($career == '') {
    $error_msg['career'] = '請選擇職業';
}

if ($msg == '') {
    $error_msg['msg'] = '請輸入內容';
}

foreach ($error_msg as $value) {
    if ($value !== '') {
        $isError = true;
    }
}

if ($isError) {
    echo json_encode($error_msg);
    die();
} else {
    echo 'no error';
}

sleep(2);

die(); //---------

$mail = new PHPMailer(true);
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'jp1.fcomet.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'haogood@lirii.net';                 // SMTP username
    $mail->Password = 'benny_sun1994';                           // SMTP password
    $mail->SMTPSecure = '';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('haogood@lirii.net', 'Mailer');
    $mail->addAddress('ben831001@gmail.com', 'Eddie');     // Add a recipient
    $mail->addAddress('u0224083@mis.nkfust.edu.tw', 'Support');               // Name is optional
//    $mail->addReplyTo('info@example.com', 'Information');
//    $mail->addCC('cc@example.com');
//    $mail->addBCC('bcc@example.com');

    //Attachments
//    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    mb_internal_encoding('UTF-8');
    $mail->Subject = mb_encode_mimeheader('康碁官網 客戶'.$name.'來信', 'UTF-8');
    $mail->Body    = '客戶職業：<b>'.$career.'</b><br>'.
        '聯絡方式：'.$email.'<br>'.
        '訊息內容：<p>'.$msg.'</p>';
    $mail->AltBody = 'From concepoint.com '.date('Y-m-d H:i:s');    //can see in plain text mode

    $mail->send();
    echo 'no error';
} catch (Exception $e) {
//    echo 'Message could not be sent.';
//    echo 'Mailer Error: ' . $mail->ErrorInfo;
}
