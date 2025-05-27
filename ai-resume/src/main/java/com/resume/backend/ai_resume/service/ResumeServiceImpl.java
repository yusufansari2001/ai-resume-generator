package com.resume.backend.ai_resume.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.api.key}")
    private String apiKey;

    @Value("${openrouter.api.model}")
    private String modelName;

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
        String promptString = loadPromptFromFile("resume_prompt.txt");
        String promptContent = putValuesToTemplate(promptString, Map.of(
                "userDescription", userResumeDescription
        ));

        String response = callLLMApi(promptContent);
        return parseMultipleResponses(response);
    }

    @Override
    public double calculateAtsScore(String resumeJson) throws IOException {
        String promptString = loadPromptFromFile("ats_prompt.txt");
        String promptContent = putValuesToTemplate(promptString, Map.of(
                "resumeJson", resumeJson
        ));

        String response = callLLMApi(promptContent);
        double ats = parseAtsScoreResponse(response);
        return ats;
    }

    private double parseAtsScoreResponse(String response) {
        try {
            // Look for a simple numeric response or parse from JSON
            // This depends on how your AI responds
            String scoreString = response.replaceAll("[^0-9.]", "").trim();
            return Double.parseDouble(scoreString);
        } catch (Exception e) {
            System.err.println("Error parsing ATS score: " + e.getMessage());
            return 0.0;
        }
    }

    private String callLLMApi(String promptContent) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("HTTP-Referer", "http://localhost"); // required by OpenRouter
        headers.set("X-Title", "ResumeApp");             // name your app

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("messages", List.of(
                Map.of("role", "user", "content", promptContent)
        ));
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

        try {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");
        } catch (Exception e) {
            System.err.println("Error parsing LLM response: " + e.getMessage());
            return "";
        }
    }

    private String loadPromptFromFile(String filename) throws IOException {
        Path path = new ClassPathResource(filename).getFile().toPath();
        return Files.readString(path);
    }

    private String putValuesToTemplate(String template, Map<String, String> values) {
        for (Map.Entry<String, String> entry : values.entrySet()) {
            template = template.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return template;
    }

    private static Map<String, Object> parseMultipleResponses(String response) {
        Map<String, Object> jsonResponse = new HashMap<>();

        int thinkStart = response.indexOf("<think>") + 7;
        int thinkEnd = response.indexOf("</think>");
        if (thinkStart != -1 && thinkEnd != -1) {
            String thinkContent = response.substring(thinkStart, thinkEnd).trim();
            jsonResponse.put("think", thinkContent);
        } else {
            jsonResponse.put("think", null);
        }

        int jsonStart = response.indexOf("```json") + 7;
        int jsonEnd = response.lastIndexOf("```");
        if (jsonStart != -1 && jsonEnd != -1 && jsonStart < jsonEnd) {
            String jsonContent = response.substring(jsonStart, jsonEnd).trim();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Map<String, Object> dataContent = objectMapper.readValue(jsonContent, Map.class);
                jsonResponse.put("data", dataContent);
            } catch (Exception e) {
                jsonResponse.put("data", null);
                System.err.println("Invalid JSON in response: " + e.getMessage());
            }
        } else {
            jsonResponse.put("data", null);
        }

        return jsonResponse;
    }
}
