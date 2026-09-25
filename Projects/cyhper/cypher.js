async function getBaconipsum() {
  // first build the API call string by starting with the URL
  let apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  let theNewParagraphs = document.getElementById("newParagraphs").value;
  let theNewMeat = document.getElementById("newmeat").value;
  apiString = apiString + "?type=" + theNewMeat + "&paras=" + theNewParagraphs ;
  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  let response = await fetch(apiString);

  // finally, print the response in the various formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown

  let jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section
  for (let para in jsonData) {   
      document.getElementById("myFormattedData").innerHTML += "<p>" + jsonData[para] + "</p>";
    }


      let cyphertext = "";
        // loop through the JSON object one paragraph
        let charCounter = 0;
    for (let para in jsonData) {
        for (let i = 0; i < jsonData[para].length; i++){
            // loop through each character in the paragraph
            charCounter++;
            // check for vowels and replace with cyphertext, otherwise increment the character code by 1
            if (jsonData[para][i] == "a") {
                cyphertext += "cray";
            } 
            else if (jsonData[para][i] == "e") {
                cyphertext += "ton";
            } 
            else if (jsonData[para][i] == "i") {
                cyphertext += "mach";
            } 
            else if (jsonData[para][i] == "o") {
                cyphertext += "lan";
            } 
            else if (jsonData[para][i] == "u") {
                cyphertext += "yoyo";
            } 
            else {
                let charcode = jsonData[para].charCodeAt(i);
                cyphertext += String.fromCharCode(charcode + 1);
            }
            // check if the character counter is greater than 100, if so add a line break and reset the counter
            if (charCounter > 100) {
                cyphertext += "<br>";
                charCounter = 0;
            }        
        }

        document.getElementById("myCypherData").innerHTML +=
            "<p>" + cyphertext + "</p>";

        cyphertext = "";
    }
}
