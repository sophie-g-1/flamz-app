import React, { useState } from "react";
import HomepageLogo from "./assets/icon-homepage.svg";

const ChatApp = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [hasStartedChat, setHasStartedChat] = useState(false);

  function startChat() {
    setHasStartedChat(true);
  }

  function hideChat() {
    setHasStartedChat(false);
  }

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/openapi", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResponse(data.choices[0].message.content);
      setPrompt("");
    } catch (err) {
      console.error("Error:", err);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col justify-center relative">
      <div
        className="top-0 start-0 m-3 flex items-center gap-2 absolute cursor-pointer"
        onClick={hideChat}
      >
        <div className="rounded-full border-2 p-2 border-pink-500 aspect-square grid items-center">
          <img src={HomepageLogo} height="70" width="70" className="" alt="" />
        </div>
        <p className="font-semibold text-2xl">Flamz</p>
      </div>

      <div className="text-center w-4/5 max-w-4/5 mx-auto">
        <img
          src={HomepageLogo}
          className="mx-auto mb-4 max-w-4/5 md:max-w-2/5"
          width="60%"
          alt=""
        />
        {hasStartedChat ? (
          <div className="p-4 max-w-md mx-auto">
            {response ? (
              <div className="border-4 border-pink-500 rounded-3xl p-2 text-pink-700 mb-12 overflow-y-auto max-h-52 ">
                {response}
              </div>
            ) : (
              ""
            )}

            <textarea
              className="w-full border border-pink-500 rounded p-2"
              rows={4}
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="w-100 bg-pink-500 text-white rounded-xl py-4 font-semibold text-xl max-w-3/4"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-pink-500 font-semibold text-5xl mb-4">
              Welcome
            </h2>
            <h1 className="text-pink-500 text-3xl mb-24">
              Let's Have Fun with Flamz
            </h1>
            <button
              className="w-100 bg-pink-500 text-white rounded-xl py-4 font-semibold text-xl cursor-pointer max-w-3/4"
              onClick={startChat}
            >
              Start a chat with Flamz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
