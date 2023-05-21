package com.aspiringminds.event.joboffer.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialBlob;

import org.w3c.dom.html.HTMLCollection;

import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;

public class PdfGenerator {
	private static void generatePDFFromHTML(String filename) throws DocumentException, IOException {
	    Document document = new Document();
	    PdfWriter writer = PdfWriter.getInstance(document,
	      new FileOutputStream("src/output/html.pdf"));
	    document.open();
	    XMLWorkerHelper.getInstance().parseXHtml(writer, document,
	      new FileInputStream(filename));
	    document.close();
	    byte[] byteArray = filename.getBytes();
	    try {
			Blob blob = new SerialBlob(byteArray);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {		
		try {
//			HtmlConverter.convertToPdf(html, pdfStream);
			PdfGenerator.generatePDFFromHTML("D:\\sample.html");
		} catch (DocumentException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
