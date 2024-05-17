import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST (request) {
  let { query } = await request.json();
  let result = "yes";

  result = await getCorrectQuery(query);
  console.log(result);

  if (result != null) {
    return Response.json(result);
  } else {
    return Response.json("");
  }
}

const getCorrectQuery = async (query) => {
  const thread = await openai.beta.threads.create();
  const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: query,
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID,
  });

  let count = 0;

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      const retirevedRun = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      console.log(retirevedRun);
      if (retirevedRun.status == "completed") {
        const messages = await openai.beta.threads.messages.list(thread.id);
        console.log(messages.body.data);
        count = 100;
        resolve(messages.body.data);
      }
      count++;
      resolve([]);
    }, 3000);
  });

  for (let i = 0; i < 5; i++) {
    let messages = await myPromise;
    console.log(messages);
    if (messages.length > 0) {
      return messages[0].content[0].text.value;
    }
  }
  return null;
};
