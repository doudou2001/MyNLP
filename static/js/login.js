function login_btn() {
  const account = document.getElementById("account").value;
  const pwd = document.getElementById("pwd").value;
  if (account == "" || pwd == "") {
    alert("请输入账号密码！");
  } else {
    $.ajax({
      url: "/login_btn",
      data: JSON.stringify({
          account:account,
          pwd:pwd
      }),
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        if(res.msg==="用户不存在！"){
          alert(res.msg);
        }
        else{
          document.getElementById("account").value = "";
          document.getElementById("pwd").value = "";
          window.location.href="/visual";
        }
      },
      error: function (err) {
        alert("登录异常！");
      },
    });
  }
}
