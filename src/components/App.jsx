// App.jsx

import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import WorkoutLog from "./WorkoutLog";
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

    createArticle({ title, body, user })
      .then((newArticle) => {
        setArticle(newArticle);
        setArticles([newArticle, ...articles]);
        setMode(false);
      })
      .catch((error) => {
        console.error("Error creating article:", error);
      });
  }

  function delArticle() {
    deleteArticle(article)
      .then((id) => {
        setArticle(null);
        setArticles(articles.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting article:", error);
      });
  }

  function editArticle({ id, title, body }) {
    updateArticle({ id, title, body, user })
      .then((updatedArticle) => {
        setArticle(updatedArticle);
        const otherArticles = articles.filter((item) => item.id !== updatedArticle.id);
        setArticles([updatedArticle, ...otherArticles]);
        setMode('');
      })
      .catch((error) => {
        console.error("Error updating article:", error);
      });
  }

  return (
    <div className="min-h-screen bg-background text-whiteText flex flex-col">
      {/* Header */}
      <header className="bg-background p-5 text-center">
        <h1 id="yolked-up-title" className="text-4xl font-bold text-primary text-ripple">Yolked-Up</h1>
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
            <SignIn />
          )}
          <SignOut />
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {activeTab === "Articles" && (
            <div>
              <h2 id="latest-posts-title" className="text-2xl font-semibold text-primary text-ripple">Latest Posts</h2>
              <div className="grid grid-cols-2 gap-4">
                <Nav articles={articles} setArticle={setArticle} />
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
              {articles.length === 0 && (
                <p id="no-posts-message" className="text-ripple">No posts available</p>
              )}
            </div>
          )}
          {activeTab === "WorkoutLog" && (
            <div>
              <WorkoutLog />
            </div>
          )}
          {activeTab === "Profile" && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-primary">Profile</h2>
              <p>Welcome, {user ? loggedInUserDisplayName() : "Guest"}!</p>
              <p>This section can display user details, settings, and more.</p>
            </div>
          )}
          {!article && (
            <p id="no-post-selected" className="text-ripple">No post selected.</p>
          )}
        </main>
      </div>
    </div>
  );
}
