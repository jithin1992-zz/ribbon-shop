import { makeApiCall } from '../Actions/ApiCalls';



export function processOffLineBills(){

    if(localStorage.getItem("offlineBills")){

        //console.log(" offline bills found")
        var offlineBills = localStorage.getItem("offlineBills");
        //console.log(" offline bills found :::list ::: "+offlineBills);
        offlineBills = JSON.parse(offlineBills);

        for(var i=0;i<offlineBills.length;i++){


            var bill_params = offlineBills[i];


            makeApiCall("purchaseBill",bill_params ).then((response) => response.json())
                .then((parsedJSON) => {


                    //console.log('purchaseBill offline response :: :'+parsedJSON);
                    //console.log(" offline bills found :::list ::: before splice"+JSON.stringify(offlineBills));
                    //var pos = parseFloat(i);
                    var pos = offlineBills.indexOf(bill_params);
                    //console.log(" offline bills found :::list ::: pos ::"+pos);

                    offlineBills.splice(pos, 1);
                   // console.log(" offline bills found :::list ::: "+JSON.stringify(offlineBills));
                    localStorage.setItem("offlineBills",JSON.stringify(offlineBills))


                }).catch(function (e) {
                //console.error('Error during offline  purchaseBill:', e);

            });

        }



    }else{

        //console.log("no offline bills")
    }

}
