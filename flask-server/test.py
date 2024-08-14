# main.py

from flask import Flask, jsonify

app = Flask(__name__)

# Vos données d'analyse (remplacez par vos données réelles)
data = [
    {
        "year": "2021",
        "organizationUnit": "Unit1",
        "position": "Poste1",
        "contractType": "CDI",
        "employee": "Employé1",
        "company": "Société1",
        "requestStatus": "Validée",
        "totalRequests": 2182,
        "requestsToReview": 292,
        "approvedRequests": 271,
        "rejectedRequests": 528
    },
    [
    {
        "year": "2022",
        "organizationUnit": "XCFIX",
        "position": "NSCZL",
        "contractType": "Stage",
        "employee": "DZEVTVR",
        "company": "LFTEHXFQ",
        "requestStatus": "Rejetée",
        "totalRequests": 540,
        "requestsToReview": 36,
        "approvedRequests": 25,
        "rejectedRequests": 42
    },
    {
        "year": "2021",
        "organizationUnit": "SYAGB",
        "position": "PRKMX",
        "contractType": "Stage",
        "employee": "ABQEXJK",
        "company": "GFGYYPAL",
        "requestStatus": "Validée",
        "totalRequests": 646,
        "requestsToReview": 79,
        "approvedRequests": 5,
        "rejectedRequests": 11
    },
    {
        "year": "2024",
        "organizationUnit": "SYAGB",
        "position": "PRKMX",
        "contractType": "Stage",
        "employee": "ABQEXJK",
        "company": "GFGYYPAL",
        "requestStatus": "Validée",
        "totalRequests": 646,
        "requestsToReview": 79,
        "approvedRequests": 5,
        "rejectedRequests": 11
    },
     {
        "year": "2024",
        "organizationUnit": "SYAGB",
        "position": "PRKMX",
        "contractType": "Stage",
        "employee": "ABQEXJK",
        "company": "GFGYYPAL",
        "requestStatus": "Validée",
        "totalRequests": 646,
        "requestsToReview": 79,
        "approvedRequests": 5,
        "rejectedRequests": 11
    },
]

    # Ajoutez d'autres objets de données ici
]

@app.route("/EntréesSorties", methods=["GET"])
def get_entreesortie():
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=3001)
