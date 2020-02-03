function login() {
    var login_name = document.getElementsByName('un')[0].value;
    var login_pswd = document.getElementsByName('pw')[0].value;


    if (login_name == "" || login_pswd == "") {
        alert("账号或密码为空！");
        return;
    }


    var login_pwhs = CryptoJS.SHA512(login_pswd);

    var flag = 0;
    var lasturl;
    flag = check_name_pswd(login_name, login_pwhs);
    if (flag == 1) {
        sessionStorage.setItem("status", "ok");
        var SourceURL = new URL(window.location.href).searchParams.get('url');
        if (SourceURL != null) {
            window.location.href = SourceURL;
        }
        else {
            window.location.href = "index.html";
        }
    }
    else {
        alert("账号或密码不正确！");
    }
}
function check_name_pswd(name, pwhs) {
    var xmlhttp = null;
    var text = null;
    var obj = null;
    var url;

    url = "json/user.json";

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);

    text = xmlhttp.responseText;
    obj = JSON.parse(text);

    for (var i = 0; i < obj.user.length; i++) {
        if (obj.user[i].name == name && obj.user[i].pwhs == pwhs) {
            return 1;
        }
    }
    return 0;
}

function checkUserName() {
    var name = document.getElementsByName('un')[0].value;

    var flag = 0;
    var xmlhttp = null;
    var text = null;
    var obj = null;
    var url;

    url = "https://api.iisjy.cn/CheckUserExists?account=";

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url + name, false);
    xmlhttp.send(null);

    text = xmlhttp.responseText;
    obj = JSON.parse(text);
    // alert(obj.user.length);

    if (text != "404") {
        flag = 1;
        alert("ok, " + text);
        document.getElementsByName('pw')[0].disabled = "";
    } else {
        document.getElementsByName('pw')[0].disabled = "disabled";
    }
}
