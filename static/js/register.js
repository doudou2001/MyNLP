function register_btn() {
  const name = document.getElementById("name").value;
  const pwd = document.getElementById("pwd").value;
  const repwd = document.getElementById("repwd").value;
  const mail = document.getElementById("mail").value;
  const phone = document.getElementById("phone").value;
  if (
    name === "" ||
    pwd === "" ||
    repwd === "" ||
    mail === "" ||
    phone === ""
  ) {
    alert("信息遗漏！");
  } else if (pwd != repwd) {
    alert("两次密码不同！");
  } else {
    $.ajax({
      url: "/register_btn",
      data: JSON.stringify({
        name: name,
        pwd: pwd,
        mail: mail,
        phone: phone,
      }),
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      success: function (res) {
        if(res.msg==="用户已存在！"){
          alert(res.msg);
        }
        else{
          document.getElementById("name").value = "";
          document.getElementById("pwd").value = "";
          document.getElementById("repwd").value = "";
          document.getElementById("mail").value = "";
          document.getElementById("phone").value = "";
          window.location.href="/";
        }
      },
      error: function (err) {
        alert("注册失败！");
      },
    });
  }
}
