import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const USDA_API_KEY = import.meta.env.VITE_USDA_API_KEY;

export const callOpenAI = async (message) => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
      functions: [
        {
          name: 'get_food_data',
          description: 'Fetch food data from USDA FoodData Central',
          parameters: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Food item to search for' },
            },
            required: ['query'],
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const data = response.data.choices[0];
  if (data.finish_reason === 'function_call') {
    const functionName = data.message.function_call.name;
    const functionArgs = JSON.parse(data.message.function_call.arguments);
    return { toolCall: { name: functionName, arguments: functionArgs } };
  }
  return { message: data.message.content };
};

export const callUSDAApi = async (parameters) => {
  const response = await axios.get(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${parameters.query}&api_key=${USDA_API_KEY}`
  );
  return response.data;
};
