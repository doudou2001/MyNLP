// 生成主题
function generate_model() {
  const content = document.getElementById("txt").value;
  $.ajax({
    url: "/generate/model",
    data: JSON.stringify({ content: content }),
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    success: function (res) {
      let result = res.data;
      console.log(result);
    },
    error: function (err) {
      alert("error: 模型运行失败！");
      throw new Error();
    },
  });
}
