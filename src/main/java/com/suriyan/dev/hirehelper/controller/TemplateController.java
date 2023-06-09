package com.suriyan.dev.hirehelper.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.lowagie.text.DocumentException;
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

	@PutMapping(consumes = "application/json")
	public ResponseEntity<Template> updateTemplate(@RequestBody Template template) {
		Template templateObj = service.updateTemplate(template);
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
	public ResponseEntity<byte[]> generatePDFZip(@RequestBody List<FileOutputFormat> outputFormat) throws IOException {
		HashMap<String, byte[]> mapHtmlData = new HashMap<>();

		for (FileOutputFormat format : outputFormat) {
			byte[] contents = convertListOfBytesToPDF(format.getFileData());
			mapHtmlData.put(format.getUniqueFileName(), contents);
		}

		if (mapHtmlData.size() > 1) {
			byte[] zippedContent = convertListOfBytesToZip(mapHtmlData);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			headers.setContentDispositionFormData("attachment", "output.zip");

			return ResponseEntity.ok().headers(headers).body(zippedContent);
		}

		String filename = mapHtmlData.keySet().iterator().next();
		byte[] pdfContent = mapHtmlData.get(filename);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", filename + ".pdf");

		return ResponseEntity.ok().headers(headers).body(pdfContent);
	}

	@PostMapping("/doc/zip")
	public ResponseEntity<byte[]> generateDocZip(@RequestBody List<FileOutputFormat> outputFormat) throws IOException {
		HashMap<String, byte[]> mapHtmlData = new HashMap<>();

		for (FileOutputFormat format : outputFormat) {
			byte[] contents;
			try {
				contents = convertListOfBytesToDOCX(format.getFileData());
				mapHtmlData.put(format.getUniqueFileName(), contents);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (DocumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		if (mapHtmlData.size() > 1) {
			byte[] zippedContent = convertListOfBytesToZip(mapHtmlData);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
			headers.setContentDispositionFormData("attachment", "output.zip");

			return ResponseEntity.ok().headers(headers).body(zippedContent);
		}

		String filename = mapHtmlData.keySet().iterator().next();
		byte[] docxContent = mapHtmlData.get(filename);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		headers.setContentDispositionFormData("attachment", filename + ".docx");

		return ResponseEntity.ok().headers(headers).body(docxContent);
	}

	private byte[] convertListOfBytesToPDF(String html) throws IOException {
		ByteArrayOutputStream target = new ByteArrayOutputStream();
		ConverterProperties converterProperties = new ConverterProperties();
		converterProperties.setBaseUri("http://localhost:8080");
		HtmlConverter.convertToPdf(html, target, converterProperties);
		return target.toByteArray();
	}

	private byte[] convertListOfBytesToDOCX(String html) throws IOException, DocumentException {
		// Convert HTML to PDF using Flying Saucer
		byte[] pdfBytes = convertListOfBytesToPDF(html);

		// Convert PDF to DOCX using Apache PDFBox and Apache POI
		try (InputStream pdfInputStream = new ByteArrayInputStream(pdfBytes)) {
			PDDocument pdDocument = PDDocument.load(pdfInputStream);
			XWPFDocument document = new XWPFDocument();
			// Iterate through each page of the PDF
			for (int i = 0; i < pdDocument.getNumberOfPages(); i++) {
				org.apache.pdfbox.text.PDFTextStripper stripper = new org.apache.pdfbox.text.PDFTextStripper();
				stripper.setStartPage(i + 1);
				stripper.setEndPage(i + 1);
				String pageText = stripper.getText(pdDocument);

				// Add the extracted text to the DOCX document
				document.createParagraph().createRun().setText(pageText);
			}

			// Save the converted document to a byte array
			ByteArrayOutputStream docxOutputStream = new ByteArrayOutputStream();
			document.write(docxOutputStream);
			document.close();
			return docxOutputStream.toByteArray();
		}
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
