from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate


from flask import Flask, jsonify
from flask_restful import reqparse
from flask_cors import CORS
app = Flask(__name__)
# 
cors = CORS(app, resources={r"/lang": {"origins": "http://localhost:3002"}})

requests = reqparse.RequestParser()
requests.add_argument("Lang", type=str, required=True)
requests.add_argument("Text", type=str, required=True)


@app.route('/lang', methods=['POST'])
def get_trans():
     
    args = requests.parse_args()
    l1 = args["Lang"]
    l2 = args["Text"]
    result = None

    if (l1 == 'hin'):
        result = jsonify(transliterate(
            l2, sanscript.DEVANAGARI, sanscript.ITRANS).lower())

    if (l1 == 'guj'):
        result = jsonify(transliterate(
            l2, sanscript.GUJARATI, sanscript.ITRANS).lower())

    if (l1 == 'mal'):
        result = jsonify(transliterate(
            l2, sanscript.MALAYALAM, sanscript.ITRANS).lower())

    if (l1 == 'ori'):
        result = jsonify(transliterate(
            l2, sanscript.ORIYA, sanscript.ITRANS).lower())

    if (l1 == 'tam'):
        result = jsonify(transliterate(
            l2, sanscript.TAMIL, sanscript.ITRANS).lower())

    if (l1 == 'kan'):
        result = jsonify(transliterate(
            l2, sanscript.KANNADA, sanscript.ITRANS).lower())

    if (l1 == 'tel'):
        result = jsonify(transliterate(
            l2, sanscript.TELUGU, sanscript.ITRANS).lower())
    
    if result is None:
        result = jsonify({"error": "Invalid language code"})
        result.headers.add('Access-Control-Allow-Origin', 'http://localhost:3002')
        return result
    
    result.headers.add('Access-Control-Allow-Origin','http://localhost:3002')
    return result


if __name__ == '__main__':
    app.run(debug=True)
