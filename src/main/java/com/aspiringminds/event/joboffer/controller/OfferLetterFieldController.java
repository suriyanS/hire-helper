package com.aspiringminds.event.joboffer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aspiringminds.event.joboffer.model.OfferLetterField;
import com.aspiringminds.event.joboffer.service.OfferLetterFieldService;

@RestController
public class OfferLetterFieldController {

	@Autowired
	private OfferLetterFieldService service;

	@GetMapping("/offer-letter-fields")
	public List<OfferLetterField> getWelcomeMessage() {
		return service.getAllOfferLetterFields();
	}

	@PostMapping(value = "/create-offer-field", consumes = "application/json")
	public String createOfferLetterField(@RequestBody OfferLetterField offerLetterField) {
		return service.createOfferLetterField(offerLetterField);
	}

	@PostMapping(value = "/save-offer-fields", consumes = "application/json")
	public String createOrUpdateOfferLetterField(@RequestBody List<OfferLetterField> offerLetterField) {
		return service.createOfferLetterField(offerLetterField);
	}
	
	@DeleteMapping(value = "/delete-offer-field/{id}")
	public String createOfferLetterField(@PathVariable Long id) {
		return service.deleteOfferLetterField(id);
	}

}
