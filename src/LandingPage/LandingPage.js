import React, { useState, useEffect } from "react";
import { Header_OPTIONS, REVIEW_DETAILS } from "./constants";
import "./Landingpage.scss";
import todoist_logo from "./assets/todoist_logo.svg";
import people_logo from "./assets/people_logo.png";
import phone_logo from "./assets/phone_logo.png";
import review_logo from "./assets/review_logo.png";
import Card from "./mini-components/Card.js";
import { Navigate } from "../Navigate/Navigate.js";

const LandingPage = () => {
  return (
    <>
      <div className="body">
        <header className="landing-header">
          <img className="header-items" src={todoist_logo} />
          {Header_OPTIONS.map((item) => {
            return <div className="header-items items">{item}</div>;
          })}
        </header>
        <div className="header-title">
          <h1>Organize it all</h1>
          <h1>with Todoist</h1>
        </div>
        <button onClick={() => Navigate("/home")} className="btn-start">
          <h2>Get Started</h2>
        </button>

        <div
          style={{
            position: "relative",
            display: "inline-block",
            height: "500px",
          }}
        >
          {/* {"FIX THIS HEIGHT ISSUE HERE"} */}
          <img className="people-logo" src={people_logo} />
        </div>
        <img className="phone-logo" src={phone_logo} />

        <div style={{ textAlign: "center" }}>
          <h1>Free up your mental space</h1>
          <p>
            Regain clarity and calmness by getting all those tasks out of your
            head and onto
          </p>
          <p>
            your to-do list (no matter where you are or what device you use).
          </p>
          <span style={{ marginRight: "40px" }}>
            <a href="https://todoist.com/features" target="_blank">
              {"-> Browse Todoist’s features"}
            </a>
          </span>
          <span>
            <a
              href="https://www.youtube.com/watch?v=8ZKq0r-g87M&t=4s&ab_channel=Todoist"
              target="_blank"
            >
              See Todoist in action
            </a>
          </span>

          <div
            style={{
              backgroundImage: `url('${review_logo}')`,
              position: "absolute",
              height: "500px",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              width: "100%",
              left: 0,
              margin: "20px 0 20px",
            }}
          >
            {/* {"FIX THIS HEIGHT ISSUE HERE"} */}

            <div
              style={{
                display: "flex",
                margin: "8% 0 0 10%",
                justifyContent: "space-around",
              }}
            >
              {REVIEW_DETAILS.map((item) => {
                return (
                  <Card
                    title={item.title}
                    star={item.star}
                    details={item.details}
                    text={item.text}
                  />
                );
              })}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "15px",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                width: "100%",
                height: "30px",
                paddingTop: "10px",
              }}
            >
              Security | Privacy | Terms © Doist Inc.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
