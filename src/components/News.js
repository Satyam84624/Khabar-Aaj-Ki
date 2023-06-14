import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const titleCase = (string)=> {
 return string[0].toUpperCase() + string.slice(1);
 }

  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100)
  };

  useEffect(() => {
    document.title= `${titleCase(props.category)}-Khabar Aaj Ki`
    updateNews();
    // eslint-disable-next-line 
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    // setState({ loading: true });
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // setState({
    //   articles: state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   // loading: false,
    // });
  };

  // handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${
  //     props.category
  //   }&apiKey=06bdcbd43df44e758fa4fe1139de1865&page=${
  //     state.page - 1
  //   }&pagesize=${props.pageSize}`;
  //   setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // console.log(parsedData)
  //   setState({
  //     articles: parsedData.articles,
  //     page: state.page - 1,
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //   });
  // };
  // handleNextClick = async () => {
  //   if (
  //     Math.ceil(state.totalResults / props.pageSize) >=
  //     state.page + 1
  //   ) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${
  //       props.country
  //     }&category=${
  //       props.category
  //     }&apiKey=06bdcbd43df44e758fa4fe1139de1865&page=${
  //       state.page + 1
  //     }&pagesize=${props.pageSize}`;
  //     setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     // console.log(parsedData)
  //     setState({
  //       articles: parsedData.articles,
  //       page: state.page + 1,
  //       totalResults: parsedData.totalResults,
  //       loading: false,
  //     });
  //   }
  // };

  return (
    <>
      <h1 className="text-center my-60" style={{marginTop:"60px"}}>Khabar Aaj Ki - Top Headlines</h1>
      {loading && <Loading />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loading />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    author={element.author ? element.author : "UNKNOWN"}
                    publishedAt={
                      element.publishedAt 
                      // ? element.publishedAt : "UNKNOWN"
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://media.wired.com/photos/6466a28c9ec11a2433532a66/191:100/w_1280,c_limit/Cons_Social.jpg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between my-3">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              Math.ceil(state.totalResults / props.pageSize) <
              state.page + 1
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
