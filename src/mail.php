<!-- <meta http-equiv='refresh' content='15; url=http:///myfireplan.by/contacts.html'>
<meta charset="UTF-8" /> -->
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
// require 'phpmailer/src/SMTP.php';

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['tel'];
$message = $_POST['message'];
$file = $_FILES['file'];

$title = 'Заявка с сайта';
$body = '
<h2>Новое письмо</h2>
<p><span>Имя:</span>'.$name.'</p>
<p><span>Почта:</span>'.$email.'</p>
<p><span>Телефон:</span>'.$phone.'</p>
<p><span>Сообщение:</span>'.$message.'</p>
';

$mail = new PHPMailer(true);
// $mail->SMTPDebug = 2;
// $mail->SMTPAuth   = true;
$mail->CharSet = "UTF-8";
// $mail->isSMTP();   

// $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
// $mail->Username   = 'infopb101@gmail.com'; // Логин на почте
// $mail->Password   = 'a1ndik07'; // Пароль на почте
// $mail->SMTPSecure = 'ssl';
// $mail->Port       = 465;
//$mail->addAddress('ellen@example.com');               
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
$mail->setFrom('feedback@myfireplan.by',''.$name.''); // Адрес самой почты и имя отправителя
// $mail->addAddress('infopb101@gmail.com');  

$mail->addAddress('shulepau.vadzim@gmail.com'); 

// $mail->SMTPOptions = array(
//     'ssl' => array(
//         'verify_peer' => false,
//         'verify_peer_name' => false,
//         'allow_self_signed' => true
//     )
// );

    // Прикрепление файлов к письму
    if (!empty($_FILES['file']['name'][0])) {
        for ($ct = 0; $ct < count($_FILES['file']['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['file']['name'][$ct]));
            $filename = $_FILES['file']['name'][$ct];
            if (move_uploaded_file($_FILES['file']['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
            };
         };
        };

// Само письмо
$mail->isHTML(true);  // Задаём формат письма (HTML)
$mail->Subject = 'Заявка с сайта от '.$name.'';
$mail->Body = $body;

if ($mail->send()) {
    echo ('<!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="План эвакуации РБ. График работы компании. Контакты компании. Обратная связь.">
        <link rel="icon" href="favicon.png" type="image/png" sizes="64x64">
        <link rel="icon" href="favicon.ico" type="image/x-icon" sizes="120x120"> 
        <link rel="stylesheet" href="fonts/icon/font/flaticon.css" type="text/css">
        <link rel="stylesheet" href="css/style.css" type="text/css">
        <title>Контакты. План эвакуации РБ</title>
    </head>
    <body>
        <div class="container">
        <header>
            <div class="header__title">
            <div class="header__block-line">
            <div class="block-line__1"><span>План эвакуации</span></div>
            <div class="block-line__2"><span>Изготовление</span></div>
            <div class="block-line__3"><span>Разработка</span></div>
            </div>
            <a name="top"></a>
            <div class="header__contacts">
                <div class="header__mail"><a href="mailto:infopb101@gmail.com" title="Почта" target="_blank">e-mail</a><span class="flaticon-email-at"></span></div>
                <div class="header__vk"><a href="https://vk.com/myfire_plan" title="ВКонтакте" target="_blank">ВКонтакте</a><span class="flaticon-vk-social-logotype"></span></div>
                <div class="header__tel"><a href="tel:+375291382403" title="Телефон" target="_blank">+375 (29) 138 24 03</a><span class="flaticon-telephone"></span></div>
            </div>
            </div>
    
            <nav class="nav__bar">
    
                <div class="flaticon-right-arrow"></div>
    
                <a href="#" class="menu__burger flaticon-menu"></a>
    
                <!-- <div class="search flaticon-search-interface-circular-symbol">
                <input type="search" id="search" name="search" value="введите запрос">
                </div> -->
                <div class="phone">
                <a class="phone__num flaticon-contacts" href="tel:+375291382403"></a><a href="tel:+375291382403">+375 (29) 138 24 03</a>
                </div>
                <div class="clock flaticon-clock"></div>
                  <div class="date flaticon-calendar"></div>
                <ul class="nav__button nav__hidden">
                    <li class="main__button"><a href="index.html">Главная</a></li>
                    <li class="services__button"><a href="#">Услуги</a>
                        <ul class="button-drop">
                            <li class=""><a href="evacuation_plan.html">планы эвакуации</a></li>
                            <!-- <li class=""><a href="traffic_patterns.html">cхемы движения</a></li> -->
                            <li class=""><a href="fire_calculations.html">пожарно-технические расчёты</a></li>
                            <li class=""><a href="products.html">виды и стоимость продукции</a></li>
                        </ul>
                    </li>
                    <li class="payment__button"><a href="delivery.html">Доставка и оплата</a></li>
                    <li class="about-us__button"><a href="about_us.html">О нас</a></li>
                    <li class="contacts__button nav__button-active"><a href="contacts.html">Контакты</a></li>
                </ul>
            </nav>
        </header>
        
        <main class="main__send">
            
            <section>
                <p><strong>Письмо отправлено. Спасибо за обращение.</strong></p>
                <p><strong>Имя:</strong> '.$name.'</p>
                <p><strong>E-mail:</strong> '.$email.'</p>
                <p><strong>Телефон:</strong> '.$phone.'</p>
                <p><strong>Сообщение:</strong> '.$message.'</p>
                <p><strong>Добавлено файлов:</strong> '.$ct.'</p>
                <p><a href="index.html">Перейти на главную страницу.</a></p>
            </section>
            
        </main>
        
        <footer>
            <div class="schedule">
                <p>Всегда на связи</p>
                <ul>
                    <li>Понедельник - с 7:00 до 23:00</li>
                    <li>Вторник - с 7:00 до 23:00</li>
                    <li>Среда - с 7:00 до 23:00</li>
                    <li>Четверг - с 7:00 до 23:00</li>
                    <li>Пятница - с 7:00 до 23:00</li>
                    <li>Суббота - с 9:00 до 19:00</li>
                    <li>Воскресенье - с 9:00 до 19:00</li>
                </ul>
            </div>
            <div class="map">
                <p>Карта</p>
                <div>
                <a href="index.html#top">Главная</a>
                <a href="delivery.html">Доставка</a>
                <a href="delivery.html">Оплата</a>
                <a href="about_us.html">О нас</a>
                <a href="contacts.html">Контакты</a>
                <a href="products.html">Продукция</a>
            </div>
            </div>
            <div class="contacts">
                <p>Контакты</p>
                <div>
                <a href="tel:+375291382403" title="Телефон" target="_blank"><span class="flaticon-telephone"></span>  +375 (29) 138 24 03</a>
                <a href="https://vk.com/myfire_plan" title="ВКонтакте" target="_blank"><span class="flaticon-vk-social-logotype"></span> ВКонтакте</a>
                <a href="mailto:infopb101@gmail.com" title="Почта" target="_blank"><span class="flaticon-email-at"></span> e-mail</a>
            </div>
            </div>
        </footer>
        </div>
        
    <script defer src="js/script.js"></script>
    
    </body>
    </html>');

} else {

    echo ('Сообщение не было отправлено. Неверно указаны настройки вашей почты');

};

?>