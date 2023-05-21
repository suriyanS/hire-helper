package com.suriyan.dev.hirehelper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.suriyan.dev.hirehelper.model.Template;

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
