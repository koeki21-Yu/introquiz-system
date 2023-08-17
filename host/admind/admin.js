(() => {
  var quiz = [],	// 読み取ったCSV全てが入る配列
      nQuiz,		// データの個数(quiz.lengthのまま使ってもよい)
      pos=0;		// 現在の配列の添字位置
  var csvfile = "quiz/quiz.csv";	// CSVデータファイル名
  function putValues(row) {
      // CSVの1行分のJSONがrowに入る
      for (let key of Object.keys(row)) {
          // Object.keys(JSON)でキーを1個ずつ取り出す(Rubyのkeys)
          let id = "__" + key + "__"; // HTML要素のID
          let elem = document.getElementById(id);

          if (elem) {  // もし id="__カラム名__" の要素が見つかったら
              if(id == "__音楽__"){
                  elem.src = row[key];
              }else{
                  elem.innerText = row[key]; // その要素の内部テキストを更新
              }
              
          }
      }
  }
  function slide(n) {	// nで指定した数だけ現在位置(pos)をずらす
      pos = (nQuiz+pos+n) % nQuiz;	// 0以上 nQUIZ以下 になるよう調整
      putValues(quiz[pos]);		// ずらした添字位置で文書書き換え
      let kotae = document.getElementById("__答え__");
      let hinto = document.getElementById("__ヒント__");
      kotae.style.visibility = "hidden";
      hinto.style.visibility = "hidden";
  }
  function left() {slide(-1);}	// 1つ前に戻るボタンの処理
  function right() {slide(1);}	// 1つ先に進むボタンの処理
  function init() {			// HTML文書を読み終わったら呼ばれる
      fetch(csvfile).			// csvfileをサーバから読み込んで
          then((resp) => {		// 応答がrespに入るので
              if (resp.ok) return resp.text();	// テキストを返す
          }).then((txt) => {		// テキストが txt に入るので
          quiz = new CSV(txt, {header: true}).parse(); // CSV解析
          nQuiz = quiz.length;	// 行数を記憶
          putValues(quiz[pos]);	// 最初の行のデータを表示
      });;
      document.getElementById("left").addEventListener("click", left);
      document.getElementById("right").addEventListener("click", right);
  }
  document.addEventListener("DOMContentLoaded", ()=>{
      init();	// ブラウザの文書読み込みが完了したらここに来る
  }, false);
})();


function changeDisplay1(){
    let hinto = document.getElementById("__ヒント__");
    console.log(hinto.style.visibility);
    if (hinto.style.visibility !== "visible") {
        hinto.style.visibility = "visible";
    } else {
        hinto.style.visibility = "hidden";
    }
}

function changeDisplay2(){
    let kotae = document.getElementById("__答え__");
    if (kotae) {
        if (kotae.style.visibility !== "visible") {
            kotae.style.visibility = "visible";
        } else {
            kotae.style.visibility = "hidden";
        }
    }
}


var innerHTMLtxt = document.getElementById("innerHTMLtxt");
document.addEventListener("DOMContentLoaded",tureorfalse,false);
function tureorfalse(){
    let faster = document.getElementById("fastTouchButton");
    //配列を出力したいなら、[Object]メソッドを使う。
    let one = document.getElementById("team1");
    sumNumber1 = 0;
    one.innerHTML = sumNumber1;
    let two = document.getElementById("team2");
    sumNumber2 = 0;
    two.innerHTML = sumNumber2;
    let three = document.getElementById("team3");
    sumNumber3 = 0;
    three.innerHTML = sumNumber3;
    let four = document.getElementById("team4");
    sumNumber4 = 0;
    four.innerHTML = sumNumber4;
    let five = document.getElementById("team5");
    sumNumber5 = 0;
    five.innerHTML = sumNumber5;
    let six = document.getElementById("team6");
    sumNumber6 = 0;
    six.innerHTML = sumNumber6;
    let trueButton = document.getElementById("true");
    let falseButton = document.getElementById("false");
    let usrinfo;
    let userinfo;
    function calluserinfo(usrinfo){
        userinfo = innerHTMLtxt.textContent;
        usrinfo = userinfo.split(",")
        console.log(usrinfo[0].charAt(0));
        return
    }
    falseButton.addEventListener("mousedown", function () {
        usrinfo = calluserinfo();
        innerHTMLtxt.innerHTML = usrinfo;
        console.log("わあ、間違えた");
        usrinfo.shift();
        innerHTMLtxt.innerHTML = Object.values(usrinfo);
        // console.log(usrinfo[0].charAt(0))
    });
    
    trueButton.addEventListener("mousedown", function () {
        usrinfo = calluserinfo();
        console.log("わあ、正解だ");
        switch (usrinfo[0].charAt(0)) {
        case "1":
            sumNumber1 += 1;
            one.innerHTML = sumNumber1;
            break;
        case "2":
            sumNumber2 += 1;
            two.innerHTML = sumNumber2;
            break;
        case "3":
            sumNumber3 += 1;
            three.innerHTML = sumNumber3;
            break;
        case "4":
            sumNumber4 += 1;
            four.innerHTML = sumNumber4;
            break;
        case "5":
            sumNumber5 += 1;
            five.innerHTML = sumNumber5;
            break;
        case "6":
            sumNumber6 += 1;
            six.innerHTML = sumNumber6;
            break;
        }
    });
}
