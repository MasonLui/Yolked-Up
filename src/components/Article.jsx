export default function Article({ article }) {
  return (
    <article className="p-5 ">
      {!article ? (
        <p>No post selected.</p>
      ) : (
        <section >
          <h2 className="text-primary text-xl font-bold mb-2">{article.title}</h2>
          <p className="text-sm ">{`${Date(article.date).substring(0, 24)}`}</p>
          <p className="text-sm mb-4">{`Author: ${article.author.name}`}</p>
          <p>{article.body}</p>
        </section>
      )}
    </article>
  )
}