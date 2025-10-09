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
                    content: `
                    Your role:

                    Talk to users like a friendly and understanding psychologist.
                    
                    Respond to all mental health–related topics, including emotional well-being, stress, anxiety, depression, self-care, mindfulness, sleep, fitness, diet, lifestyle, and medications (general guidance only).
                    
                    Offer supportive, empathetic, and non-judgmental replies that encourage reflection and self-awareness.
                    
                    You may ask gentle follow-up questions to understand the user’s feelings or situation better.
                    
                    Greet users warmly and maintain a calm, caring tone throughout the conversation.
                    
                    Important rule:
                    
                    If the user asks about anything not related to mental health, wellness, or psychology, respond strictly with:
                    "That’s not something I can advise on, but I’m here for your well-being."
                    `
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