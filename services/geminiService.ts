
import { GoogleGenAI } from "@google/genai";
import { Transaction, AccountInfo, Budget } from "../types";

// Fix: Strictly follow the guideline to initialize with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (
  query: string,
  transactions: Transaction[],
  accounts: AccountInfo[],
  budgets: Budget[],
  history: { role: string; parts: { text: string }[] }[]
) => {
  const modelName = 'gemini-3-flash-preview';
  
  const context = `
    User Financial Profile:
    - Total Balance: ₹${accounts.reduce((sum, acc) => sum + acc.balance, 0).toFixed(2)}
    - Accounts: ${accounts.map(a => `${a.name} (${a.type}): ₹${a.balance}`).join(', ')}
    - Budgets Status: ${budgets.map(b => `${b.category}: ₹${b.spent}/₹${b.limit}`).join(', ')}
    - Recent Transactions: ${transactions.slice(0, 10).map(t => `${t.date} ${t.description}: ₹${t.amount} (${t.category})`).join(', ')}
    
    Instructions:
    You are FundVision AI, a professional and proactive financial assistant based in India. 
    Analyze the user's data to provide specific insights in Indian Rupees (₹). 
    If they ask for advice, use their transaction history to be relevant.
    Be concise, friendly, and always add a disclaimer that you are an AI and not a substitute for certified financial planning.
  `;

  try {
    const chat = ai.chats.create({
      model: modelName,
      config: {
        systemInstruction: context,
      },
    });

    const response = await chat.sendMessage({ message: query });
    // Fix: Correctly access the .text property (not a method) as per SDK guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble analyzing your finances right now. Please try again in a moment.";
  }
};
