package com.suriyan.dev.hirehelper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.suriyan.dev.hirehelper.model.OfferLetterField;

@Component
public class OfferLetterModelListener extends AbstractMongoEventListener<OfferLetterField> {
	
	private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public OfferLetterModelListener(SequenceGeneratorService sequenceGeneratorService) {
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<OfferLetterField> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGeneratorService.generateSequence(OfferLetterField.SEQUENCE_NAME));
        }
    }
}
