package com.aspiringminds.event.joboffer.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

	@Value("${welcome.message}")
	public String welcomeMessage;

	@GetMapping("/welcome")
	public String getWelcomeMessage() {
		return "{\"message\": \"" + welcomeMessage + "\"}";
	}

}
