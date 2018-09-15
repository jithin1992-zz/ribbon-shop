export function makeApiCall(method,body){


    //let api_path = "http://50.112.43.161:8080/ribbon_api/api/";
    //let api_path = "https://tryribbon.com:8443/ribbon_api/api/";
    let api_path = "http://tryribbon.com:8080/ribbon_api/api/";
    let url = api_path+method;

    //console.log("makeApiCall : "+url);
    //console.log("makeApiCall : "+JSON.stringify(body))
    return fetch(url,{method:'POST',mode: 'cors',body:JSON.stringify(body)})

        .then((response)=>{
            if(!response.ok){
                //throw Error(response.statusText);
            }
            //console.log("makeApiCall throwing responce back"+response.text())
            //console.log("makeApiCall throwing responce back(response)"+JSON.stringify(response))

            //this.setState({isLoading:false});
            return response;
        })

}

