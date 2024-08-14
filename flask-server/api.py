from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/dashboard-global', methods=['GET'])
def get_dashboard_global():
    data = {
        'title': 'Global Dashboard',
        'description': 'Données globales pour le tableau de bord.',
        'items': ['Dashboard Item 1', 'Dashboard Item 2', 'Dashboard Item 3']
    }
    return jsonify(data)

# Ajoutez d'autres routes API selon vos besoins

if __name__ == '__main__':
    app.run(debug=True, port=3001)
 