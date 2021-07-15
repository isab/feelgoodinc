import React, { useState } from "react";
import ListView from "./ListView.jsx";
import "./FilterView.scss";

const FunFacts = [
  "The first person convicted of speeding was going eight mph.",
  "The Supreme Court has its own private basketball court called The Highest Court in the Land.",
  "Walmart has a lower acceptance rate than Harvard.",
  "Cows moo with regional accents.",
  "The blob of toothpaste that sits on your toothbrush is called a nurdle.",
  "Lobsters communicate with their bladders.",
  "There's an island in Japan you can visit that's inhabited only by friendly bunnies.",
  "There are actually more public libraries in the US than McDonald's.",
  "The last letter added to the English alphabet wasn't Z — it was the letter J.",
  "The voice of Mickey Mouse and the voice of Minnie Mouse got married IRL.",
];

function FilterView() {
  const Topics = ["Info", "Activities", "Advice", "Help"];
  const [currTopic, setCurrTopic] = useState(null);

  return currTopic ? (
    <ListView currTopic={currTopic} />
  ) : (
    <div className="FilterView">
      <header className="App-header">Feel Good Inc.</header>
      <header className="App-subheader">Exercise your Right to Wellness</header>
      {Topics.map((topic) => (
        <button
          key={topic}
          type="button"
          className={`button ${topic}`}
          onClick={() => setCurrTopic(topic)}
        >
          {topic}
        </button>
      ))}
      <div className="FunFact">{FunFacts[Math.floor(Math.random() * 10)]}</div>
    </div>
  );
}

export default FilterView;
