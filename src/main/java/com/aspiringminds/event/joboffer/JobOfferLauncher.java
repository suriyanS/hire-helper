package com.aspiringminds.event.joboffer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@ComponentScan(basePackages={"com.aspiringminds.event.joboffer"})
@CrossOrigin("*")
@EnableSwagger2
public class JobOfferLauncher {

    public static void main(String[] args) {
        SpringApplication.run(JobOfferLauncher.class, args);
    }
    
    @Bean
    public Docket postApi() {
      return new Docket(DocumentationType.SWAGGER_2).select()
    	 .apis(RequestHandlerSelectors.basePackage("com.aspiringminds.event.joboffer")).build();
    }

}
