import React, { useState } from "react";
import { useEasybase } from "easybase-react";
import "./CreateButton.scss";

function CreateButton() {
  const { db, e } = useEasybase();

  const Topics = ["Info", "Activities", "Advice", "Help"];

  const [currTopic, setCurrTopic] = useState(null);
  const [currTitle, setCurrTitle] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function submitPost() {
    const createdAt = new Date().toISOString();
    const views = 0;
    await db("POSTS")
      .insert({
        createdat: createdAt,
        views,
        title: currTitle,
        topic: currTopic,
      })
      .one();

    setShowForm(false);
  }

  return showForm ? (
    <div className="CreateForm">
      <button
        type="button"
        className="close"
        onClick={() => setShowForm(false)}
      >
        <img src="xxxxxxx.svg" />
      </button>
      <select
        name="topic"
        id="topic-select"
        onChange={(e) => setCurrTopic(e.target.value)}
        value={currTopic}
      >
        <option value="">Select a category</option>
        {Topics.map((topic) => (
          <option value={topic}>{topic}</option>
        ))}
      </select>
      <input
        type="text"
        className="TitleInput"
        value={currTitle || ""}
        onChange={(e) => setCurrTitle(e.target.value)}
        placeholder="How can we help you exercise your right to wellness?"
      />
      <button
        type="button"
        className="Submit"
        disabled={!currTitle || !currTopic}
        onClick={submitPost}
      >
        Submit
      </button>
    </div>
  ) : (
    <button
      type="button"
      className="CreateButton"
      onClick={() => setShowForm(true)}
    >
      <span>+</span>
    </button>
  );
}

export default CreateButton;
