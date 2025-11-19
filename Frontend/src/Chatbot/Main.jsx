import './Main.css'
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentra-mind-mental-health-journal-a.vercel.app";


const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SUGGESTIONS = [
    "Suggest beautiful places to see on an upcoming road trip",
    "Briefly summarize this concept: urban planning",
    "Brainstorm team bonding activities for our work retreat",
    "Tell me about React.js and React Native",
];

const Main = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]); // each: {id, role: 'user'|'ai', text, time}
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    // scroll to bottom when messages change
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // helper to add message
    const pushMessage = (msg) => setMessages((m) => [...m, msg]);


    const handleSend = async () => {
        const text = input.trim();
        if (!input) return;

        const userMsg = {
            id: Date.now(),
            role: "user",
            text,
            time: new Date().toISOString(),
        };

        pushMessage(userMsg);
        setInput("");
        setLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/chat`, {
                threadId: "single-thread", // fixed thread
                message: input,
            });
            const replyText = res?.data?.reply ?? "No reply returned.";
            const aiMsg = {
                id: Date.now() + 1,
                role: "ai",
                text: replyText,
                time: new Date().toISOString(),
            };
            pushMessage(aiMsg);
            setResponse(res.data.reply);
            setInput("");
        } catch (err) {
            console.error("Error:", err);
            setResponse("Something went wrong!");
            pushMessage({
                id: Date.now() + 2,
                role: "ai",
                text: "Something went wrong. Please try again.",
                time: new Date().toISOString(),
            });
        } finally {
            setLoading(false);
        }
    };
    // Enter sends, Shift+Enter newline
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    // click suggestion -> set input (optionally call handleSend)
    const handleSuggestionClick = (text) => {
        setInput(text);
        // Optionally auto-send:
        // setTimeout(() => handleSend(), 100);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSend();
    };
    return (
        <>
            <div className='main '>
                <div className="top">
                    <p >Sentramind</p>
                    <i class="fa-solid fa-user-doctor fa-3x"></i>
                </div>

                {messages.length === 0 ? (
                    <>
                        <div className="main-container ">
                            <div className="greet">
                                <p><span>Hello, Friend</span></p>
                                <p>Let’s talk, even if it’s just a little.</p>
                            </div>
                        </div>
                        <div className="cards">
                            <div className="card"
                            >
                                <p>Share something you’re grateful for today</p>
                                <i class="fa-solid fa-person-praying fa-2x"></i>
                            </div>
                            <div className="card"
                            >
                                <p>How are you feeling right now? Describe it in a few words</p>
                                <i class="fa-solid fa-dove fa-2x"></i>
                            </div>
                            <div className="card"
                            >
                                <p>Write about a recent challenge and how you handled it</p>
                                {/* <img src={bracket} alt="" /> */}
                                <i class="fa-solid fa-peace fa-2x"></i>
                            </div>
                            <div className="card">
                                <p>Reflect on a positive memory that makes you smile</p>
                                <i class="fa-solid fa-hand-peace fa-2x"></i>
                            </div>

                        </div>
                    </>
                ) : (
                    // <div
                    //     style={{
                    //         marginTop: "20px",
                    //         padding: "10px",
                    //         border: "1px solid #ccc",
                    //         borderRadius: "5px",
                    //         backgroundColor: "#f1f1f1",
                    //     }}
                    // >
                    //     <strong>AI:</strong> {response}
                    // </div>
                    <div className="messages-list" aria-live="polite">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`message-row ${m.role === "user" ? "user" : "ai"}`}
                            >
                                <div className="bubble">
                                    <div className="bubble-text">{m.text}</div>
                                    <div className="bubble-time">{formatTime(m.time)}</div>
                                </div>
                            </div>
                        ))}

                        {/* typing indicator while waiting */}
                        {loading && (
                            <div className="message-row ai">
                                <div className="bubble typing">
                                    <span className="dot" />
                                    <span className="dot" />
                                    <span className="dot" />
                                </div>
                            </div>
                        )}

                        <div ref={endRef} />
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
                        rows={1}
                    />
                    <div className="icon-container">
                        {/* <button><img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></button>
                        <button><img src="https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></button> */}
                        <button onClick={handleSend}
                            style={{ padding: "10px 20px",
                             cursor: "pointer" }}
                            disabled={loading} type="submit"  >{loading ? "Thinking..." : <i className="fa-solid fa-arrow-right fa-2x"></i>}</button>
                    </div>
                </div>
                <p className="bottom-info">
                Sentramind may provide supportive information but does not replace professional mental health care.
<a href="#"> Sentramind’s privacy and safety practices</a>.
                </p>
            </div>



        </div >
        </>
    )
}

export default Main