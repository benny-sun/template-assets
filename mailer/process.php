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

// 接收表單內容
$name = $_POST['Name'];
$email = $_POST['Email'];
$career = $_POST['Career'];
$msg = nl2br($_POST['message']);    //nl2br支援換行符號

// 表單正確錯誤旗標
$isError = false;
$error_msg = [
    'name' => '',
    'email' => '',
    'career' => '',
    'msg' => ''
];

if ($name == '') {
    $error_msg['name'] = '請填入您的姓名';
}

if ($email == '') {
    $error_msg['email'] = '請填入您的聯絡方式，Email或電話';
}

if ($career == '') {
    $error_msg['career'] = '請選擇職業';
}

if ($msg == '') {
    $error_msg['msg'] = '請填入訊息內容';
}

foreach ($error_msg as $value) {
    if ($value !== '') {
        $isError = true;
    }
}

// 拋回錯誤訊息
if ($isError) {
    echo json_encode($error_msg);
    die();
}

$mail = new PHPMailer(true);
try {
    //Server settings
    $mail->SMTPDebug = 0;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'jp1.fcomet.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'mailer@concepoint.com';                 // SMTP username
    $mail->Password = 'E25010238';                           // SMTP password
    $mail->SMTPSecure = '';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 25;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('mailer@concepoint.com', 'Concepoint Mailer');
    $mail->addAddress('eddie.sun@concepoint.com', 'Eddie Sun');     // Add a recipient
    $mail->addAddress('angela.wang@concepoint.com', 'Angela Wang');               // Name is optional
    $mail->addAddress('support@concepoint.com', 'Support');
    $mail->addAddress('ben831001@gmail.com');

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->CharSet = 'UTF-8';
    mb_internal_encoding('UTF-8');
    $mail->Subject = '康碁官網 客戶:'.$name.' 來信';
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
