import { useEffect, useState } from "react"
import Nav from "./Nav"
import Article from "./Article"
import ArticleEntry from "./ArticleEntry"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import { fetchArticles, createArticle, deleteArticle, updateArticle } from "../services/articleService"
import "../styles/index.css"

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [mode, setMode] = useState(false)
  const user = useAuthentication()

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.
  useEffect(() => {
    if (user) {
      fetchArticles().then(setArticles)
    }
  }, [user])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article)
      setArticles([article, ...articles])
      setWriting(false)
    })
  }

  function delArticle() {
    deleteArticle({ article }).then((id) => {
      setArticle(null)
      setArticles(articles.filter((item) => {return (item.id != id)}))
    })
  }

  function editArticle({ id, title, body, user }) {
    updateArticle({ id, title, body, user }).then((article) => {
      setArticle(article)
      const otherArticles = articles.filter((item) => {return (item.id != article.id)})
      setArticles([article, ...otherArticles])
      setMode('')
    })
  }

  return (
    <div className="App">
      <div className="bg-dark p-10 flex justify-center">
        <p className="text-white text-5xl sm:text-6xl font-serif self-auto">Yolked-up</p>
      </div>
      <div className="min-h-screen w-full bg-gradient-custom bg-repeat p-5">
        {!user ? <SignIn /> : <SignOut />}
        <div className="flex">
          {user && <button className="py-1 px-2 text-white bg-dark hover:bg-gray-300 rounded-md border-white border-2" onClick={() => setMode('add')}>New Post</button>}
          {user && article && (user.uid == article.author.id) && <button className="ml-2 py-1 px-2 text-white bg-dark hover:bg-gray-300 rounded-md border-white border-2" onClick={() => setMode('edit')}>Edit Post</button>}
          {user && article && (user.uid == article.author.id) && <button className="ml-2 py-1 px-2 text-white bg-dark hover:bg-gray-300 rounded-md border-white border-2" onClick={() => delArticle()}>Delete Post</button>}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-5">
          {user && <Nav articles={articles} setArticle={setArticle} />}
          {user && (mode != '') ? (
            <ArticleEntry mode={mode} addArticle={addArticle} editArticle={editArticle} article={(mode == 'edit' ? article : null)} user={user}/>
          ) : (user ? (
            <Article article={article} />
          ) : (<p>Hello! Sign in to access Yolked-up.</p>) )}
        </div>
      </div>
    </div>
  )
}