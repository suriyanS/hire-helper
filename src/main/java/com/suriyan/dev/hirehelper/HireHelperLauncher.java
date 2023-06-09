package com.suriyan.dev.hirehelper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@ComponentScan(basePackages = { "com.suriyan.dev.hirehelper" })
@CrossOrigin("*")
@EnableSwagger2
public class HireHelperLauncher {

	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(HireHelperLauncher.class);
		springApplication.addListeners(new ApplicationPidFileWriter("application.pid"));
		springApplication.run(args);
	}

	@Bean
	public Docket postApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.suriyan.dev.hirehelper")).build();
	}

}
