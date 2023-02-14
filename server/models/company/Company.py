import datetime as dt
from statistics import mean, stdev

from sqlalchemy.ext.hybrid import hybrid_property

from extensions import db


class Company(db.Model):
    __tablename__ = "swsCompany"
    id = db.Column(db.String(255), primary_key=True)
    name = db.Column(db.String(255))
    ticker_symbol = db.Column(db.String(255))
    exchange_symbol = db.Column(db.String(255))
    unique_symbol = db.Column(db.String(255))
    date_generated = db.Column(db.DateTime)
    security_name = db.Column(db.String(255))
    exchange_country_iso = db.Column(db.String(255))
    listing_currency_iso = db.Column(db.String(255))
    canonical_url = db.Column(db.String(255))
    unique_symbol_slug = db.Column(db.String(255))
    scores = db.relationship("CompanyScore", backref="company", uselist=False)
    prices = db.relationship("CompanyPrice", backref="company")

    @hybrid_property
    def share_price(self) -> float:
        if not self.prices:
            return 0
        return round(self.prices[-1].price, 2)


    @hybrid_property
    def volatility(self) -> float:
        """Generates the volatility using relative standard deviation with Bessel's correction.
        Used statistics.stdev instead of numpy.std as stdev uses Bessel's correction and is
        more appropriate in the scenario of a sample of data.

        Returns:
            float: Relative volatility of underlying price within the last 90 days.
        """
        curr_date = dt.date(2020, 5, 24)

        raw_prices = [
            company_price.price 
            for company_price in self.prices 
            if (curr_date - company_price.date).days <= 90
        ]

        relative_std = (stdev(raw_prices)*100)/mean(raw_prices)

        return round(relative_std, 2)
    
    @hybrid_property
    def company_score(self) -> int:
        return self.scores.total

    def __repr__(self):
        return f"<Company: {self.name} {self.ticker_symbol}>"
    