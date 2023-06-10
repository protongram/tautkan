
from flask import Flask,request,render_template,json,session,redirect,url_for

import requests
app=Flask(__name__,template_folder="html/",static_folder='html',static_url_path='')

app.config['SECRET_KEY']="uniantaraorposhimputek181108181108ENCRYPTEDTEXTEND"


API = "http://localhost:3000"


@app.route("/")
def memeUI():
    meme_json = json.loads(apifetch.read())
    print(meme_json)
    return render_template('index.html',meme_json = meme_json['data'],api=API)
@app.route("/l/<lid>")
def memeID(lid):
    link_json = requests.get(API+"/links/"+lid+".json").json()
    return render_template('link.html',link = link_json,api=API)
@app.route("/c")
def createView():
    return render_template('creator.html',link={"title":"Creator Page"},api=API)
@app.route("/style")
def listStyle():
    styles = requests.get(API+"/style").json()
    return render_template("style.html",styles=styles['data'])
@app.route("/cs")
def newStyle():
    return render_template("style_creator.html")
if __name__ == '__main__':
    app.run(debug=True)
