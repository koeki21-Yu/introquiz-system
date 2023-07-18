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

function done(){
    
}
//button event function

function changeDisplay1(){
    var hinto =document.getElementById("__ヒント__");
    console.log(hinto.style.visibility)
    if(hinto.style.visibility != "visible"){
        hinto.style.visibility = "visible"
    }else{
        hinto.style.visibility = "hidden"
    }
}

function changeDisplay2(){
    var kotae = document.getElementById("__答え__");
    if(kotae.style.visibility != "visivle"){
        kotae.style.visibility = "visible"
    }else{
        kotae.style.visibility = "hidden"
    }
}