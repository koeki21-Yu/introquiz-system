function intro(){
    function initConn(){    //接続確認
        var coment = document.getElementById("innerHTMLtxt");
        var ws;
        try{
            ws = new WebSocket("ws://localhost:8888/")
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
    
    //document.getElementById("team").value = document.getElementById("dat_in").value;
    
    var btn = document.getElementById("btn");
    function getValue() {
        var nameText = document.getElementById("nameText");
        var teamText = document.getElementById("teamText");
        var name = nameText.textContent;
        var team = teamText.textContent;
        console.log(name);
        console.log(team);
        ws.send(name);
        ws.send(team);
    }
    btn.addEventListener("mousedown" , getValue,false);

    window.onload = function () {
        function Decode(value) {
            //JSON ⇒ オブジェクト
            //エンコードされたデータを元の形式へ戻す。（デコード）
            //.parseは数字だけだと数字に変換、漢字も交じると文字列にしてくれる。数字だけのときとかに注意。
            //innerHTMLが勝手にソートされる危険性がある。順番通りに行かない。
            var obj2 = JSON.parse(value.data);
            return obj2;
        }

        ws.onmessage = function (e) {
            if(e.data == "リセットされたよ") {
                innerHTMLtxt.innerHTML = e.data;
                btn.disabled = false;
            }else{
                var userinfo = Decode(e);
                innerHTMLtxt.innerHTML = Object.keys(userinfo) + "が押しました!!";
                var team = document.getElementById("team").value;
                if (Object.keys(userinfo).includes(team)) {
                    btn.disabled = true;
                }
            }
        };
    };
}
document.addEventListener("DOMContentLoaded", intro, false);