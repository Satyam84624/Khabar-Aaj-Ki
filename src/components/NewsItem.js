import React from "react";

const NewsItem =(props)=>{
    let { title, description, imgUrl, newsUrl, author, publishedAt} = props;
    let date=new Date(publishedAt);
    return (
      <div className="my-3">
        <div className="card">
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <em><p className="card-text font-weight-bold">By {author} on {((date.toGMTString()))}</p></em>
            {/* <p className="card-text">{publishedAt}</p> */}
            <a rel = "noreferrer" href={newsUrl} target="_blank" className="btn btn-primary btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
