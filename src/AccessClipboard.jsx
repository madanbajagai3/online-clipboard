import { useState, useEffect } from "react";

const AccessClipboard = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    const getClipboardText = async () => {
      if ("serviceWorker" in navigator) {
        const controller = await navigator.serviceWorker.controller;
        if (controller) {
          const request = new Request(`/clipboard/${key}`);
          const response = await caches
            .open("clipboard-cache")
            .then((cache) => cache.match(request));
          if (response) {
            const data = await response.text();
            setText(data);
          }
        }
      }
    };

    if (key) {
      getClipboardText();
    }
  }, [key]);

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  return (
    <div>
      <h2>Access Clipboard</h2>
      <input
        type="text"
        value={key}
        onChange={handleKeyChange}
        placeholder="Enter 4-digit key"
      />
      {text && <textarea value={text} readOnly />}
    </div>
  );
};

export default AccessClipboard;
