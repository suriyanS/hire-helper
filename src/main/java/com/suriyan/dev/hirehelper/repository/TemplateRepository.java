package com.suriyan.dev.hirehelper.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.suriyan.dev.hirehelper.model.Template;

@Repository
public interface TemplateRepository extends MongoRepository<Template, Long>{
	
	public Template findByTitle(String title);

}
