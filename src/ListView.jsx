import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import "./ListView.scss";
import { EasybaseProvider, useEasybase } from "easybase-react";

// const today = "July 15, 2021";
// const fakeData = [
//   {
//     topic: "Activities",
//     title: "Join Mike For Soulcycle on July 15",
//     doc: "https://www.google.com",
//     createdAt: today,
//     views: 12,
//   },
//   {
//     topic: "Info",
//     title: "*New* Learning $800 Budget!!",
//     doc: "https://www.google.com",
//     createdAt: today,
//     views: 34,
//   },
//   {
//     topic: "Advice",
//     title: "How do I ask for a promotion?",
//     doc: "https://www.google.com",
//     createdAt: today,
//     views: 567,
//   },
//   {
//     topic: "Help",
//     title: "I'm having a personal crisis. Where can I get help?",
//     doc: "https://www.google.com",
//     createdAt: today,
//     views: 89,
//   },
// ];

function ListView({ currTopic }) {
  const [easybaseData, setEasybaseData] = useState([]);
  const { db, e, useReturn } = useEasybase();

  const [currFilter, setCurrFilter] = useState(currTopic || null);
  const [currPosts, setCurrPosts] = useState({});

  const { frame } = useReturn(
    () => db("POSTS").return().where(e.isNotNull("topic")),
    []
  );

  useEffect(() => {
    updateCurrPosts();
  }, []);

  useEffect(() => {
    updateCurrPosts();
  }, [currFilter, frame]);

  const updateCurrPosts = async () => {
    let filtered = frame;

    if (currFilter) {
      filtered = frame.filter((post) => post.topic === currFilter);
    }
    const grouped = filtered.reduce((groups, post) => {
      if (groups[post.createdat]) {
        groups[post.createdat].push(post);
        const sorted = groups[post.createdat].sort((a, b) => b.views - a.views);
        groups[post.createdat] = sorted;
      } else {
        groups[post.createdat] = [post];
      }

      return groups;
    }, {});
    setCurrPosts(grouped);
  };

  return (
    <div className="ListView">
      <div className="ListViewHeader">
        <img src="feelgoodinc.svg" />
        <div className="HeaderText">
          <h1>FEEL GOOD INC.</h1>
          <h2>Exercise your Right to Wellness</h2>
        </div>
        <img src="qrcode.svg" />
      </div>
      <div className="Posts">
        {currFilter && (
          <button
            type="button"
            className="ViewAll"
            onClick={() => setCurrFilter(null)}
          >
            View All Posts
          </button>
        )}
        {Object.keys(currPosts).map((date) => (
          <ul key={date}>
            <p className="GroupTitle">
              <span className="date">
                {format(new Date(date), "MMM dd, yyyy")}
              </span>
              <span className="viewstitle">VIEWS</span>
            </p>
            {currPosts[date].map((post) => (
              <a key={post.title} href={post.doc} target="_blank">
                <li className={post.topic}>
                  <span className="title">{post.title}</span>
                  <span className="views">{post.views}</span>
                </li>
              </a>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default ListView;
