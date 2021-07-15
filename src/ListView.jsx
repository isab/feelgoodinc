import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import "./ListView.scss";
import { useEasybase } from "easybase-react";

function ListView({ currTopic }) {
  const { db, e, useReturn } = useEasybase();

  const [currFilter, setCurrFilter] = useState(currTopic || null);
  const [currPosts, setCurrPosts] = useState({});

  const { frame } = useReturn(
    () =>
      db("POSTS")
        .return()
        .where(e.isNotNull("topic"))
        .orderBy({ by: "createdat", sort: "desc" }),
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

  async function openAndRecord(doc, title) {
    let singleRecord = await db("POSTS")
      .return()
      .where(e.eq("title", title))
      .one();

    await db("POSTS")
      .return()
      .where({ _key: singleRecord._key })
      .set({ views: singleRecord.views + 1 })
      .one();

    const newWindow = window.open(doc, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }

  return (
    <div className="ListView">
      <div className="ListViewHeader">
        <div className="HeaderText">
          <h1>FEEL GOOD INC.</h1>
          <h2>Exercise your Right to Wellness</h2>
        </div>
        <img src="feelgoodincqr.svg" />
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
              <a
                key={post.title}
                target="_blank"
                onClick={() => openAndRecord(post.doc, post.title)}
              >
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
