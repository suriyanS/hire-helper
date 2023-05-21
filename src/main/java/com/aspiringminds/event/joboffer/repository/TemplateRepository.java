package com.aspiringminds.event.joboffer.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aspiringminds.event.joboffer.model.Template;

@Repository
public interface TemplateRepository extends MongoRepository<Template, Long>{
	
	public Template findByTitle(String title);

}
