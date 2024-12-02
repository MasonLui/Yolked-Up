import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import WorkoutLog from "./WorkoutLog";
import Profile from "./Profile";
import { SignIn, SignOut } from "./Auth";
import { useAuthentication, loggedInUserDisplayName } from "../services/authService";
import { fetchArticles, createArticle, deleteArticle, updateArticle } from "../services/articleService";
import "../styles/index.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [mode, setMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Articles");
  const user = useAuthentication();
  
  const handleLogNewRecord = () => {
    console.log("Log New Record button clicked!");
    // Add additional functionality here
  };
  
  // Function to add the ripple effect to text elements
  function addTextRipple(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("text-ripple-active");
      setTimeout(() => element.classList.remove("text-ripple-active"), 600); // Remove after animation
    }
  }

  // Function to handle the tab click and apply ripple effect on button and text
  function handleTabClick(event, tab) {
    setActiveTab(tab);

    // Apply button ripple effect
    const button = event.currentTarget;
    const overlay = document.createElement("span");
    overlay.classList.add("ripple-overlay");
    button.appendChild(overlay);
    setTimeout(() => overlay.classList.add("ripple-overlay-active"), 10);
    overlay.addEventListener("transitionend", () => overlay.remove());

    // Trigger the text ripple effect on relevant text elements
    addTextRipple("yolked-up-title");
    addTextRipple("latest-posts-title");
    addTextRipple("no-posts-message");
    addTextRipple("no-post-selected");
  }

  useEffect(() => {
    if (user) {
      fetchArticles()
        .then(setArticles)
        .catch((error) => {
          console.error("Error fetching articles:", error);
        });
    }
  }, [user]);

  function addArticle({ title, body }) {
    if (!user) {
      console.error("User is not authenticated. Cannot create article.");
      return;
    }

    createArticle({ title, body, user }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setMode('')
    })
      .catch((error) => {
        console.error("Error creating article:", error);
      });
  }

  function delArticle() {
    deleteArticle({ article }).then((id) => {
      setArticle(null)
      setArticles(articles.filter((item) => {return (item.id != id)}))
    })
      .catch((error) => {
        console.error("Error deleting article:", error);
      });
  }

  function editArticle({ id, title, body, user }) {
    updateArticle({ id, title, body, user }).then((article) => {
      setArticle(article)
      const otherArticles = articles.filter((item) => {return (item.id != article.id)})
      setArticles([article, ...otherArticles])
      setMode('')
    })
      .catch((error) => {
        console.error("Error updating article:", error);
      });
  }

  return (
    <div className="min-h-screen bg-background text-whiteText">
      {/* Header */}
      <header className="p-5 flex justify-center">
        <h1 className="text-4xl font-bold text-primary text-ripple">Yolked-Up</h1>
      </header>
      {/* Tabs with Text Ripple Effect */}
      <div className="flex justify-center bg-card p-4 space-x-4">
        <button 
          id="tab-Articles"
          onClick={(event) => handleTabClick(event, "Articles")}
          className={`text-ripple py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === "Articles" ? "bg-primary text-white" : "text-lightGray"}`}
        >
          Articles
        </button>
        <button 
          id="tab-WorkoutLog"
          onClick={(event) => handleTabClick(event, "WorkoutLog")}
          className={`text-ripple py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === "WorkoutLog" ? "bg-primary text-white" : "text-lightGray"}`}
        >
          Workout Log
        </button>
        <button 
          id="tab-Profile"
          onClick={(event) => handleTabClick(event, "Profile")}
          className={`text-ripple py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === "Profile" ? "bg-primary text-white" : "text-lightGray"}`}
        >
          Profile
        </button>
      </div>

      <div className="flex flex-1 p-8">
        {/* Sidebar for Additional Controls */}
        <nav className="bg-card min-h-screen w-1/5 flex flex-col items-center p-4">
          {user ? (
            <>
              <button 
                className="text-primary mb-4 hover:scale-110 transition-transform duration-200"
                onClick={() => setMode('add')}
              >
                New Post
              </button>
              {article && user.uid === article.author.id && (
                <>
                  <button
                    className="text-primary mb-4 hover:scale-110 transition-transform duration-200"
                    onClick={() => setMode('edit')}
                  >
                    Edit Post
                  </button>
                  <button
                    className="text-primary hover:scale-110 transition-transform duration-200"
                    onClick={delArticle}
                  >
                    Delete Post
                  </button>
                </>
              )}
            </>
          ) : (
            < SignIn />
          )}
          <SignOut />
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {activeTab === "Articles" && (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-4">
                <Nav articles={articles} setArticle={setArticle} />
                <div className="h-full">
                  {mode ? (
                    <ArticleEntry
                      mode={mode}
                      addArticle={addArticle}
                      editArticle={editArticle}
                      article={mode === 'edit' ? article : null}
                      user={user}
                    />
                ) : (
                  <Article article={article} />
                )}
                </div>
              </div>
            </div>
          )}
          {activeTab === "WorkoutLog" && (
            <div>
              <WorkoutLog />
            </div>
          )}
          {activeTab === "Profile" && (
            <div>
              <Profile
              user={user}
              loggedInUserDisplayName={loggedInUserDisplayName}
              handleLogNewRecord={handleLogNewRecord}
              />
            </div>
          )}
          {!article && (
            <p></p>
          )}
        </main>
      </div>
    </div>
  );
}
