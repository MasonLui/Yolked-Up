import { useState } from "react"

export default function ArticleEntry({ mode, addArticle, editArticle, article, user }) {
  const [title, setTitle] = useState(article ? article.title : '')
  const [body, setBody] = useState(article ? article.body : '')
  const [error, setError] = useState(null)

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
          editArticle({ id, title, body, user })
          break;
      }
    }
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={submit}>
        {error && <p className="text-dark">{error}</p>}
        Title
        <input className="m-2" name='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        Body
        <textarea
          className="m-2"
          name='Body'
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {mode == 'add' && <button className="py-1 px-2 text-white bg-dark hover:bg-gray-300 rounded-md border-white border-2" type="submit">Create</button>}
        {mode == 'edit' && <button className="py-1 px-2 text-white bg-dark hover:bg-gray-300 rounded-md border-white border-2" type="submit">Update</button>}
      </form>
    </div>
  )
}