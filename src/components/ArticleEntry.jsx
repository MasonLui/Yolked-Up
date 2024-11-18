// ArticleEntry.jsx
import { useState } from "react"

export default function ArticleEntry({ mode, addArticle, editArticle, article, user }) {
  const [title, setTitle] = useState(article ? article.title : '');
  const [body, setBody] = useState(article ? article.body : '');
  const [error, setError] = useState(null);

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError("Both the title and body must be supplied")
    } else {
      const id = article ? article.id : null
      switch (mode) {
        case 'add':
          addArticle({ title, body })
          break;
        case 'edit':
          editArticle({id, title, body, user })
          break;
      }
    }
  }
  
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <form onSubmit={(e) => submit(e)} className="flex flex-col">
        {error && <p className="text-red-500">{error}</p>}
        
        <label className="text-lightText">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background p-2 rounded-md mb-4 text-white"
        />

        <label className="text-lightText">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="6"
          className="bg-background p-2 rounded-md mb-4 text-white"
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {mode === 'add' ? 'Create' : 'Update'} Article
        </button>
      </form>
    </div>
  );
}
