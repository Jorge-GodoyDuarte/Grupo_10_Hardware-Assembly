const FetchUser = async (endpoint, method= "GET", data) => {
   
    const apiUrlBase = "http://localhost:4000/api"; 
    const url = `${apiUrlBase}${endpoint}`;

    let response;

    if(method === "GET"){
        response = await fetch(url,{
            mode: "no-cors",
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json'}
            });
    }

    if(method === "POST"){
        response = await fetch(url,{
            method,
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json"
            }
        })
    }

   
    let result = await response.json();

    return result
}
export {
    FetchUser
}