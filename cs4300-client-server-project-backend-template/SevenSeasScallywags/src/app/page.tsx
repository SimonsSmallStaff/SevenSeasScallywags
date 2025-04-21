import connectMongoDB from "../../config/mongodb";
import React from "react";

let user = {
  profile: "davey Jones"
};

export default function Home() {
  connectMongoDB();
  return (
    <div className="flex items-center justify-center min-h-screen text-4xl">
      <div className="flex flex-col gap-6 p-6 w-[60%]">
        <div
          style={{ backgroundColor: "#3c2222" }}
          className="flex items-center justify-center p-6 text-white rounded pirata"
        >
          <p className="text-center">
            Scallywag Stash is your campus hideout for free school supplies.
            Trade and claim treasures like books, clothes, and furniture — all
            donated by fellow students. Log in to find what you need, no gold
            doubloons required.
          </p>
        </div>
        <div
          style={{ backgroundColor: "#FFCC00" }}
          className="flex flex-col items-center justify-center p-6 text-black rounded pirata"
        >
          <p>Plunder of the Week</p>

          <img
            src="/images/background.jpg"
            alt="Item image"
            className="w-[50px] h-[50px] mb-4"
          />
          <p className="text-center">{user.profile}</p>
        </div>
      </div>
    </div>
  );
}
