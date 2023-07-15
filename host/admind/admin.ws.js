function init() {
  //追加部分(WebSocketの部分)
  var ws = new WebSocket('ws://localhost:8888/');
  //var ws = new WebSocket("wss://www.koeki-prj.org/hayaoshi");
  function Decode(value) {
    //JSON ⇒ オブジェクト
    //エンコードされたデータを元の形式へ戻す。（デコード）
    var obj2 = JSON.parse(value.data);
    return obj2;
  }
  ws.onmessage = function (e) {
    console.log(e.data);
    if (e.data == "リセットされたよ") {
      innerHTMLtxt.innerHTML = e.data;
    } else {
      AUDIO.pause();
      var aiu = Decode(e);
      console.log(aiu);
      innerHTMLtxt.innerHTML = Object.keys(aiu) + "が押しました!!";
      var team = document.getElementById("team").value;
      if (team == aiu.true) {
        btn.disabled = true;
      }
    }
  };
  var release = document.getElementById("release");
  release.addEventListener("click", () => {
    ws.send("リセットお願い");
  });
}

window.onload = init;
