require('dotenv').config();

const getOpenAIAPIResponse = async(message)=>{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are a health chatbot. 
                    - Only answer health-related questions (about symptoms, fitness, diet, mental health, medicine, etc.).
                    - If the user asks anything not related to health, strictly reply with: "I am health chat bot ok".`
                },
                {
                role: "user",
                content: message
            }]
        })
    };
    try{
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();
        //console.log(data.choices[0].message.content);//reply
        return (data.choices[0].message.content);//reply
    }catch(err){
        console.log(err);
    }
}

module.exports = getOpenAIAPIResponse;