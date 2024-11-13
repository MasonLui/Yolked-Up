export default function Nav({ articles, setArticle }) {
    return (
      <nav className="bg-dark min-h-screen w-full p-5 list-disc">
        <h1 className="text-white text-xl font-semibold mb-2">Latest Posts</h1>
        {!articles
          ? <p>No posts.</p>
          : articles.map((a) => (
              <li className="text-white hover:underline" key={a.id} onClick={() => setArticle(a)}>
                {a.title}
              </li>
            ))}
      </nav>
    )
  }