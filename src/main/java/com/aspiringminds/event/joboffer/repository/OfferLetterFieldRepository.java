package com.aspiringminds.event.joboffer.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.aspiringminds.event.joboffer.model.OfferLetterField;

@Repository
public interface OfferLetterFieldRepository extends MongoRepository<OfferLetterField, Long>{

}
