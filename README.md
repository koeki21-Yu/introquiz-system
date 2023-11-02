2023-introquiz-system
===============

イントロクイズ作成リポジトリです。

## 利用方法

このリポジトリーをgitcloneによりダウンロードすることにより、使用することができます。

サーバー側では、ポートの開放およびサーバシステムをの起動する必要があります。

admin.ws.jsおよびmain.ws.jsのシステムのws = new WebSocket("wss:ip:port");におけるipとportを起動しているサーバーに合わせる必要があります。

admin.jsにおける5行目のquiz/quiz.csvを編集し自分の使用したい音楽データに変換する必要があります。

---

## webpage
### admindirectory
アドミンページ
[admin.html](../../../introquiz-system/pages/host/admind/admin.html)

---

### maindirectory
[main.html](../../../introquiz-system/pages/host/maind/main.html)

---

### サーバー側
[ws.rb](../../../introquiz-system/blob/master/sever/ws.rb)
