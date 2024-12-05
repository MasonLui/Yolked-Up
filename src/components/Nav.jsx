export default function Nav({ articles, setArticle }) {
  return (
    <nav className="bg-card min-h-screen w-full rounded-md p-5">
      <h2 className="text-primary text-xl font-bold mb-4">Latest Posts</h2>
      {articles.length === 0 ? (
        <p className="text-lightText">No posts available.</p>
      ) : (
        articles.map((article) => (
          <li
            key={article.id}
            className="text-white hover:underline cursor-pointer"
            onClick={() => setArticle(article)}
          >
            {article.title}
          </li>
        ))
      )}
    </nav>
  );
}
