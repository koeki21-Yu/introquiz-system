function playMusic() {
    // 音楽再生のためのオーディオ要素を取得
    var audio = document.getElementById("__音楽__");

    // 音楽を再生
    audio.play();
  }
  
  // ボタンがクリックされたときに音楽を停止する関数
  function stopMusic() {
    // 音楽再生のためのオーディオ要素を取得
    var audio = document.getElementById("__音楽__");

    // 音楽を停止
    audio.pause();
  }