import pytest

from models.company.schemas import (
    CompanyPriceSchema,
    CompanySchema,
    CompanyScoreSchema,
    CompanyWithPricesSchema,
)
from tests.expected_results import (
    expected_company,
    expected_company_with_prices,
    expected_price,
    expected_score,
)


@pytest.mark.parametrize(
    "expected_data",
    [expected_company]
)
def test_company_summaries(client, expected_data):
    response = client.get("/company/summaries")
    assert response.status_code == 200
    assert response.content_type == "application/json"

    json_data = response.json
    assert len(json_data) > 0
    assert set(json_data[0].keys()) == set(CompanySchema.Meta.fields)
    assert json_data[0] == expected_data

@pytest.mark.parametrize(
    "expected_data",
    [expected_company_with_prices]
)
def test_company_summaries_with_prices(client, expected_data):
    response = client.get("/company/summaries?show_prices")
    assert response.status_code == 200
    assert response.content_type == "application/json"

    json_data = response.json
    assert len(json_data) > 0
    assert set(json_data[0].keys()) == set(CompanyWithPricesSchema.Meta.fields)
    assert json_data[0] == expected_data

@pytest.mark.parametrize(
    "expected_data",
    [expected_price]
)
def test_company_prices(client, expected_data):
    response = client.get("/company/prices")
    assert response.status_code == 200
    assert response.content_type == "application/json"

    json_data = response.json
    assert len(json_data) > 0
    assert set(json_data[0].keys()) == set(CompanyPriceSchema.Meta.fields)

    assert json_data[0] == expected_data

@pytest.mark.parametrize(
    "expected_data",
    [expected_score]
)
def test_company_scores(client, expected_data):
    response = client.get("/company/scores")
    assert response.status_code == 200
    assert response.content_type == "application/json"

    json_data = response.json
    assert len(json_data) > 0
    assert set(json_data[0].keys()) == set(CompanyScoreSchema.Meta.fields)
    assert json_data[0] == expected_data

