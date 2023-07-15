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

PORT = 8888
connnections = []
hash = {}

clients = Set.new	# 「集合」クラス

print("No clients yet...")
EM::WebSocket.start({:host => "0.0.0.0", :port => PORT}) do |ws_conn|
  # クライアント接続がある度にその情報が ws_conn に入って来る
  ws_conn.onopen do		# そのクライアントが接続開始してきたとき
    clients << ws_conn		# クライアントを集合に追加
  end
  
  ws.onmessage do |message|	# クライアントから文字列が来たとき
    p message
    if messge == "リセットお願い" then
      hash = Hash.new
      reset ="リセットされたよ"
      pp reset
      connnections.each{|conn| conn.send{reset}}
    else
      hash[massage] = true
      str - JSON.genrate(hash)
      pp str
      connnections.each{|conn| conn.send{str}}
    end
  end
end
