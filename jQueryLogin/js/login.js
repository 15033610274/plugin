var canGetCookie = 0;//是否支持存储Cookie 0 不支持 1 支持
var ajaxmockjax = 1;//是否启用虚拟Ajax的请求响 0 不启用  1 启用
$(function () {
    $('.loginUse input[name="login"]').focus();

    var canGetCookie = 0;//是否支持存储Cookie 0 不支持 1 支持
    var ajaxmockjax = 1;//是否启用虚拟Ajax的请求响 0 不启用  1 启用



    /**
     * 这是登录按钮所发生的特效
     */
    layui.use('layer', function () {
        $('#login').click(function () {
            //1.先倒下，然后起来那个注册的表单
            $('.login').addClass('test'); //倾斜特效s
            // 2.然后1秒后隐藏那个登录的，让注册的显示出来，为了不那么凸显变化效果
            setTimeout(function () {
                $(".registeredUse").hide();
                $('.loginUse').show();
                //然后切换登录按钮
                $('#login').hide();
                $('#login_btn').show();
                //切换注册按钮
                $('#registered').show();
                $('#registered_btn').hide();
                //然后给登录的获得焦点
                $('.loginUse input[name="login"]').focus();
            },500)
            setTimeout(function () {
                $('.login').removeClass('test')
            }, 1000);
        })
    })
    /**
     * 这是点击注册按钮，所发生的特效
     */
    layui.use('layer', function () {
        $('#registered').click(function () {
            //1.先倒下，然后起来那个注册的表单
            $('.login').addClass('test'); //倾斜特效s
            // 2.然后1秒后隐藏那个登录的，让注册的显示出来，为了不那么凸显变化效果
            setTimeout(function () {
                $(".loginUse").hide();
                $('.registeredUse').show();
                //然后切换注册按钮
                $('#registered').hide();
                $('#registered_btn').show();
                //切换登录按钮
                $('#login').show();
                $('#login_btn').hide();
                $('.registeredUse input[name="login"]').focus();
            },500)
            setTimeout(function () {
                $('.login').removeClass('test')
            }, 1000);
        })
    })


    /**
     * 这是登录提交
     */
    layui.use('layer', function () {
        //非空验证
        $('#login_btn').click(function () {
            var login = $('.loginUse input[name="login"]').val();
            var pwd = $('.loginUse input[name="pwd"]').val();
            var code = $('input[name="code"]').val();
            if (login == '') {
                ErroAlert('请输入您的账号');
            } else if (pwd == '') {
                ErroAlert('请输入密码');
            } else if (code == '') {
                ErroAlert('输入验证码');
            } else {
                //认证中..
                $('.login').addClass('test'); //倾斜特效
                setTimeout(function () {
                    $('.login').addClass('testtwo'); //平移特效
                }, 300);
                setTimeout(function () {
                    $('.authent').show().animate({right: -320}, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false
                    });
                    $('.authent').animate({opacity: 1}, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                }, 500);
                //登录
                var JsonData = {login: login, pwd: pwd, code: code};
                var url = "login.php";

                AjaxPost(url, JsonData,
                    function (data) {
                        //这里是成功了
                        //ajax返回
                        //认证完成
                        setTimeout(function () {
                            $('.authent').show().animate({ right: 90 }, {
                                easing: 'easeOutQuint',
                                duration: 600,
                                queue: false
                            });
                            $('.authent').animate({ opacity: 0 }, {
                                duration: 200,
                                queue: false
                            }).addClass('visible');
                            $('.login').removeClass('testtwo'); //平移特效
                        }, 2000);
                        setTimeout(function () {
                            $('.authent').hide();
                            $('.login').removeClass('test');
                            if (data.code == '0') {
                                SuccessAlert('登录成功，跳转中！！','success.html');
                            } else {
                                //失败
                                //清空内容
                                $("input[name='login']").val('');
                                $("input[name='pwd']").val('');
                                $("input[name='pwd_two']").val('');
                                $("input[name='code']").val('');
                                //然后让用户名获取焦点
                                $(".loginUse input[name='login']").focus();
                                CreateCodeImg();
                                ErroAlert(data.msg);
                            }
                        }, 2400);
                    },
                    function (data) {
                        //这里是未知错误导致，有可能是网络原因，也有可能是其他原因
                        setTimeout(function () {
                            $('.authent').show().animate({ right: 90 }, {
                                easing: 'easeOutQuint',
                                duration: 600,
                                queue: false
                            });
                            $('.authent').animate({ opacity: 0 }, {
                                duration: 200,
                                queue: false
                            }).addClass('visible');
                            $('.login').removeClass('testtwo'); //平移特效
                        }, 2000);
                        setTimeout(function () {
                            $('.authent').hide();
                            $('.login').removeClass('test');
                            //清空内容
                            $("input[name='login']").val('');
                            $("input[name='pwd']").val('');
                            $("input[name='pwd_two']").val('');
                            $("input[name='code']").val('');
                            //然后让用户名获取焦点
                            $(".loginUse input[name='login']").focus();
                            CreateCodeImg();
                            ErroAlert('未知错误');
                        }, 2400);

                    })
            }
        })
    })

    /**
     * 这是注册提交
     */
    layui.use('layer', function () {
        $('#registered_btn').click(function () {
            // 1.获取表单值
            var login = $('.registeredUse input[name="login"]').val();
            var pwd = $('.registeredUse input[name="pwd"]').val();
            var pwd_two = $('.registeredUse input[name="pwd_two"]').val();
            var code = $('input[name="code"]').val();
            // 4.开始判断
            if (login == '') {
                ErroAlert('请输入您的账号');
            } else if (pwd == '') {
                ErroAlert('请输入密码');
            } else if (pwd_two == '') {
                ErroAlert('请输入确认密码');
            } else if (pwd_two != pwd) {
                ErroAlert('密码和确认密码不一致');
            } else if (code == '') {
                ErroAlert('输入验证码');
            } else {
                //认证中..
                $('.login').addClass('test'); //倾斜特效
                setTimeout(function () {
                    $('.login').addClass('testtwo'); //平移特效
                }, 300);
                setTimeout(function () {
                    $('.authent').show().animate({right: -320}, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false
                    });
                    $('.authent').animate({opacity: 1}, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                }, 500);
                //注册
                var JsonData = {login: login, pwd: pwd, code: code};
                var url = "?c=login&a=registered";

                //这里进行异步提交
                AjaxPost(url, JsonData,
                    function (data) {
                        //这里是成功了
                        //ajax返回
                        //认证完成
                        setTimeout(function () {
                            $('.authent').show().animate({right: 90}, {
                                easing: 'easeOutQuint',
                                duration: 600,
                                queue: false
                            });
                            $('.authent').animate({opacity: 0}, {
                                duration: 200,
                                queue: false
                            }).addClass('visible');
                            $('.login').removeClass('testtwo'); //平移特效
                        }, 2000);
                        setTimeout(function () {
                            $('.authent').hide();
                            $('.login').removeClass('test');
                            if (data.code == '0') {
                                //登录成功
                                SuccessAlert('注册成功，请等陆！！','?c=login');
                                return ;
                            } else {
                                //失败
                                //清空内容
                                $("input[name='login']").val('');
                                $("input[name='pwd']").val('');
                                $("input[name='pwd_two']").val('');
                                $("input[name='code']").val('');
                                //然后让用户名获取焦点
                                $(".registeredUse input[name='login']").
                                //更换验证码
                                CreateCodeImg();
                                ErroAlert(data.msg);
                            }
                        }, 2400);
                    },
                    function (data) {
                        //这里是未知错误导致，有可能是网络原因，也有可能是其他原因
                        setTimeout(function () {
                            $('.authent').show().animate({right: 90}, {
                                easing: 'easeOutQuint',
                                duration: 600,
                                queue: false
                            });
                            $('.authent').animate({opacity: 0}, {
                                duration: 200,
                                queue: false
                            }).addClass('visible');
                            $('.login').removeClass('testtwo'); //平移特效
                        }, 2000);
                        setTimeout(function () {
                            $('.authent').hide();
                            $('.login').removeClass('test');
                            $("input[name='login']").val('');
                            $("input[name='pwd']").val('');
                            $("input[name='pwd_two']").val('');
                            $("input[name='code']").val('');
                            //然后让用户名获取焦点
                            $(".registeredUse input[name='login']").focus();
                            CreateCodeImg();
                            AjaxErro(data);
                        }, 2400);

                    })

            }
        })
    })




    //全屏
    var fullscreen = function () {
        elem = document.body;
        if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.requestFullScreen) {
            elem.requestFullscreen();
        } else {
            //浏览器不支持全屏API或已被禁用
        }
    }


    //粒子背景特效
    $('body').particleground({
        dotColor: '#E8DFE8',
        lineColor: '#133b88'
    });
    $('input[name="pwd"]').focus(function () {
        $(this).attr('type', 'password');
    });
    $('input[type="text"]').focus(function () {
        $(this).prev().animate({ 'opacity': '1' }, 200);
    });
    $('input[type="text"],input[type="password"]').blur(function () {
        $(this).prev().animate({ 'opacity': '.5' }, 200);
    });
    $('input[name="login"],input[name="pwd"]').keyup(function () {
        var Len = $(this).val().length;
        if (!$(this).val() == '' && Len >= 5) {
            $(this).next().animate({
                'opacity': '1',
                'right': '30'
            }, 200);
        } else {
            $(this).next().animate({
                'opacity': '0',
                'right': '20'
            }, 200);
        }
    });
    var open = 0;
})