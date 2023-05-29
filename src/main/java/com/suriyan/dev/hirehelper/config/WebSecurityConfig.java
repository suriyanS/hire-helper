package com.suriyan.dev.hirehelper.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//        .cors().and()
//        .csrf().disable()
//        .authorizeRequests()        
//        .antMatchers("*").permitAll();        
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}