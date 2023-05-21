package com.suriyan.dev.hirehelper.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.suriyan.dev.hirehelper.model.Template;
import com.suriyan.dev.hirehelper.repository.TemplateRepository;

@Service
public class TemplateService {

	@Autowired
	private TemplateRepository repository;

	@Autowired
	private SequenceGeneratorService sequenceGenerator;

	private final Logger logger = LoggerFactory.getLogger(TemplateService.class);

	public List<Template> getAllTemplateFields() {
		return repository.findAll();
	}	

	public Template getTemplateByID(Long id) {
		Optional<Template> template = repository.findById(id);
		return template.isPresent() ? template.get() : new Template();
	}

	public Template createTemplate(Template template) {
		Template templateObj = new Template();
		if (getTemplateByID(template.getId()).getId() == 0
				&& ObjectUtils.isEmpty(repository.findByTitle(template.getTitle()))) {

			template.setId(sequenceGenerator.generateSequence(Template.SEQUENCE_NAME));
			templateObj = repository.save(template);
			if (templateObj.getId() == template.getId()) {
				logger.info("Template Created - " + templateObj.getTitle());
			} else {
				logger.error("There was an issue while creating Template");
				templateObj.setErrorMessage("Template Creation Failed!");
			}
		} else {
			logger.info("Template - " + template.getTitle() + " exists already!");
			templateObj.setErrorMessage("Template - " + template.getTitle() + " exists already!");
		}
		return templateObj;
	}

	public String createTemplate(List<Template> templates) {
		templates = templates.stream()
				.map(m -> new Template(
						m.getId() == 0 ? sequenceGenerator.generateSequence(Template.SEQUENCE_NAME) : m.getId(),
						m.getTitle(), m.getDescription(), m.getFields(), m.getContent()))
				.collect(Collectors.toList());
		List<Template> templateList = repository.saveAll(templates);
		if (templateList.size() == templates.size()) {
			logger.info("Template(s) Create/Update Successfully!");
			return "Template(s) Create/Update Successfully";
		} else {
			logger.info("There was an issue while creating Template(s)");
			return "Offer Letter Field(s) Creation Failed!";
		}

	}

	public boolean deleteTemplate(Long id) {
		repository.deleteById(id);
		logger.info("Template deleted Successfully");
		return true;
	}

	public String deleteAllTemplate() {
		repository.deleteAll();
		logger.info("All Templates deleted Successfully");
		return "All Templates deleted Successfully";
	}

	public static byte[] convertHtmlToPdfBytes(String htmlString) throws IOException, DocumentException {
		Document document = new Document();

		ByteArrayOutputStream out = new ByteArrayOutputStream();

		PdfWriter writer = PdfWriter.getInstance(document, out);
		document.open();	
		InputStream in = new ByteArrayInputStream(htmlString.getBytes());
		XMLWorkerHelper.getInstance().parseXHtml(writer, document, in);
		document.close();

		return out.toByteArray();
	}

}
