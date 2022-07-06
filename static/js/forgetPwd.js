function modify_btn() {
  const mail = document.getElementById("mail").value;
  const phone = document.getElementById("phone").value;
  const npwd = document.getElementById("npwd").value;
  const repwd = document.getElementById("repwd").value;
  const test = document.getElementById("test").value;
  if (
    mail === "" ||
    phone === "" ||
    npwd === "" ||
    repwd === "" ||
    test === ""
  ) {
    alert("信息遗漏！");
  } else if (npwd != repwd) {
    alert("两次密码不同！");
  } else {
    $.ajax({
      url: "/forgetPwd_btn",
      data: JSON.stringify({
        mail: mail,
        phone: phone,
        npwd: npwd,
        test: test,
      }),
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        if(res.msg==="用户不存在或验证码错误！"){
          alert(res.msg);
        }
        else{
          document.getElementById("mail").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("npwd").value = "";
          document.getElementById("repwd").value = "";
          document.getElementById("test").value = "";
          window.location.href="/";
        }
      },
      error: function (err) {
        alert("修改异常！");
      },
    });
  }
}
