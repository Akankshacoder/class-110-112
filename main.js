Webcam.set({
    width: 300, height: 300, image_format:"png", png_quality: 90
})

camera= document.getElementById('camera')
Webcam.attach('#camera')

function CP(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= " <img id ='pic' src = "+data_uri+">" 
    })
}
console.log("ml5 version ",ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/TRSPwSO5K/model.json", modelLoaded)

function modelLoaded()
{
    console.log("model is loaded")
}

function speak(){
    synth= window.speechSynthesis;
    speak_data= '1st prediction is '+pd1 +" and 2nd prediction is "+pd2 ;
    utterthis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
   
}

function ID()
{
   img= document.getElementById('pic');
   classifier.classify(img, gotResult);
}

function gotResult(error , results){
    if (error) {
        console.errror(error)
    }
    else {
          console.log(results)
          document.getElementById('Emojiname1').innerHTML = results[0].label;
          document.getElementById('Emojiname2').innerHTML = results[1].label;
           
          pd1= results[0].label;
          pd2= results[1].label;
          speak();

          if(results[0].label== "Happy"){
            document.getElementById('Emoji1').innerHTML = "😀"
          }
          if(results[0].label== "Sad"){
            document.getElementById('Emoji1').innerHTML = "🙁"
          }
          if(results[0].label== "Angry"){
            document.getElementById('Emoji1').innerHTML = "😡"
          }
          
          if(results[1].label== "Happy"){
            document.getElementById('Emoji2').innerHTML = "😀"
          }
          if(results[1].label== "Sad"){
            document.getElementById('Emoji2').innerHTML = "🙁"
          }
          if(results[1].label== "Angry"){
            document.getElementById('Emoji2').innerHTML = "😡"
          }
    }
}