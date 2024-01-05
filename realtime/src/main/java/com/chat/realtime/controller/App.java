package com.chat.realtime.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.chat.realtime.model.Msg;

@Controller
public class App {
    @MessageMapping("/chatmessage")
    @SendTo("/chat")
    public Msg sendMesssage(Msg message) {
        return message;
    }

}
