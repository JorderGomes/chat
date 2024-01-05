package com.chat.realtime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RealtimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(RealtimeApplication.class, args);
		System.out.println("Application is up");
	}

}
