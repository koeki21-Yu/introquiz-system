function intro() {
  var coment = document.getElementById("innerHTMLtxt"),
      AUDIO = document.getElementById("__音楽__"),
      ws;
      function initConn(){    //接続確認
        try{
            //ws = new WebSocket("wss://localhost:8804/")
            ws = new WebSocket("wss://www.koeki-prj.org/hayaoshi");
            ws.onopen = function() {};		// Nothing special
            ws.onerror = function(err) {
            coment.innerHTML = "WebSocket failure: " + err;
            
            };
            //var ws = new WebSocket('wss://www.koeki-prj.org/hayaoshi');
            ws.onopen = function (ev) {
                coment.innerHTML = "接続完了";
                conn.disabled = true;
                ws.send('admin_opened');
                
            };
            ws.onclose = function(ev){
              coment.innerHTML = "接続が行われていません。接続ボタンを押してもう一度お試しください。";
                conn.disabled = false;
            };
        }catch (err){
            alert("Socket Creation Error" + err);
        }
    };
    var conn = document.getElementById("conn");
    conn.addEventListener("mousedown" ,initConn,false);
  
  function Decode(value) {
    //JSON ⇒ オブジェクト
    //エンコードされたデータを元の形式へ戻す。（デコード）
    var obj2 = JSON.parse(value.data);
    return obj2;
  }
  ws.onmessage = function (e) {
    console.log(e.data);
    if (e.data == "リセットされたよ") {
      coment.innerHTML = e.data;
      console.log("リセットしたよ");
    } else {
      AUDIO.pause();
      var userinfo = Decode(e);
      console.log(userinfo);
      coment.innerHTML = Object.keys(userinfo) + "が押しました!!";
      var team = document.getElementById("team").value;
      if (team == userinfo.true) {
        btn.disabled = true;
      }
    }
  };
  var release = document.getElementById("release");
  release.addEventListener("click", () => {
    console.log("リセットボタンを押したしたよ");
    ws.send("リセットお願い");
  });
}

document.addEventListener("DOMContentLoaded", intro, false);
