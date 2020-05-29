from flask import Flask
app = Flask(__name__)

a =  "Hello Sid"

@app.route("/")
def hello():
    return a

if __name__ == "__main__":
    app.run()