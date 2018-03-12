<?php
/**
 * Created by PhpStorm.
 * User: yyh
 * Date: 18-3-12
 * Time: 下午8:52
 */
session_start();
/*
 * ...然后各种验证，尽以验证码为例
 */
if($_SESSION['CodeStr'] != $_POST['code']){
    $result = [
        'code' => 1,
        'msg' => '验证码不正确'
    ];
}else{

    $result = [
        'code' => 0,
        'msg' => '登录成功'
    ];
}

echo json_encode($result);