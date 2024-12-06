export default function Article({ article }) {
  return (
    <article className="p-5 ">
      {!article ? (
        <div className="flex justify-center items-center">
          <img
            src="https://images.pexels.com/photos/260352/pexels-photo-260352.jpeg" 
            alt="No post selected"
            className="max-w-full h-auto"
          />
        </div>
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