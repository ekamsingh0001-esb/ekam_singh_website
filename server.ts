import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Dynamic Gemini SDK client with User-Agent telemetry
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const EKAM_PORTFOLIO_SYSTEM_PROMPT = `You are EKAM.AI, the official personal artificial intelligence assistant for Ekam Singh's engineering portfolio.
Your role is to answer questions from recruiters, founders, developers, and visitors with exceptional technical depth, accuracy, clarity, and professionalism.

ABOUT EKAM SINGH:
- Full Name: Ekam Singh
- Degree & Institution: B.Tech in Computer Science and Engineering (CSE) at Vellore Institute of Technology (VIT), Vellore (Ongoing undergraduate, Class of 2026).
- Location: South Delhi, India (Home Base) & Vellore, Tamil Nadu (Campus).
- Primary Focus: Creative frontend engineering, WebGL/GLSL fluid shaders, full-stack systems, applied AI, and hackathon prototypes.
- Contact Email: ekamsingh1808@gmail.com
- GitHub Profile: https://github.com/ekamsingh0001-esb
- LinkedIn Profile: Ekam Singh (https://www.linkedin.com/in/ekam-singh)

ALL VERIFIED SOFTWARE PROJECTS & EXACT REPOSITORIES:
1. Tick — Employee Output & Performance Intelligence
   - Category: Hackathons / Enterprise Systems
   - Repository: https://github.com/Vedant-Rajgaria/Tick.git
   - Tech Stack: React, TypeScript, Node.js, Tailwind CSS, Performance Metrics Engine, REST APIs, Data Visualization
   - Functionality: Helps companies automatically generate output sheets showing how much work each employee has completed throughout custom periods (sprints, monthly reviews). Provides constructive feedback loops and growth advice to help employees improve their velocity and skills.

2. StudySync — Student Focus & Academic Score Booster
   - Category: Hackathons / EdTech Focus App
   - Repository: https://github.com/vengala69/Vinhack.git
   - Tech Stack: React, TypeScript, Tailwind CSS, Pomodoro / Flow Engine, Score Analytics, Web Audio Feedback
   - Functionality: A focus-enhancing productivity web application that helps students maximize deep study concentration, structure disciplined study sessions, eliminate cognitive distractions, and measurably elevate academic exam scores by +18%.

3. CalmPulse — Interactive Stress Relief Software
   - Category: AI & Software / Mental Wellness
   - Repository: https://github.com/vengala69/Vinhack.git
   - Tech Stack: React, TypeScript, WebGL / Canvas, Web Audio Synthesizer, Tailwind CSS, Sensory Physics
   - Functionality: Digital decompression platform featuring guided visual 4-7-8 breath pacing, interactive tactile fluid relaxation canvases, generative soothing acoustics, and mindfulness micro-breaks for students and developers.

4. Offline AI — On-Device Local Neural Engine
   - Category: AI & Software
   - Repository: https://github.com/ekamsingh0001-esb/offline-ai.git
   - Tech Stack: Python, ONNX Runtime, WebLLM / GGUF, Local Inference, 4-bit/8-bit Quantization, Zero Cloud API
   - Functionality: An on-device AI system that runs completely offline without internet connectivity or external cloud APIs. Guarantees zero latency, zero telemetry, and 100% privacy-first local neural inference on client hardware.

5. Synapse Engine — AI Web Experience
   - Category: Web Development
   - Repository: https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git
   - Tech Stack: WebGL 2, GLSL Shaders, Three.js, React, TypeScript, Tailwind CSS
   - Functionality: Experimental generative canvas with real-time WebGL fluid shader displacement, RGB chromatic aberration splitting, pointer velocity tracking, and reactive neural network node visualization running at a smooth 60 FPS.

6. Cognitive Vision & Neural Model Experimentation
   - Category: Personal Experiments
   - Repository: https://github.com/Vedant-Rajgaria/Tick.git
   - Tech Stack: Python, OpenCV, TensorFlow, Convolutional Nets, Edge Inference
   - Functionality: Research pipeline developed during the Jr. Artificial Intelligence Scientist summer camp with Vigyantram & Enactus IIT Delhi exploring convolutional networks and edge inference.

ACADEMIC JOURNEY:
1. Mayoor School, Noida: Nursery to Class 8 (Foundational schooling where interest in computers and logic puzzles took root).
2. Delhi Public School (DPS), Mathura Road, New Delhi: Classes 9 to 12 (Senior schooling, strong foundation in mathematics, physics, and computer science fundamentals).
3. Vellore Institute of Technology (VIT), Vellore: B.Tech in CSE (Ongoing undergraduate degree with intensive coursework in data structures, algorithms, operating systems, networks, and AI architectures).

VERIFIED CREDENTIALS:
1. Hewlett Packard Enterprise (HPE) — Software Engineering Job Simulation (via Forage): Designed RESTful web services and implemented comprehensive unit test suites.
2. Vigyantram & Enactus IIT Delhi — Jr. Artificial Intelligence Scientist Summer Camp: AI/ML foundations, intelligent algorithms, and neural networks.
3. Avishkaar — Android App Development Workshop: Mobile application architectures and component lifecycles.
4. Hindustan Times & IBM / Delhi Govt — HT Code-a-thon: Website Development with HTML.

COMMUNICATION INSTRUCTIONS:
- Give comprehensive, well-structured, and helpful answers.
- When users ask about any project, explain what it does, the technologies used, and ALWAYS provide the exact repository link in your answer.
- Format responses using clear markdown: bold highlights, bullet points, and hyperlinks.
- If asked about contact or collaboration, provide his email (ekamsingh1808@gmail.com) and direct them to the Contact page.`;

// In-memory fallback responses if API key is absent or network fails
function getLocalSmartResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('tick')) {
    return `### **Tick — Employee Output & Performance Intelligence**
Tick is an enterprise software platform developed by Ekam that generates automated output sheets tracking which employee has done how much work throughout a specified period of time (sprints, monthly reviews).

**Key Features:**
- **Automated Output Sheets**: Aggregates deliverables, task velocity, and output quotas.
- **Employee Growth Advisor**: Generates constructive feedback loops to help individual team members improve their skills and output.
- **Repository**: [https://github.com/Vedant-Rajgaria/Tick.git](https://github.com/Vedant-Rajgaria/Tick.git)`;
  }

  if (q.includes('studysync') || q.includes('study sync')) {
    return `### **StudySync — Student Focus & Academic Score Booster**
StudySync is an EdTech productivity software engineered by Ekam during hackathons to help students maximize deep study focus and measurably improve their academic test scores.

**Key Features:**
- **Adaptive Flow-State Timers**: Customizable Pomodoro intervals and structured breaks.
- **Score Analytics**: Correlates focused study hours directly with exam score gains (+18%).
- **Distraction Shield**: Minimalist interface with gentle Web Audio ambient focus chimes.
- **Repository**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)`;
  }

  if (q.includes('offline') || q.includes('on-device') || q.includes('local ai')) {
    return `### **Offline AI — On-Device Local Neural Engine**
Offline AI is a self-contained artificial intelligence system engineered by Ekam that executes completely offline on-device without internet connectivity or third-party cloud APIs.

**Key Highlights:**
- **Air-Gapped Privacy**: 100% of tensor operations execute locally; zero data is transmitted over the network.
- **4-Bit / 8-Bit Quantization**: Optimized memory footprint running smoothly on consumer hardware via ONNX / WebLLM.
- **Sub-100ms Latency**: Instantaneous local token streaming without remote server latency.
- **Repository**: [https://github.com/ekamsingh0001-esb/offline-ai.git](https://github.com/ekamsingh0001-esb/offline-ai.git)`;
  }

  if (q.includes('stress') || q.includes('calm') || q.includes('relief') || q.includes('calmpulse')) {
    return `### **CalmPulse — Interactive Stress Relief Software**
CalmPulse is an interactive mental wellness web application engineered to relieve coding fatigue, exam stress, and cognitive burnout for developers and students.

**Key Highlights:**
- **4-7-8 Breathing Pacer**: Synchronized rhythmic visual expansion and audio chimes for rapid physiological decompression.
- **Sensory Fluid Canvas**: Interactive fluid particle physics that dissipates tension upon touch/cursor interaction.
- **Binaural Harmonics**: Generative ambient acoustic textures.
- **Repository**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)`;
  }

  if (q.includes('synapse')) {
    return `### **Synapse Engine — AI Web Experience**
Synapse Engine is Ekam's signature web development project: an experimental generative canvas featuring interactive WebGL fluid displacement shaders, RGB chromatic aberration splitting, and reactive neural node mapping.

**Key Highlights:**
- GPU-accelerated multi-pass GLSL shaders running at 60 FPS.
- Pointer velocity buffer with decaying fluid displacement waves.
- **Repository**: [https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git](https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git)`;
  }

  if (q.includes('vision') || q.includes('cognitive') || q.includes('experiment')) {
    return `### **Cognitive Vision & Neural Model Experimentation**
A research and computer vision pipeline conducted during the Jr. Artificial Intelligence Scientist summer camp with Vigyantram & Enactus IIT Delhi.

**Key Highlights:**
- OpenCV spatial feature extraction, convolutional neural networks, and edge inference confidence benchmarking.
- **Repository**: [https://github.com/Vedant-Rajgaria/Tick.git](https://github.com/Vedant-Rajgaria/Tick.git)`;
  }

  if (q.includes('who is') || q.includes('about ekam') || q.includes('intro')) {
    return `**Ekam Singh** is a B.Tech Computer Science and Engineering student at **VIT Vellore** (Batch of 2026), originally from **South Delhi**.

He specializes in:
- **Creative Frontend & WebGL**: Interactive fluid shaders, responsive UI/UX, and typography.
- **AI & Systems**: Offline AI, neural vision models, and enterprise RESTful services.
- **Hackathons**: Rapid zero-to-one prototyping, including projects like **StudySync** and **Tick**.

You can explore his work on GitHub at [github.com/ekamsingh0001-esb](https://github.com/ekamsingh0001-esb) or contact him at **ekamsingh1808@gmail.com**.`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('school') || q.includes('vit')) {
    return `**Ekam Singh's Academic Journey:**
1. **Mayoor School, Noida** — Nursery to Class 8 (Foundational schooling and first curiosity for technology).
2. **Delhi Public School (DPS), Mathura Road, New Delhi** — Classes 9 to 12 (Senior schooling with focus on advanced mathematics and CS).
3. **Vellore Institute of Technology (VIT), Vellore** — B.Tech in Computer Science and Engineering (Currently ongoing undergraduate degree).`;
  }

  if (q.includes('repo') || q.includes('github') || q.includes('code') || q.includes('project')) {
    return `Here are the official repositories for Ekam's projects:
- **Tick**: [https://github.com/Vedant-Rajgaria/Tick.git](https://github.com/Vedant-Rajgaria/Tick.git)
- **StudySync**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)
- **CalmPulse**: [https://github.com/vengala69/Vinhack.git](https://github.com/vengala69/Vinhack.git)
- **Synapse Engine**: [https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git](https://github.com/ekamsingh0001-esb/Synapse-Engine-AI-Web-Experience.git)
- **Offline AI**: [https://github.com/ekamsingh0001-esb/offline-ai.git](https://github.com/ekamsingh0001-esb/offline-ai.git)
- **Cognitive Vision**: [https://github.com/Vedant-Rajgaria/Tick.git](https://github.com/Vedant-Rajgaria/Tick.git)

His main GitHub profile is [github.com/ekamsingh0001-esb](https://github.com/ekamsingh0001-esb).`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('collaborate')) {
    return `You can reach Ekam directly via:
- **Email**: [ekamsingh1808@gmail.com](mailto:ekamsingh1808@gmail.com)
- **GitHub**: [github.com/ekamsingh0001-esb](https://github.com/ekamsingh0001-esb)
- **LinkedIn**: [Ekam Singh](https://www.linkedin.com/in/ekam-singh)
- Or dispatch a message directly through the **Contact** page on this portfolio!`;
  }

  return `Ekam Singh is a B.Tech CSE student at VIT Vellore from South Delhi, specializing in WebGL fluid shaders, full-stack software, and hackathon prototypes. He has created Tick, StudySync, CalmPulse, Offline AI, and Synapse Engine. You can reach him at ekamsingh1808@gmail.com.`;
}

// AI Chatbot Endpoint with resilient Gemini model fallback
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiClient = getGeminiClient();

    if (aiClient) {
      // Build conversation contents for Gemini
      const contents: any[] = [];
      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      // Preferred model progression from recommended Gemini API guidelines
      const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
      let reply: string | null = null;
      let usedModel: string | null = null;

      for (const modelName of candidateModels) {
        try {
          const response = await aiClient.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: EKAM_PORTFOLIO_SYSTEM_PROMPT,
              temperature: 0.7,
            },
          });

          if (response.text) {
            reply = response.text;
            usedModel = modelName;
            break;
          }
        } catch (modelErr) {
          console.warn(`Model ${modelName} returned error, trying next candidate:`, modelErr);
        }
      }

      if (reply) {
        return res.json({ reply, source: usedModel });
      }

      // If all Gemini models encountered transient issues, use rich local dossier fallback
      const fallbackReply = getLocalSmartResponse(message);
      return res.json({ reply: fallbackReply, fallback: true });
    } else {
      const reply = getLocalSmartResponse(message);
      return res.json({ reply, fallback: true });
    }
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error processing message' });
  }
});

const EKAM_RECIPIENT_EMAIL = 'ekamsingh1808@gmail.com';

// In-memory transmission store for messages routed to ekamsingh1808@gmail.com
interface ContactTransmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  recipient: string;
  timestamp: string;
  status: 'routed' | 'logged';
}

const contactTransmissions: ContactTransmission[] = [];

// Contact Form Endpoint - routes all incoming messages to ekamsingh1808@gmail.com
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please provide name, email, subject, and message.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const transmission: ContactTransmission = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      recipient: EKAM_RECIPIENT_EMAIL,
      timestamp: new Date().toISOString(),
      status: 'routed',
    };

    contactTransmissions.unshift(transmission);
    if (contactTransmissions.length > 50) contactTransmissions.pop();

    console.log(`=======================================================`);
    console.log(`[INCOMING MESSAGE DESTINED FOR: ${EKAM_RECIPIENT_EMAIL}]`);
    console.log(`ID: ${transmission.id}`);
    console.log(`From: ${transmission.name} <${transmission.email}>`);
    console.log(`Subject: ${transmission.subject}`);
    console.log(`Message Body:\n${transmission.message}`);
    console.log(`Delivering to recipient inbox: ${EKAM_RECIPIENT_EMAIL}`);
    console.log(`=======================================================`);

    // Prepare direct mail client urls
    const mailtoUrl = `mailto:${EKAM_RECIPIENT_EMAIL}?subject=${encodeURIComponent(`[Portfolio] ${transmission.subject}`)}&body=${encodeURIComponent(`From: ${transmission.name} (${transmission.email})\n\n${transmission.message}`)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EKAM_RECIPIENT_EMAIL}&su=${encodeURIComponent(`[Portfolio] ${transmission.subject}`)}&body=${encodeURIComponent(`From: ${transmission.name} (${transmission.email})\n\n${transmission.message}`)}`;

    // Real external email forwarding to ekamsingh1808@gmail.com via FormSubmit
    let deliveryStatus: 'delivered' | 'needs_activation' | 'forwarding_queued' | 'logged_locally' = 'forwarding_queued';
    let deliveryNote = '';
    let needsActivation = false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${EKAM_RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': 'https://ekam-portfolio.vercel.app',
          'Origin': 'https://ekam-portfolio.vercel.app',
        },
        body: JSON.stringify({
          name: transmission.name,
          email: transmission.email,
          _replyto: transmission.email,
          _subject: `[Portfolio Direct Message] ${transmission.subject} — from ${transmission.name}`,
          message: `${transmission.message}\n\n---------------------------------------\nSender Details:\nName: ${transmission.name}\nEmail: ${transmission.email}\nRecipient: ${EKAM_RECIPIENT_EMAIL}\nDispatched via: Ekam Singh Personal Portfolio`,
          _template: 'table',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const formSubmitData: any = await formSubmitRes.json().catch(() => null);
      console.log('FormSubmit external dispatch response:', formSubmitData);

      if (formSubmitData && (formSubmitData.success === 'true' || formSubmitData.success === true)) {
        deliveryStatus = 'delivered';
        deliveryNote = 'Email transmitted to ekamsingh1808@gmail.com inbox.';
      } else if (formSubmitData && typeof formSubmitData.message === 'string' && formSubmitData.message.includes('Activation')) {
        deliveryStatus = 'needs_activation';
        needsActivation = true;
        deliveryNote = "FormSubmit has dispatched a one-time 'Activate Form' confirmation email to ekamsingh1808@gmail.com. Once clicked, all future submissions arrive directly in your inbox without any prompt.";
      } else {
        deliveryStatus = 'forwarding_queued';
        deliveryNote = formSubmitData?.message || 'Message queued for inbox forwarding.';
      }
    } catch (deliveryErr: any) {
      console.warn('External mail forward error (non-fatal, logged to server queue):', deliveryErr?.message);
      deliveryStatus = 'logged_locally';
      deliveryNote = 'Message stored in live session log and ready for 1-click Gmail direct send.';
    }

    return res.json({
      success: true,
      message: `Transmission routed to ${EKAM_RECIPIENT_EMAIL}`,
      recipient: EKAM_RECIPIENT_EMAIL,
      transmissionId: transmission.id,
      timestamp: transmission.timestamp,
      deliveryStatus,
      deliveryNote,
      needsActivation,
      mailtoUrl,
      gmailUrl,
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    res.status(500).json({ error: 'Failed to dispatch message.' });
  }
});

// Endpoint to inspect transmissions routed to ekamsingh1808@gmail.com
app.get('/api/contact/messages', (_req, res) => {
  return res.json({
    recipient: EKAM_RECIPIENT_EMAIL,
    total: contactTransmissions.length,
    messages: contactTransmissions,
  });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
