import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'SmartCampus AI Energy Intelligence', version: '1.0.0' });
  });

  // AI Sustainability Assistant endpoint
  app.post('/api/ai-assistant', async (req, res) => {
    try {
      const { prompt, building, contextData } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const systemPrompt = `You are SmartCampus AI, an intelligent sustainability and energy management assistant for a university campus prototype (Assignment 3A - Smart Systems Solution Design by Anupam Yadav).
Your analysis MUST be grounded strictly in the Assignment 2B findings:
- Dataset: 22 observations across 5 buildings (Hostel, Academic Block, Library, Science Complex, Admin Block).
- Finding 1: Hostel has the highest average energy consumption (~222 kWh/day).
- Finding 2: Academic Block also records high consumption (~189 kWh/day).
- Finding 3: Admin Block has the lowest average consumption (~68 kWh/day).
- Finding 4: Occupancy has a moderate positive relationship with energy consumption (Pearson correlation r ≈ 0.61).
- Finding 5: Daily energy consumption fluctuates significantly.
- Finding 6: Unusually high readings require facility investigation (e.g., Hostel OBS-04: 275 kWh at 42% occupancy).
- Finding 7: Any potential energy savings must be clearly labeled as "Estimated Opportunity" or "Prototype Estimate". Do NOT claim real hardware control or past physical savings.

User Query: "${prompt || 'Provide key recommendations for campus energy optimization.'}"
Building Context: ${building || 'All Buildings'}

Provide a concise, professional, actionable response in 3 structured bullet points or short paragraphs:
1. Data Observation & Anomaly Context
2. Practical Administrator Recommendation
3. Expected Sustainability Impact (labeled as Estimated Opportunity).`;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: systemPrompt,
        });
        const text = response.text || 'Analysis complete based on Assignment 2B prototype dataset.';
        return res.json({ answer: text, source: 'Gemini 2.5 AI Engine' });
      } else {
        // Fallback rule-based smart response grounded in dataset
        let fallbackText = `### Prototype AI Intelligence Analysis

1. **Data Pattern Observation**:
   In the analyzed dataset (22 observations across 5 buildings), the **Hostel** displays the highest average energy consumption (~222 kWh), while **Admin Block** records the lowest (~68 kWh). Occupancy shows a moderate positive correlation (r ≈ 0.61) with energy demand.

2. **Targeted Administrator Action**:
   Prioritize the **Hostel** and **Academic Block** for occupancy-driven thermostat setbacks and automated lighting schedules during off-peak hours. Investigate anomalous readings such as Observation OBS-04 (275 kWh at 42% occupancy).

3. **Expected Sustainability Impact (Prototype Estimate)**:
   By addressing high baseline loads during low occupancy, the campus holds an **Estimated Opportunity** to eliminate up to 15-20% of off-peak energy waste across residential facilities.`;

        if (prompt && prompt.toLowerCase().includes('hostel')) {
          fallbackText = `### Hostel Energy Demand Analysis (Prototype Intelligence)

- **Finding**: Hostel averages 222 kWh/day, the highest among all 5 monitored buildings. Observation OBS-04 showed an extreme reading of 275 kWh at only 42% occupancy.
- **Recommended Action**: Inspect common area lighting, 24/7 laundry sub-circuits, and corridor ventilation. Implement occupancy sensor controls.
- **Estimated Opportunity**: Targeted HVAC setbacks could eliminate up to 25 kWh/day of unneeded off-peak energy consumption.`;
        } else if (prompt && prompt.toLowerCase().includes('admin')) {
          fallbackText = `### Admin Block Efficiency Analysis (Prototype Intelligence)

- **Finding**: Admin Block has the lowest average demand (68 kWh/day) with consistent correlation between staff occupancy and power usage.
- **Recommended Action**: Maintain existing energy-conscious practices and export these desktop/HVAC management guidelines to other campus departments.
- **Estimated Opportunity**: Serves as the benchmark baseline model for campus-wide administrative operations.`;
        }

        return res.json({ answer: fallbackText, source: 'Rule-Based Prototype Engine' });
      }
    } catch (err: any) {
      console.error('AI Assistant Error:', err);
      return res.status(500).json({ error: 'Failed to generate AI insight', details: err.message });
    }
  });

  // Vite middleware for development vs static build for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
