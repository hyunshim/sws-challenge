# 1 Introduction

virtualenv server-env
pip install -r requirements.txt
source server-env/Scripts/activate
flask run

node install
npm run build
npm run start

Access the webpage by going to http://127.0.0.1:3000/

# 2 Requirements

## 2.1 Back-end

- Build an API solution given the supplied SQLite Database.
- Endpoints
  - An array of company entities
    - Optional query parameter to also fetch past share prices

## 2.2 Front-end

- Construct a front-end page that allows users to see the companies returned from the API.
- Page should allow users to see the following data for each company.
  - Company name
  - Unique symbol code
  - Last known share price (Most recent share price)
  - Company's overall snowflake score
- Functional
  - Sort by overall company score
  - Sort by price volatility within the last 90 days
  - Filter by exchange symbols
  - Filter by overall score
- Non-functional
  - Performance (assume that page will be frequently visited)
  - Extensibility (easily be able to add a mini share price chart for each company)
  - Stability (production-quality code, tests)

# 3 Priorities

# 4 Design Decisions

## 4.1 REST vs GraphQL

## 4.2 Company previous prices

### Solution

Previous prices can be queried by adding a `?show_prices` argument to the `/company` endpoint.  
Made this decision as that's the general rule of thumb when adding optional query parameters.

Advantages:

- Intuitive, it's easier to understand that `?show_prices` is an argument to the `/company` endpoint.

### Alternative Solution

Using routing parameters instead. Ex: `/company/show_prices`

Advantages:

- Allows for easier compatibility with specifications such as OpenAPI.
- Explicitly shows that the `show_prices` is an endpoint of its own.
