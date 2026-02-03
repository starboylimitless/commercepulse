
'use server';
/**
 * @fileOverview An AI agent to predict top-selling products for the next week based on historical order data.
 *
 * - predictBestsellers - A function that predicts top-selling products.
 * - PredictBestsellersInput - The input type for the predictBestsellers function.
 * - PredictBestsellersOutput - The return type for the predictBestsellers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictBestsellersInputSchema = z.object({
  orderHistory: z.string().describe('Historical order data, including product names, order dates, and quantities.'),
});
export type PredictBestsellersInput = z.infer<typeof PredictBestsellersInputSchema>;

const PredictBestsellersOutputSchema = z.object({
  predictedBestsellers: z.array(
    z.object({
      productName: z.string().describe('The name of the predicted top-selling product.'),
      predictedSales: z.number().describe('The predicted number of sales for the next week.'),
    })
  ).describe('A list of predicted top-selling products for the next week.'),
});
export type PredictBestsellersOutput = z.infer<typeof PredictBestsellersOutputSchema>;

export async function predictBestsellers(input: PredictBestsellersInput): Promise<PredictBestsellersOutput> {
  try {
    return await predictBestsellersFlow(input);
  } catch (error: any) {
    console.error("Genkit Flow execution failed:", error);
    throw new Error(error.message || "AI service is currently unavailable.");
  }
}

const prompt = ai.definePrompt({
  name: 'predictBestsellersPrompt',
  input: {schema: PredictBestsellersInputSchema},
  output: {schema: PredictBestsellersOutputSchema},
  prompt: `You are an expert retail analyst. Analyze the provided order history to forecast top performers for the next 7 days.
  
  Consider seasonal trends, frequency of orders, and volume.
  
  Order History:
  {{{orderHistory}}}

  Return the predictions in the specified JSON format.
`,
});

const predictBestsellersFlow = ai.defineFlow(
  {
    name: 'predictBestsellersFlow',
    inputSchema: PredictBestsellersInputSchema,
    outputSchema: PredictBestsellersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) throw new Error("No output generated from AI");
    return output;
  }
);
