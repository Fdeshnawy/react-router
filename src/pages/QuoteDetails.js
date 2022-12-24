import { useEffect } from "react";
import { Link, Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetails = () => {
    const params = useParams();
    const {quoteId}=params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(()=>{
    sendRequest(quoteId);
  },[sendRequest,quoteId])

  if(status==='pending')
  {
    return(
        <div className="centered">
          <LoadingSpinner/>
        </div>
    )
  }
  if(error)
  {
    return<p className="centered focused">{error}</p>
  }
 
  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`/quotes/${params.quoteId}`} exact>
        <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
          Load Comments
        </Link>
      </Route>
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};
export default QuoteDetails;
