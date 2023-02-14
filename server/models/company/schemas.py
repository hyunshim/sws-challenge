from extensions import ma


class CompanyPriceSchema(ma.Schema):
    class Meta:
        fields = ("company_id", "date", "price")

class CompanyScoreSchema(ma.Schema):
    class Meta:
        fields = ("id", "dividend", "future", "health", "management", "past", "value", "misc", "total", "company_id")

class CompanySchema(ma.Schema):
    prices = ma.Nested(CompanyPriceSchema, many=True)
    scores = ma.Nested(CompanyScoreSchema)
    class Meta:
        fields = ("id", "name", "unique_symbol", "volatility", "share_price", "company_score", "scores")

class CompanyWithPricesSchema(ma.Schema):
    prices = ma.Nested(CompanyPriceSchema, many=True)
    scores = ma.Nested(CompanyScoreSchema)
    class Meta:
        fields = ("id", "name", "unique_symbol", "volatility", "share_price", "company_score", "scores", "prices")