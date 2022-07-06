// 生成主题
function generate_triple() {
  const content = document.getElementById("txt").value;
  $.ajax({
    url: "/generate/triple",
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
      alert("error: 知识图谱生成失败！");
      throw new Error();
    },
  });
}
