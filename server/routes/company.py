from typing import List

from flask import Blueprint, request

from models import (
    Company,
    CompanyPrice,
    CompanyPriceSchema,
    CompanySchema,
    CompanyScore,
    CompanyScoreSchema,
    CompanyWithPricesSchema,
)

company_bp = Blueprint("company", __name__, url_prefix="/company")

@company_bp.get("/summaries/<id>")
def company_summaries_id(id) -> Company:
    """Fetches a single company using id
    Args:
        show_prices: Whether to return the previous prices for each company
        NOTE: Design decision in README
    Returns:
        Company: A single company matching the id
    """
    show_prices = request.args.get("show_prices")
    company = Company.query.get(id)
    company_schema = CompanySchema() if show_prices is None else CompanyWithPricesSchema()
    return company_schema.dump(company)

@company_bp.get("/summaries")
def company_summaries() -> List[Company]:
    """Fetches all companies
    Args:
        show_prices: Whether to return the previous prices for each company
        NOTE: Design decision in README
    Returns:
        List[Company]: A list of companies in json format
    """
    show_prices = request.args.get("show_prices")
    company = Company.query.all()
    company_schema = CompanySchema(many=True) if show_prices is None else CompanyWithPricesSchema(many=True)
    return company_schema.dump(company)


@company_bp.get("/scores")
def company_scores() -> List[CompanyScore]:
    """Fetches all company scores
    Returns:
        List[CompanyScore]: A list of company scores in json format
    """
    company = CompanyScore.query.all()
    company_schema = CompanyScoreSchema(many=True)
    return company_schema.dump(company)


@company_bp.get("/prices")
def company_prices() -> List[CompanyPrice]:
    """Fetches all company prices
    Returns:
        List[CompanyPrice]: A list of company prices in json format
    """
    company = CompanyPrice.query.all()
    company_schema = CompanyPriceSchema(many=True)
    return company_schema.dump(company)