#!/usr/bin/env ruby
# -*- coding: utf-8 -*-
# EM Intro. - http://keijinsonyaban.blogspot.jp/2010/12/eventmachine.html
# irb to EM - https://keyesberry.hatenadiary.org/entry/20110929/p1
#
# Browser Settings:
# Chrome: https://blog.hello-world.jp.net/node-js/1821/

require 'em-websocket'
require 'set'
PORT = 8888

clients = Set.new	# 「集合」クラス

print("No clients yet...")
EM::WebSocket.start({:host => "0.0.0.0", :port => PORT}) do |ws_conn|
  # クライアント接続がある度にその情報が ws_conn に入って来る
  ws_conn.onopen do		# そのクライアントが接続開始してきたとき
    clients << ws_conn		# クライアントを集合に追加
    ws_conn.send("うっす!")
    printf("%d guest(s)\n", clients.length)
  end
  ws_conn.onmessage do |message|	# クライアントから文字列が来たとき
    p message
    resp = "誰かが「"+message+"」だってさ"
    clients.each{|conn|
      if (conn == ws_conn)
        conn.send("他の人に送っといた")
      else
        conn.send(resp)
      end
    }
  end
  ws_conn.onclose do			# クライアントが切断したとき
    clients.delete(ws_conn)		# そのクライアントを集合から削除
    # p "bye"+ws_conn.inspect
    printf("%d GUEST(s)\n", clients.length)
  end
  EM::defer do				# 共通で実行するスレッド
    # Thread.new do のほうがいいかも
    puts "..captured!"
    loop do
      print("Enter message for all clients: ")
      line = gets
      puts("Sending")
      clients.each{|conn| conn.send(line.chomp) }
    end
  end
end
