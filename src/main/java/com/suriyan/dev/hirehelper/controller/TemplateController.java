package com.suriyan.dev.hirehelper.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.suriyan.dev.hirehelper.model.FileOutputFormat;
import com.suriyan.dev.hirehelper.model.Template;
import com.suriyan.dev.hirehelper.service.TemplateService;

@RestController
@RequestMapping("/templates")
public class TemplateController {

	@Autowired
	private TemplateService service;

	@GetMapping
	public ResponseEntity<List<Template>> getAllTemplates() {
		List<Template> allTemplates = service.getAllTemplateFields();
		return ResponseEntity.ok(allTemplates);
	}

	@PostMapping(consumes = "application/json")
	public ResponseEntity<Template> createTemplate(@RequestBody Template template) {
		Template templateObj = service.createTemplate(template);
		return ResponseEntity.ok(templateObj);
	}

	@PostMapping(value = "/batch", consumes = "application/json")
	public String createOrUpdateTemplates(@RequestBody List<Template> templates) {
		return service.createTemplate(templates);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Long> deleteTemplate(@PathVariable Long id) {
		boolean isRemoved = service.deleteTemplate(id);
		if (!isRemoved) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@DeleteMapping("/all")
	public String deleteTemplate() {
		return service.deleteAllTemplate();
	}

	@PostMapping("/pdf")
	public ResponseEntity<byte[]> generatePDF(@RequestBody String html) throws IOException {
		ByteArrayOutputStream target = new ByteArrayOutputStream();
		ConverterProperties converterProperties = new ConverterProperties();
		converterProperties.setBaseUri("http://localhost:8080");
		HtmlConverter.convertToPdf(html, target, converterProperties);
		byte[] contents = target.toByteArray();
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("output.pdf", "output.pdf");
		headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
		return ResponseEntity.ok().headers(headers).body(contents);
	}

	@PostMapping("/pdf/zip")
	public ResponseEntity<byte[]> generatePDFZip(@RequestBody List<FileOutputFormat> outputFormat,
			HttpServletResponse response) throws IOException {

		HashMap<String, byte[]> mapHtmlData = new HashMap<String, byte[]>();

		for (FileOutputFormat format : outputFormat) {
			byte[] contents = convertListOfBytesToPDF(format.getFileData());
			mapHtmlData.put(format.getUniqueFileName(), contents);
		}
		byte[] zippedContent = convertListOfBytesToZip(mapHtmlData);
		response.setContentType("application/zip");
		response.setStatus(HttpServletResponse.SC_OK);
		response.addHeader("Content-Disposition", "attachment; filename=\"output.zip\"");
		return new ResponseEntity<>(zippedContent, HttpStatus.OK);
	}

	private byte[] convertListOfBytesToPDF(String html) throws IOException {
		ByteArrayOutputStream target = new ByteArrayOutputStream();
		ConverterProperties converterProperties = new ConverterProperties();
		converterProperties.setBaseUri("http://localhost:8080");
		HtmlConverter.convertToPdf(html, target, converterProperties);
		return target.toByteArray();
	}

	protected byte[] convertListOfBytesToZip(HashMap<String, byte[]> mapReporte) throws IOException {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try (ZipOutputStream zos = new ZipOutputStream(baos)) {
			for (Entry<String, byte[]> reporte : mapReporte.entrySet()) {
				ZipEntry entry = new ZipEntry(reporte.getKey());
				entry.setSize(reporte.getValue().length);
				zos.putNextEntry(entry);
				zos.write(reporte.getValue());
				zos.closeEntry();
			}
		}
		return baos.toByteArray();
	}

}
