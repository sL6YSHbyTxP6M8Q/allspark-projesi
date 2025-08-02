from flask import Flask, jsonify, request
from flask_cors import CORS

class OtopilotGelişmişYönetim:
    def rapor_üret(self):
        return "otopilot raporu"

class AcilDurumYonetim:
    def durum_goster(self):
        return "normal"

class AllsparkYapayZeka:
    def yanıt_ver(self, mesaj):
        return f"Allspark AI: '{mesaj}' mesajına yanıt veriyor."

app = Flask(__name__)
CORS(app, origins="https://allspark-projesi.vercel.app")

otopilot = OtopilotGelişmişYönetim()
acil_durum = AcilDurumYonetim()
allspark_ai = AllsparkYapayZeka()

@app.route('/otopilot/rapor')
def rapor_goster():
    rapor_metni = otopilot.rapor_üret()
    return jsonify({"rapor": rapor_metni})

@app.route('/acil_durum/durum')
def acil_durum_goster():
    durum = acil_durum.durum_goster()
    return jsonify({"durum": durum})

@app.route('/allspark_ai/yanit', methods=['POST'])
def yapay_zeka_yanit_al():
    data = request.json
    mesaj = data.get('mesaj', 'Merhaba')
    yanit = allspark_ai.yanıt_ver(mesaj)
    return jsonify({"yanit": yanit})

@app.route('/')
def hello_world():
    return 'Hello World!'