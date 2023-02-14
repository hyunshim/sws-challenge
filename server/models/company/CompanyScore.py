from extensions import db


class CompanyScore(db.Model):
    __tablename__ = "swsCompanyScore"
    id = db.Column(db.Integer, primary_key=True)
    date_generated = db.Column(db.DateTime)
    dividend = db.Column(db.Integer)
    future = db.Column(db.Integer)
    health = db.Column(db.Integer)
    management = db.Column(db.Integer)
    past = db.Column(db.Integer)
    value = db.Column(db.Integer)
    misc = db.Column(db.Integer)
    total = db.Column(db.Integer)
    sentence = db.Column(db.String(255))
    company_id = db.Column(db.String(255), db.ForeignKey("swsCompany.id"))

    def __repr__(self):
        return f"<companyScore: {self.id} {self.total} {self.company_id}>"
    
