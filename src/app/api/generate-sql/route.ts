import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { schema, prompt } = await req.json()

  const message =
    `O seu trabalho criar queries em SQL a partir de um schema SQL abaixo.
    Schema SQL:
    """
    ${schema}
    """

    A partir do schema acima, escreva uma query SQL a partir da solicitação abaixo.

    Solicitação: ${prompt}

    Me retorne SOMENTE o código SQL. Nada alpem disso.
  `.trim()
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
