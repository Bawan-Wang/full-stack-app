package com.example.backend;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 所有 API 路徑都允許
                        .allowedOrigins("http://localhost:5173") // 前端 URL
                        .allowedMethods("*"); // 允許所有方法：GET、POST、PUT、DELETE...
            }
        };
    }
}

