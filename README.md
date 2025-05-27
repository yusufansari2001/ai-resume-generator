# AI Resume Generator 🧠📄

A web-based application that leverages AI to **generate professional resumes** and calculate **ATS (Applicant Tracking System) scores** from user input. Built using **Spring Boot (backend)** and **React with Tailwind CSS (frontend)**, the project integrates with local and external LLMs for intelligent content generation and optimization feedback.

---

## 🚀 Features

- ✅ AI-powered resume generation
- ✅ ATS (Applicant Tracking System) score calculation
- ✅ Interactive frontend with modern UI
- ✅ Integration with local LLMs (DeepSeek via Ollama)
- ✅ Option to switch to fast remote API-based model calls
- ✅ Uses **Spring AI** to simplify prompt engineering and LLM interaction

---

## 📸 UI Snapshots

> ![image](https://github.com/user-attachments/assets/b79285ac-14a4-4970-97f1-7ca8a4ee8e6f)
![image](https://github.com/user-attachments/assets/01249c70-c345-42ce-9bd9-d86894042d58)




---

## 🛠️ Tech Stack

### Backend (Spring Boot + Spring AI)
- Java 17+
- **Spring Boot 3+**
- **Spring AI** (for seamless LLM integration)
- Spring Web
- Spring Security (if used)
- Jackson (for JSON parsing)
- Custom services for AI processing

### Frontend (React)
- React.js
- Tailwind CSS
- Axios for API calls
- Animated and responsive design

### AI Integration
- Initially used [Ollama](https://ollama.com/) to run the **DeepSeek** model locally
- Now supports **remote API-based LLMs** for faster and scalable generation
- **Spring AI** is used in the backend to interact with both local and remote LLMs using a pluggable interface

---

## 🧠 AI Model Integration

### Phase 1: Local LLM with Ollama

Used [Ollama](https://ollama.com/) to run the **DeepSeek** model locally:

```bash
ollama run deepseek-coder
