import './Main.css'
import React, { useState } from "react";
import axios from "axios"

const Main = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input) return;

        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/chat", {
                threadId: "single-thread", // fixed thread
                message: input,
            });
            setResponse(res.data.reply);
            setInput("");
        } catch (err) {
            console.error("Error:", err);
            setResponse("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };
    return (
        <>
            <div className='main'>
                <div className="top">
                    <p>Sentramind</p>
                    <img
                        src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="profile"
                    />
                </div>
                <div className="main-container">
                    <div className="greet">
                        <p><span>Hello, Dev</span></p>
                        <p>How can I help you today?</p>
                    </div>
                </div>
                <div className="cards">
                    <div className="card"
                    >
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="card"
                    >
                        <p>Briefly summarize this concept: urban planning</p>
                        <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="card"
                    >
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                    <div className="card">
                        <p>Tell me about React js and React native</p>
                        <img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>

                </div>
                {/* output  */}
                {response && (
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#f1f1f1",
                        }}
                    >
                        <strong>AI:</strong> {response}
                    </div>
                )}
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            type="text"
                            placeholder="Enter a prompt here"
                        />
                        <div className="icon-container">
                            <button><img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></button>
                            <button><img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></button>
                            <button onClick={handleSend}
                                style={{ padding: "10px 20px", cursor: "pointer" }}
                                disabled={loading} type="submit"  >{loading ? "Thinking..." : "Send"}<img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses.
                        <a href="#">Your privacy and Gemini Apps</a>
                    </p>
                </div>



            </div>
        </>
    )
}

export default Main