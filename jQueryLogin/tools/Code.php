<?php
session_start();
/**
 * Created by PhpStorm.
 * User: yyh
 * Date: 18-3-8
 * Time: 下午7:58
 */
/**
 * 制作验证码
 * imagettftext($img,字体大小(榜为单位),角度，x,y,颜色,字体库，文字内容)
 */
//创建头部文件
header('Content-type:image/png');

class code{
    public $img = '';
    //获取最后的那个验证码里面的文字
    public $code_font_str = '';
    //定义画布的宽和高
    private $width = '';
    private $height = '';
    //创建画布
    public function __construct($width = 150,$height = 80,$bgcolor = '')
    {
        $this->img = imagecreatetruecolor($width, $height);
        //填充背景颜色
//        if($bgcolor != ''){
//            imagefill($this->img, 0, 0, $this->bgColor());
//        }else{
//
//        }
        $bg = imagecolorallocatealpha($this->img , 0 , 0 , 0 , 127);//拾取一个完全透明的颜色，不要用imagecolorallocate拾色
        imagealphablending($this->img , false);//关闭混合模式，以便透明颜色能覆盖原画板
        imagefill($this->img, 0 , 0 , $bg);//填充

        imagefill($this->img, 0, 0, $bg);
        $this->width = $width;
        $this->height = $height;
    }

    /**
     * 这里返回出这个图片去
     */
//    public function codeImg(){
//
//        return $this;
//    }

    public function getColor(){
        //设置多个随机颜色
        $color = imagecolorallocate($this->img, rand(0, 255), rand(0, 255), rand(0, 255));
        return $color;
    }
    public function bgColor(){
        //设置画布的背景颜色(200-255)是因为想让颜色浅一点
        $bgColor = imagecolorallocate($this->img, rand(100, 255), rand(100, 255), rand(100, 255));
        return $bgColor;
    }
//    $ttf =  './ttf/simkai.ttf'
    public function fonts($length = 3,$size=20,$ttf = './ttf/simkai.ttf'){
        $strs = '奥斯卡大路上看到就爱上就打了卡就是打卡时间看大家看撒娇的卡里就奥斯卡的理解爱老师就打了卡手机看爱上登记卡开始到静安寺路口奥斯卡级奥斯卡的骄傲了开始觉得123456789qwertyuiopasdfghjklzxcvbnm奥斯卡的骄傲了开始阶段来看';
        //定义一个空数组
        $arrs = [];
        //然后讲字符串拆分，然后讲单个字写到数组里面
        for($i = 0;$i <= mb_strlen($strs,'utf-8') - 1;$i++){
            $arrs[$i] = mb_substr($strs,$i,1,'utf-8');
        }
        //计算这个数组的长度
        $len = count($arrs);
        //定义这个最终里面的文字

        for($i = 0;$i < $length;$i++){
            $font = $arrs[rand(0,$len - 1)];
            $this->code_font_str .= $font;
            //循环里面的字，全部随机
//            rand($i*30,$i*60)
            imagettftext($this->img, $size, rand(0,30), $this->width / $length * $i + 10 , $this->height / 2 + $size / 2, $this->getColor(), $ttf, $font);
        }
        return $this;
    }
    public function dots($length = 100){
        //然后添加小点点
        for ($i = 0; $i <= $length;$i++){
            imagesetpixel($this->img, rand(0,$this->width ), rand(0, $this->height), $this->getColor());
        }
        return $this;
    }

    /**
     * 随机添加 多个线条
     * @return $this
     */
    public function lines($length = 10){

        for ($i = 0; $i < $length;$i++){
            imageline($this->img,rand(0,$this->width),rand(0,$this->height),rand(0,$this->width),rand(0,$this->height),$this->getColor());
        }
        return $this;
    }
    public function ellipses($length = 10){
        for ($i = 0; $i < $length;$i++){
            imageEllipse($this->img,rand(0,$this->width),rand(0,$this->height),rand(0,20),rand(0,30),$this->getColor());
        }
        return $this;
    }



    /**
     * 这是结束了，然后释放资源
     * @return $this
     */

    public function __destruct()
    {
        imagesavealpha($this->img , true);//设置保存PNG时保留透明通道信息
        //输出图片
        imagepng($this->img);
        //释放资源
        imagedestroy($this->img);
    }


}

$img = new Code(85,36);
$img -> fonts(2,20)
    -> dots(5)
    -> lines(1)
    -> ellipses(1);
//这是code中的文字
$code_font_str = $img -> code_font_str;
$_SESSION['CodeStr'] = $code_font_str;