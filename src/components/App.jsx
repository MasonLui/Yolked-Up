import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import WorkoutLog from "./WorkoutLog";
import Profile from "./Profile";
import ExerciseList from "./ExerciseList";
import { SignIn, SignOut } from "./Auth";
import {
  useAuthentication,
  loggedInUserDisplayName,
} from "../services/authService";
import {
  fetchArticles,
  createArticle,
  deleteArticle,
  updateArticle,
} from "../services/articleService";
import "../styles/index.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [mode, setMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Articles");
  const user = useAuthentication();

  useEffect(() => {
    if (user) {
      fetchArticles()
        .then(setArticles)
        .catch((error) => console.error("Error fetching articles:", error));
    }
  }, [user]);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleNewPostClick = () => {
    if (!user) {
      alert("Please sign in to post!");
    } else {
      setMode("add");
    }
  };

  const addArticle = ({ title, body }) => {
    if (!user) {
      console.error("User is not authenticated. Cannot create article.");
      return;
    }
    createArticle({ title, body, user })
      .then((article) => {
        setArticle(article);
        setArticles([article, ...articles]);
        setMode("");
      })
      .catch((error) => console.error("Error creating article:", error));
  };

  const delArticle = () => {
    deleteArticle({ article })
      .then((id) => {
        setArticle(null);
        setArticles(articles.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting article:", error));
  };

  const editArticle = ({ id, title, body, user }) => {
    updateArticle({ id, title, body, user })
      .then((article) => {
        setArticle(article);
        const otherArticles = articles.filter((item) => item.id !== article.id);
        setArticles([article, ...otherArticles]);
        setMode("");
      })
      .catch((error) => console.error("Error updating article:", error));
  };

  return (
    <div className="min-h-screen bg-background text-whiteText">
      {/* Header */}
      <header className="p-6 flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-3">
          <img src="/images/egg.png" alt="egg" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-primary">Yolked-Up</h1>
          <img src="/images/arm.png" alt="arm" className="w-10 h-10" />
        </div>
        <p className="text-sm text-lightGray mt-1">
          Your personalized workout tracker and article hub
        </p>
      </header>

      {/* Tabs Section */}
      <div className="bg-card py-2">
        <div className="flex justify-around items-center">
          <button
            onClick={() => handleTabClick("Articles")}
            className={`py-2 px-4 text-lg font-medium rounded transition-all duration-300 ${
              activeTab === "Articles"
                ? "bg-primary text-white"
                : "text-lightGray hover:text-white"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => handleTabClick("WorkoutLog")}
            className={`py-2 px-4 text-lg font-medium rounded transition-all duration-300 ${
              activeTab === "WorkoutLog"
                ? "bg-primary text-white"
                : "text-lightGray hover:text-white"
            }`}
          >
            Workout Log
          </button>
          <button
            onClick={() => handleTabClick("Profile")}
            className={`py-2 px-4 text-lg font-medium rounded transition-all duration-300 ${
              activeTab === "Profile"
                ? "bg-primary text-white"
                : "text-lightGray hover:text-white"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleTabClick("Exercises")}
            className={`py-2 px-4 text-lg font-medium rounded transition-all duration-300 ${
              activeTab === "Exercises"
                ? "bg-primary text-white"
                : "text-lightGray hover:text-white"
            }`}
          >
            Exercises
          </button>
          <div className="ml-3">
            {user ? (
              <SignOut className="py-1 px-3 bg-primary text-white rounded-md" />
            ) : (
              <SignIn className="py-1 px-3 bg-primary text-white rounded-md" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="bg-card min-h-screen w-1/5 flex flex-col rounded-md items-center p-4 m-6">
          <button
            className="bg-primary text-white text-sm p-2 m-2 rounded-md"
            onClick={handleNewPostClick}
          >
            New Post
          </button>
          {user && article && user.uid === article.author.id && (
            <div>
              <button
                className="bg-primary text-white text-sm p-2 m-2 rounded-md"
                onClick={() => setMode("edit")}
              >
                Edit Post
              </button>
              <button
                className="bg-primary text-white text-sm p-2 m-2 rounded-md"
                onClick={delArticle}
              >
                Delete Post
              </button>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "Articles" && (
            <div className="grid grid-cols-2 gap-4">
              <Nav articles={articles} setArticle={setArticle} />
              <div className="h-full">
                {mode ? (
                  <ArticleEntry
                    mode={mode}
                    addArticle={addArticle}
                    editArticle={editArticle}
                    article={mode === "edit" ? article : null}
                    user={user}
                  />
                ) : (
                  <Article article={article} />
                )}
              </div>
            </div>
          )}
          {activeTab === "WorkoutLog" && <WorkoutLog />}
          {activeTab === "Profile" && (
            <Profile
              user={user}
              loggedInUserDisplayName={loggedInUserDisplayName}
            />
          )}
          {activeTab === "Exercises" && <ExerciseList />}
        </main>
      </div>
    </div>
  );
}
