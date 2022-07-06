// 生成主题
function generate_topic() {
  const content = document.getElementById("txt").value;
  $.ajax({
    url: "/generate/topic",
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
      alert("error: 生成主题失败！");
      throw new Error();
    },
  });
}
