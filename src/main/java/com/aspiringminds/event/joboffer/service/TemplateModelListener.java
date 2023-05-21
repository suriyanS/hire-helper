package com.aspiringminds.event.joboffer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.aspiringminds.event.joboffer.model.Template;

@Component
public class TemplateModelListener extends AbstractMongoEventListener<Template> {
	
	private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public TemplateModelListener(SequenceGeneratorService sequenceGeneratorService) {
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Template> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGeneratorService.generateSequence(Template.SEQUENCE_NAME));
        }
    }
}
