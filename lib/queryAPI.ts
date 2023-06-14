import openai from "./chatGPT";


const query =async (prompt : string, chatId: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature : 0.9,
        top_p : 1,
        frequency_penalty : 0,
        presence_penalty : 0,
        max_tokens :1000
    })
    .then(res => res.data.choices[0].text)
    .catch(err =>`ChatGPT is unable to find the answer for that : ${err.message}`)
    return res;
}

export default  query;
