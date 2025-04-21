package com.epam.itemtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ItemTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItemTrackerApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer(){
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**")
//						.allowedOrigins("http://localhost:3000")  // Specify allowed origin
//						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//						.allowCredentials(true);
//			}
//		};
//	}

}
