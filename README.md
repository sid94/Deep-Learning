# Deep learning


# sentiment analysis

pip install -U flask-cors


use python api.py

api will be available on http://localhost:5000/

methods

predict() - post method

http://localhost:5000/predict 

Input: 
data to be passed in the format:

{"tweets": [ {"id" : "58723682638226979", 
            "text" : "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy" 
           },{"id" : "58723682638226979", 
            "text" : "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy" 
           },{"id" : "58723682638226979", 
            "text" : "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy" 
           } ]}


id - is the tweet id parameter and from the twitter data
text - is the text parameter from the twitter data

preprocess of the twitter tweet text to be done by the api so no need to worry about preprocessing.

Output: 

{
    "data": [
        {
            "elapsed_time": 0.39963698387145996,
            "id": "58723682638226979",
            "label": "NEGATIVE",
            "score": 0.21943318843841553,
            "text": "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy"
        },
        {
            "elapsed_time": 0.3141758441925049,
            "id": "58723682638226979",
            "label": "NEGATIVE",
            "score": 0.21943318843841553,
            "text": "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy"
        },
        {
            "elapsed_time": 0.21393871307373047,
            "id": "58723682638226979",
            "label": "NEGATIVE",
            "score": 0.21943318843841553,
            "text": "First the global coronavirus lockdown, then Trump's visa ban has separated thousands of families..... ||… https://t.co/YHYiR1tsCy"
        }
    ]
}

To build a docker image cd into directory of dockerfile

run the command "docker build -t senti:v1 ."

To run that built images use "docker run --name=senti -p 5000:5000 senti:v1" 

Now the app will be available on http://localhost:5000/

now use 
http://localhost:5000/predict  Post method to post tweets data



Tag the docker image using

docker tag sentimentanalyzer:v1 sid94docker/sentimentanalyzer:v1

