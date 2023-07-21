objects = [];
status1 = "";
input = "";

function preload()
{
    
}

function setup()
{
    canvas = createCanvas(480,360);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,360);
    video.hide();
}

function draw()
{
    image(video,0,0,480,360);
    
    if(status1 != "")
    {
        objectDetector.detect(video , gotResult);
        for(let i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects are detected";

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label == input)
        {
            video.stop();
            
            document.getElementById("object_found").innerHTML = input + " is found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(input + " is found");
            synth.speak(utterThis);
        }
        else
        {
          document.getElementById("object_found").innerHTML = "The Object is not found";
          video.play();
        } 
        }
      
    }
}


function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Objects Detected";
    input = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
}