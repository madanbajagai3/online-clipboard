import  { useState } from "react";

const Clipboard = () => {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const generateKey = () => {
    const newKey = Math.floor(1000 + Math.random() * 9000).toString();
    setKey(newKey);

    // Store the clipboard text in the Service Worker cache
    navigator.serviceWorker.controller.postMessage({
      type: "STORE_CLIPBOARD_TEXT",
      payload: { text, key: newKey },
    });
  };

  const handleSave = () => {
    generateKey();
  };

  return (
    <div>
      <h2>Upload Clipboard Text</h2>
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={handleSave}>Save</button>
      {key && <p>Your key: {key}</p>}
    </div>
  );
};

export default Clipboard;
