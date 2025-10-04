import "./news.css"
import {getNews} from '../../services/newsAPI'
import { useEffect } from "react"
import {useState} from "react"

export default function News() {
  const [news,Setnews]=useState([])
  useEffect(()=>{ 
    async function getasyncnews(){
      const news=await getNews()
      console.log(news.data)
      Setnews(news.data)
    }
    getasyncnews()
  },[])

  return (
    <div className="news-container">
      <h2>Announcements</h2>

      <div className="news-list">
        {news.map((item) => (
          <div key={item._id} className={`news-card ${item.type}`}>
            <div className="news-header">
              <h3>{item.title}</h3>
              <span className={`tag ${item.type}`}>{item.type}</span>
            </div>
            <p>{item.description}</p>
            <div className="news-meta">
              <span>📅 Posted: {item.postedAt ? new Date(item.postedAt).toDateString() : 'TBA'}</span>
              {item.eventDate && (
                <span>🎯 Event: {item.eventDate ? new Date(item.eventDate).toDateString() : 'TBA'}</span>
              )}
              <span>👤 {item.postedBy?.name || 'Unknown'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
