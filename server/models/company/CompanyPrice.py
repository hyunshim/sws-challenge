from extensions import db


class CompanyPrice(db.Model):
    __tablename__ = "swsCompanyPriceClose"
    company_id = db.Column(db.String(255), db.ForeignKey("swsCompany.id"), primary_key=True)
    date = db.Column(db.Date, primary_key=True)
    price = db.Column(db.Float)
    date_created = db.Column(db.String(255)) # Used String as it was erroring due to decimal being too large

    def __repr__(self):
        return f"<CompanyPrice: {self.company_id} {self.date} {self.price}>"
    
