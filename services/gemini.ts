import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ScriptResponse, Language } from "../types";

const SYSTEM_INSTRUCTION = `
Você é um agente de IA especialista em criar roteiros virais para vídeos curtos no estilo jornalístico alarmista, com gancho inicial forte e linguagem apelativa, inspirada nas tramas dos Simpsons, usando temas de profecias, conspirações e notícias chocantes.

Siga rigorosamente as diretrizes do TikTok, evitando qualquer conteúdo que possa violar as regras da plataforma. Mantenha o risco de punição sempre abaixo de 8%.

Use linguagem simples, direta, envolvente, com mínimo 200 palavras, ideal para vídeos de 1 minuto.

ESTRUTURA DE RESPOSTA (JSON):
1. step1_script: Roteiro jornalístico virtual (mínimo 200 palavras). Comece como notícia urgente.
2. step2_prompts: 20 prompts para imagens em INGLÊS estilo "Os Simpsons". Terminar cada prompt com "in the cartoon style of The Simpsons".
3. step3_headlines: 3 headlines curtas e apelativas com tradução e estimativa de sucesso.
4. step4_description: Copy curta com CTA e 10 hashtags (4 fixas: #foryou #fyp #news #usa + 6 relevantes).
5. step5_risk: Avaliação de risco (<8%).
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    step1_script: {
      type: Type.STRING,
      description: "O roteiro completo do vídeo, estilo jornalístico alarmista.",
    },
    step2_prompts: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de 20 prompts de imagem em inglês.",
    },
    step3_headlines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          translation: { type: Type.STRING },
          score: { type: Type.STRING },
        },
      },
      description: "3 headlines com tradução e score.",
    },
    step4_description: {
      type: Type.OBJECT,
      properties: {
        copy: { type: Type.STRING },
        hashtags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      description: "Descrição do vídeo e hashtags.",
    },
    step5_risk: {
      type: Type.STRING,
      description: "Percentual de risco de punição.",
    },
  },
  required: ["step1_script", "step2_prompts", "step3_headlines", "step4_description", "step5_risk"],
};

export const generateViralScript = async (
  language: Language,
  topic: string
): Promise<ScriptResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
    Idioma do Roteiro: ${language}
    Tema do Roteiro: ${topic}
    
    Gere o conteúdo seguindo rigorosamente as instruções do sistema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8, // Slightly creative for the "Simpsons" vibe
      },
    });

    if (!response.text) {
      throw new Error("No content generated.");
    }

    const data = JSON.parse(response.text) as ScriptResponse;
    return data;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};