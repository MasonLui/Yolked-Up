export default function Article({ article }) {
    return (
      <article className="p-5 ">
        {!article ? (
          <p>No post selected.</p>
        ) : (
          <section >
            <h2>{article.title}</h2>
            <p>{`${Date(article.date).substring(0, 24)}`}</p>
            <p>{`Author: ${article.author.name}`}</p>
            <p>{article.body}</p>
          </section>
        )}
      </article>
    )
  }