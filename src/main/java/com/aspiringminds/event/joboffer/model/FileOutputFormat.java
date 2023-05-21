package com.aspiringminds.event.joboffer.model;

import java.util.List;

public class FileOutputFormat {

	private long fileNo;
	private String fileFormat;
	private String fileName;
	private String uniqueFileName;
	private String fileNamePrefix;
	private List<OfferLetterField> fileFieldMap;
	private String fileData;

	public long getFileNo() {
		return fileNo;
	}

	public void setFileNo(long fileNo) {
		this.fileNo = fileNo;
	}

	public String getFileFormat() {
		return fileFormat;
	}

	public void setFileFormat(String fileFormat) {
		this.fileFormat = fileFormat;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getUniqueFileName() {
		return uniqueFileName;
	}

	public void setUniqueFileName(String uniqueFileName) {
		this.uniqueFileName = uniqueFileName;
	}

	public String getFileNamePrefix() {
		return fileNamePrefix;
	}

	public void setFileNamePrefix(String fileNamePrefix) {
		this.fileNamePrefix = fileNamePrefix;
	}

	public List<OfferLetterField> getFileFieldMap() {
		return fileFieldMap;
	}

	public void setFileFieldMap(List<OfferLetterField> fileFieldMap) {
		this.fileFieldMap = fileFieldMap;
	}

	public String getFileData() {
		return fileData;
	}

	public void setFileData(String fileData) {
		this.fileData = fileData;
	}

}
