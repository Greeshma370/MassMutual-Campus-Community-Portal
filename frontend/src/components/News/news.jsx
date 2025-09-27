import "./news.css"

export default function News() {
  const newsData = [
    {
      _id: "1",
      title: "Campus Placement Drive by Infosys",
      description:
        "Infosys is conducting a placement drive for final year students. Eligible branches: CSE, IT, ECE. Last date to apply: 30th Sept.",
      type: "drive",
      postedAt: new Date("2025-09-20"),
      eventDate: new Date("2025-10-01"),
      postedBy: { name: "Placement Faculty" },
    },
    {
      _id: "2",
      title: "AI Workshop",
      description:
        "A hands-on workshop on Artificial Intelligence and Machine Learning will be conducted in the auditorium.",
      type: "event",
      postedAt: new Date("2025-09-15"),
      eventDate: new Date("2025-09-28"),
      postedBy: { name: "Management" },
    },
    {
      _id: "3",
      title: "Library Timings Extended",
      description:
        "The central library will now remain open till 9 PM on weekdays to support students during exam preparation.",
      type: "news",
      postedAt: new Date("2025-09-10"),
      postedBy: { name: "Faculty" },
    },
  ]

  return (
    <div className="news-container">
      <h2>Announcements</h2>

      <div className="news-list">
        {newsData.map((item) => (
          <div key={item._id} className={`news-card ${item.type}`}>
            <div className="news-header">
              <h3>{item.title}</h3>
              <span className={`tag ${item.type}`}>{item.type}</span>
            </div>
            <p>{item.description}</p>
            <div className="news-meta">
              <span>📅 Posted: {item.postedAt.toDateString()}</span>
              {item.eventDate && (
                <span>🎯 Event: {item.eventDate.toDateString()}</span>
              )}
              <span>👤 {item.postedBy.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
