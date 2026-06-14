import { useState } from "react";

import Background from "./components/layout/Background";

import MyRoom from "./pages/MyRoom";
import GuestShare from "./pages/GuestShare";

function App() {
  const [activeTab, setActiveTab] = useState("my-room");

  return (
    <>
      <Background />

      <div className="min-h-screen px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold text-white">
              SwiftDrop
            </h1>

            <p className="text-slate-400 mt-3">
              Fast local file sharing over your local network
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div
              className="
                bg-white/5
                border border-white/10
                rounded-2xl
                p-2
                flex
                gap-2
              "
            >
              <button
                onClick={() => setActiveTab("my-room")}
                className={`
                  px-6 py-3 rounded-xl text-white
                  ${activeTab === "my-room"
                    ? "bg-indigo-600"
                    : "bg-transparent"
                  }
                `}
              >
                My Room
              </button>

              <button
                onClick={() => setActiveTab("guest")}
                className={`
                  px-6 py-3 rounded-xl text-white
                  ${activeTab === "guest"
                    ? "bg-indigo-600"
                    : "bg-transparent"
                  }
                `}
              >
                Guest Share
              </button>
            </div>
          </div>

          {activeTab === "my-room" ? (
            <MyRoom />
          ) : (
            <GuestShare />
          )}
        </div>
      </div>
    </>
  );
}

export default App;