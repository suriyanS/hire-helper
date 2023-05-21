package com.suriyan.dev.hirehelper.model;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Document(collection = "template")
public class Template implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Transient
	public static final String SEQUENCE_NAME = "template_sequence";

	@Id()
	private long id;
	private String title;
	private String description;
	private List<OfferLetterField> fields;
	private String content;

	@JsonInclude(Include.NON_NULL)
	private String errorMessage;
	
	@JsonInclude(Include.NON_NULL)
	private byte[] fileBlob;

	public Template() {
		super();
	}

	public Template(long id, String title, String description, List<OfferLetterField> fields, String content) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.fields = fields;
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<OfferLetterField> getFields() {
		return fields;
	}

	public void setFields(List<OfferLetterField> fields) {
		this.fields = fields;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public byte[] getFileBlob() {
		return fileBlob;
	}

	public void setFileBlob(byte[] fileBlob) {
		this.fileBlob = fileBlob;
	}
	
	
	
	

}
