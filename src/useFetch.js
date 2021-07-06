import {useState, useEffect} from 'react';

const useFetch = (url) => {

    const [data, setData] = useState (null);
    const [isPending, setIsPending] = useState (true);
    const [error, setError] = useState (null);

    useEffect ( () => {
        const abortCont = new AbortController(); /*aborts every fetch associated with the url*/

        setTimeout (() => {
            fetch(url, { signal: abortCont.signal })
        .then (res => { /*get the response object after the promise*/
            console.log (res);
            if (!res.ok) {
                throw Error ('Could not fetch data');
            } 
            return res.json (); /*use the json method on that*/
        })
        .then ((data) =>{ /*another then method to get the data*/
        setData(data);
        setIsPending(false);
        setError (null);
       })
       .catch(err => { 
           if (err.name === 'AbortError'){
               console.log ('fetch aborted');
           } else {
            setIsPending (false);
            setError (err.message);
         }
       })
        }, 1000);

        return () => abortCont.abort(); /*aborts every fetch associated with the usefetch url*/
    }, [url]);  

    return { data, isPending, error }
}

export default useFetch;