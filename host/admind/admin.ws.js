function intro() {
  var coment = document.getElementById("innerHTMLtxt"),
      AUDIO = document.getElementById("__音楽__"),
      ws;

      function initConn(){    //接続確認
        try{
            ws = new WebSocket("ws://localhost:8888/")
            //var ws = new WebSocket("wss://www.koeki-prj.org/hayaoshi");
            ws.onopen = function() {};		// Nothing special
            ws.onerror = function(err) {
            alert('WebSocket failure: ' + err);
            };
            //var ws = new WebSocket('wss://www.koeki-prj.org/hayaoshi');
            ws.onopen = function (ev) {
                alert("接続完了");
                coment.Context = "接続完了";
                conn.disabled = true;
            };
            ws.onclose = function(ev){
                coment.Context = "接続が行われていません。接続ボタンを押してもう一度お試しください";
                conn.disabled = false;
            };
        }catch (err){
            alert("Socket Creation Error" + err);
        }
    };
    function con(ev){   //接続ボタンを押した時に接続確認
            initConn();
    }
    var conn = document.getElementById("conn");
    conn.addEventListener("mousedown" ,con,false);
    initConn(); //最初に接続確認
  
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
    ws.send("リセットお願い");
  });
}

document.addEventListener("DOMContentLoaded", intro, false);
