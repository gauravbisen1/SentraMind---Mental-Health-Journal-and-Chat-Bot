// SimpleChat.jsx
import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
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
    <div style={{ width: "400px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>SentraMind AI ChatBot</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your prompt..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={handleSend}
        style={{ padding: "10px 20px", cursor: "pointer" }}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
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
    </div>
  );
};

export default Chatbot;
