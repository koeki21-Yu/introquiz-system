document.addEventListener("DOMContentLoaded", function () {
    let userinfo = "1班,2班,3班,4班,5班,6班";
    let usrinfo = userinfo.split(",")
    console.log(usrinfo[0].charAt(0));
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
  
    faster.innerHTML = usrinfo;
    let trueButton = document.getElementById("true");
    let falseButton = document.getElementById("false");

    
    falseButton.addEventListener("mousedown", function () {
        console.log("わあ、間違えた");
        usrinfo.shift();
        faster.innerHTML = Object.values(usrinfo);
        // console.log(usrinfo[0].charAt(0))
    });
    trueButton.addEventListener("mousedown", function () {
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
  });
  