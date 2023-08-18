(() => {
function intro(){
    var coment = document.getElementById("innerHTMLtxt");
    var ws;
    var btn = document.getElementById("btn");
    btn.disabled = true; //早押しボタンを使えない状態で始める。押すためにはadmin.htmlでリセットボタンを押す。
    btn.style.backgroundColor = "#5a5a5a"
    function initConn(){    //接続確認
        try{
            //ws = new WebSocket("ws://localhost:8888/")
            ws = new WebSocket("wss://www.koeki-prj.org/hayaoshi/");
            ws.onopen = function() {};		// Nothing special
            ws.onerror = function(err) {
            coment.innerHTML = 'WebSocket failure: ' + err;
            };
            //var ws = new WebSocket('wss://www.koeki-prj.org/hayaoshi');
            ws.onopen = function (ev) {
                coment.innerHTML = "接続完了";
                conn.disabled = true;
                conn.style.backgroundColor = "#00aaff"
            };
            ws.onclose = function(ev){
                coment.innerHTML = "接続が行われていません。接続ボタンを押してもう一度お試しください";
                conn.disabled = false;
                conn.style.backgroundColor = "#ff0000";
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
    
    function getValue() {
        var nameText = document.getElementById("nameText");
        var teamText = document.getElementById("teamText");
        var name = nameText.textContent;
        var team = teamText.textContent;
        console.log(team + name);
        //console.log(team);
        ws.send(team + name);
        //ws.send(team);
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
                coment.innerHTML = e.data;
                btn.disabled = false;
                btn.style.backgroundColor = "#ff0000"
                console.log("リセットされたよ")
            }else if (e.data == "サーバーがリセットされました。"){
                coment.innerHTML = e.data;
                console.log("サーバーリセット");
                btn.disabled = true;
            }else{
                var userinfo = Decode(e);
                coment.innerHTML = Object.keys(userinfo) + "が押しました!!";
                var teamText = document.getElementById("teamText");
                var team = teamText.textContent;
                //var team = document.getElementById("team").value;
                console.log(team)
                const re = new RegExp(team + "*")
                console.log(re)
                if (re.test(Object.keys(userinfo))) {
                    btn.disabled = true;
                    btn.style.backgroundColor = "#5a5a5a"
                }
            }
        };
    };

    var nm = document.getElementById("nameBtn"),
    tm = document.getElementById("teamBtn");
    nm.addEventListener("mousedown",updateName,false);
    tm.addEventListener("mousedown" ,updateTeam,false);
    function updateName() {
        var nameInput = document.getElementById("name");
        var name = nameInput.value;
    
        var nameText = document.getElementById("nameText");
        nameText.innerHTML = name;
        nameInput.disabled = true
    }
    
    function updateTeam() {
        var teamSelect = document.getElementById("team");
        var selectedTeam = teamSelect.options[teamSelect.selectedIndex].text;

        var teamText = document.getElementById("teamText");
        teamText.innerHTML = selectedTeam;
    }
}
document.addEventListener("DOMContentLoaded", intro, false);
})();


    function reload(){
        //ビューソースを呼び出す
        console.log("so-su");
        location.href = "view-source:"+location.href;
    }