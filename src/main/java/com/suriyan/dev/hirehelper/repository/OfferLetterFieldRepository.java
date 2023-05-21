package com.suriyan.dev.hirehelper.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.suriyan.dev.hirehelper.model.OfferLetterField;

@Repository
public interface OfferLetterFieldRepository extends MongoRepository<OfferLetterField, Long>{

}
