 // 上传txt文件
function upload(obj) {
  let file = obj.files[0];
  let formFile = new FormData();
  formFile.append("file", file); //加入文件对象
  $.ajax({
      url: "/upload/file",
      data: formFile,
      type: "POST",
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      success: function (res) {
          document.getElementById('txt').value = res.data;
      },
      error: function(err) {
          alert('error: 文件上传失败！');
      }
  })
}