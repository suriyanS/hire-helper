# job-offer-app

## TECH-PIRATES (ASPIRING MINDS)

**Contributors**

- **Ajay Kumar R**
- **Suriyan S**

_ **Source Code GIT Repository:** _

**Web Browser Link:**

[**https://github.com/Tech-Pirates-Aspiring-Minds/job-offer-generator**](https://github.com/Tech-Pirates-Aspiring-Minds/job-offer-generator)

**https://github.com/Tech-Pirates-Aspiring-Minds/license-api-test-component**

**GIT Clone Link:**

[**https://github.com/Tech-Pirates-Aspiring-Minds/job-offer-generator.git**](https://github.com/Tech-Pirates-Aspiring-Minds/job-offer-generator.git)

_ **Frameworks:** _

**Job Offer Letter Generator**

The Job offer letter generator is based on Front end as angular and back end as spring boot. This application allows users to create pre-defined templates (Ex: job offer letter, Bill., etc.) With dynamic fields. We should provide data for dynamic fields via excel at the time of report/letter generation. This application reduce manual efforts and times saving.

**Application Process Flow:**

Application runs at port 4200

[http://localhost:4200/#/create-template](http://localhost:4200/#/create-template)

**Template Creation:**

Create Template with basic details required for a template with dynamic fields and template content.

**Content Prepration:**

Create Content as below enclosed with flower brackets to get dynamically replace it when template generation Ex: {Employee Name}. Note : the mentioned name should be matched with dynamic fields.


**Save the Template:**
Save the template will confirm with success message.

**View Template:**

View the created templates as below. User can preview/generate the template and can also delete if no need.

**Preview Template:**

User can preview the template before generate. It only contains the original content while created.

It is downloadable and also it has some additional features.

**Template Generation:**

Step 1: Upload data file with data to generated in excel. Only excel files allowed. Excel file can contains multiple data to be generated.

The excel data should be as follows. The column name should be matched with dynamic fields in template. If fields mismatched the only matched fields will be replaced , remaining still present with flower brackets as we created in template.

Step 2 : Select the required excel sheet as below.

Step 3: Click next to proceed

Step 4: Document generation – User should provide the file format and file name. These two fileds are mandatory. Field name prefix can be optional. Prefix can be excel data field names.

Step 5: Generate the template – Once all done then proceed with Generate button to generate the bundle of templates as Zip. The below images shows thet bundle of offer letter generated as zip with dynamic fields.

Step 6: View the generated files


_ **Swagger UI** _

Swagger UI has been included in this project for Rest API documentation


