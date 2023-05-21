package com.aspiringminds.event.joboffer.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aspiringminds.event.joboffer.model.OfferLetterField;
import com.aspiringminds.event.joboffer.repository.OfferLetterFieldRepository;

@Service
public class OfferLetterFieldService {

	@Autowired
	private OfferLetterFieldRepository repository;

	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	private final Logger logger = LoggerFactory.getLogger(OfferLetterFieldService.class);

	public List<OfferLetterField> getAllOfferLetterFields() {
		return repository.findAll();
	}

	public OfferLetterField getOfferLetterFieldByID(Long id) {
		Optional<OfferLetterField> offerLetterField = repository.findById(id);
		return offerLetterField.isPresent() ? offerLetterField.get() : new OfferLetterField();
	}

	public String createOfferLetterField(OfferLetterField offerLetterField) {
		if (getOfferLetterFieldByID(offerLetterField.getId()).getId() == 0) {
			offerLetterField.setId(sequenceGenerator.generateSequence(OfferLetterField.SEQUENCE_NAME));
			OfferLetterField letterField = repository.save(offerLetterField);
			if (letterField.getId() == offerLetterField.getId()) {
				logger.info("Offer Letter Field Created - " + letterField.getFieldName());
				return "Offer Letter Field Created - " + letterField.getFieldName();
			} else {
				logger.info("There was an issue while creating Offer Letter Field");
				return "Offer Letter Field(s) Creation Failed!";
			}
		} else {
			logger.info("Offer Letter Field - " + offerLetterField.getId() + " exists already!");
			return "Offer Letter Field - " + offerLetterField.getId() + " exists already!";
		}

	}

	public String createOfferLetterField(List<OfferLetterField> offerLetterFields) {
		offerLetterFields = offerLetterFields.stream()
				.map(m -> new OfferLetterField(
						m.getId() == 0 ? sequenceGenerator.generateSequence(OfferLetterField.SEQUENCE_NAME) : m.getId(),
						m.getFieldName(), m.getFieldCode(), m.getFieldValue()))
				.collect(Collectors.toList());
		List<OfferLetterField> letterFields = repository.saveAll(offerLetterFields);
		if (letterFields.size() == offerLetterFields.size()) {
			logger.info("Offer Letter Field(s) Create/Update Successfully!");
			return "Offer Letter Field(s) Create/Update Successfully";
		} else {
			logger.info("There was an issue while creating Offer Letter Field(s)");
			return "Offer Letter Field(s) Creation Failed!";
		}

	}

	public String deleteOfferLetterField(Long id) {
		Optional<OfferLetterField> letterField = repository.findById(id);
		if (letterField.isPresent()) {
			repository.deleteById(id);
			return "Offer Letter Field Deleted - " + id;
		} else {
			logger.info("Offer Letter Field Id - " + id + " doesn't exist");
			return "Offer Letter Field doesn't exist - " + id;
		}

	}

}
