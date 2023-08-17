#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
# EM Intro. - http://keijinsonyaban.blogspot.jp/2010/12/eventmachine.html
# irb to EM - https://keyesberry.hatenadiary.org/entry/20110929/p1
#
# Browser Settings:
# Chrome: https://blog.hello-world.jp.net/node-js/1821/

require 'em-websocket'
require 'pp'
require 'json'
require 'set'

PORT = 8804
connections = []
hash = {}
admin_pages = 0
clients = Set.new	# 「集合」クラス

print("No clients yet...")
EM::WebSocket.start({:host => "0.0.0.0", :port => PORT}) do |ws_conn|
  # クライアント接続がある度にその情報が ws_conn に入って来る
  ws_conn.onopen do		# そのクライアントが接続開始してきたとき
    if ws_conn.request["path"] == "/admin"  # admin.html からの接続の場合
      admin_connected = true  # admin.html が接続したらフラグを true に設定
    else
      # main.html からの接続で、admin.html が接続していない場合は接続を拒否
      unless admin_connected
        ws_conn.close_connection
        next
      end
    connections << ws_conn		# クライアントを集合に追加
    ws_conn.send("うっす!")
    printf("%d guest(s)\n", connections.length)
  end
  
  ws_conn.onmessage do |message|	# クライアントから文字列が来たとき
    p message
    if message == "リセットお願い" then
      hash = Hash.new
      reset ="リセットされたよ"
      pp reset
      connections.each{|conn| conn.send(reset)}
    elsif message == "admin_opened"
      admin_pages +=1
      pp admin_pages
      if admin_pages == 2 then
        pp "Admin page opened"
        pp "closing all clients..."
        admin_pages = 0
        hash = Hash.new
        server ="サーバーがリセットされました。"
        pp server
        connections.each{|conn| conn.send(server)}
        connections.each do |client|
          client.close unless client == ws_conn # 自分以外のクライアントをクローズ
        end
        connections.clear
      end
    else
      hash[message] = true
      str = JSON.generate(hash)
      pp str
      connections.each{|conn| conn.send(str)}
    end
  end
  ws_conn.onclose do
    puts "Client disconnected"
    connections.delete(ws_conn)
  end
end
