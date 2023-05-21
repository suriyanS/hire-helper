package com.aspiringminds.event.joboffer.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "offerletter")
public class OfferLetterField implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Transient
	public static final String SEQUENCE_NAME = "offerletter_sequence";

	@Id
	private long id;
	private String fieldName;
	private String fieldCode;
	private String fieldValue;

	public OfferLetterField() {
		super();
	}

	public OfferLetterField(long id, String fieldName, String fieldCode, String fieldValue) {
		super();
		this.id = id;
		this.fieldName = fieldName;
		this.fieldCode = fieldCode;
		this.fieldValue = fieldValue;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getFieldCode() {
		return fieldCode;
	}

	public void setFieldCode(String fieldCode) {
		this.fieldCode = fieldCode;
	}

	public String getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(String fieldValue) {
		this.fieldValue = fieldValue;
	}

}
